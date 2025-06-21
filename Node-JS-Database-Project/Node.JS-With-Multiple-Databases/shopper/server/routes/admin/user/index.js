const express = require("express");

const UserService = require('../../../services/UserService');

// const objectId = require('../../../middleware/objectId');
const { default: mongoose } = require("mongoose");

module.exports = () => {
  const router = express.Router();

  router.get("/:userId?", async (req, res) => {
    // return res.render("admin/user");

    console.log(req.session.userId);

    try {
      const users = await UserService.getAll();

      let user = null;

      // The optional userId param was passed
      if (req.params.userId) {
        if(!mongoose.isValidObjectId(req.params.userId)){
          req.session.messages.push({
            type: 'warning',
            text: 'Invalid User ID!!!',
          });

          return res.render('admin/user', {
            users, 
            user
          });
        }
        user = await UserService.getOne(req.params.Id);
      }
      return res.render("admin/user", {
        users,
        user,
      });
    } catch (err) {
      return next(err);
    }
  });

  // Save or update user
  router.post("/", async (req, res) => {
    // return next("Not implemented");

    const email = req.body.email.trim();
    const password = req.body.password.trim();

    // Add this here because on update we might want to keep the password as it is
    if (!email || (!password && !req.body.userId)) {
      req.session.messages.push({
        type: "warning",
        text: "Please enter email address and password!",
      });
      return res.redirect("/admin/user");
    }
    try {
      // If there was no existing user we now want to create a new user object
      if (!req.body.userId) {
        // console.log(req.body.email);
        // console.log(email);
        let result = await UserService.getByEmail(email);
        // console.log(result);
        if (result){
          req.session.messages.push({
            type: 'warning',
            text: 'Duplicate Email Please Check it',
          });

          return res.redirect('/admin/user');
        }
        await UserService.create({ email, password });
      } else {

        if(!mongoose.isValidObjectId(req.body.userId)){
          req.session.messages.push({
            type: 'warning',
            text: 'Invalid user Id'
          });

          return res.redirect('/admin/user');
        }

        const userData = {
          email,
        };
        // Add this if because password does not need to be changed on updated
        if (password) {
          userData.password = password;
        }
        await UserService.update(req.body.userId, userData);
      }
      req.session.messages.push({
        type: "success",
        text: `The user was ${
          req.body.userId ? "updated" : "created"
        } successfully!`,
      });
      return res.redirect("/admin/user");
    } catch (err) {
      req.session.messages.push({
        type: "danger",
        text: "There was an error while saving the user!",
      });
      console.error(err);
      return res.redirect("/admin/user");
    }
  });

  // Delete user
  router.get("/delete/:userId", async (req, res, next) => {
    // return next("Not implemented");

    if(!mongoose.isValidObjectId(req.params.userId)){
      req.session.messages.push({
        type: 'warning',
        text: 'Invalid User ID',
      });

      return res.redirect('/admin/user');
    }

    try {
      await UserService.remove(req.params.userId);
    } catch (err) {
      // Error handling
      req.session.messages.push({
        type: "danger",
        text: "There was an error while deleting the user!",
      });
      console.error(err);
      return res.redirect("/admin/user");
    }
    // Let the user knows that everything went fine
    req.session.messages.push({
      type: "success",
      text: "The user was successfully deleted!",
    });
    return res.redirect("/admin/user");
  });

  router.get("/impersonate/:userId", (req, res, next) => {
    // return next("Not implemented");

    if(!mongoose.isValidObjectId(req.params.userId)) {
      req.session.messages.push({
        type: 'warning',
        text: 'Invalid User ID!!!',
      });

      return res.redirect('/admin/user');
    }

    req.session.userId = req.params.userId;
    req.session.messages.push({
      type: "success",
      text: "User successfully switched",
    });
    return res.redirect("/admin/user");
  });

  return router;
};
