const express = require("express");

const { Item } = require('../../../models/mongoose/Item');

const ItemService = require("../../../services/ItemService");
const { default: mongoose } = require("mongoose");

module.exports = () => {
  const router = express.Router();

  router.get("/:itemId?", async (req, res, next) => {
    //return res.render("admin/item", {});

    try {
      const items = await ItemService.getAll();
      let item = null;

      // The optional param itemId is present
      if (req.params.itemId) {
        if (!mongoose.isValidObjectId(req.params.itemId)) {
          req.session.messages.push({
            type: 'warning',
            text: 'Please Enter a Valid ID',
          });

          return res.render("admin/item", {
            items,
            item,
          });
        }
        item = await ItemService.getOne(req.params.itemId);
      }

      return res.render("admin/item", {
        items,
        item,
      });
    } catch (err) {
      return next(err);
    }
  });

  // Save or update item
  router.post("/", async (req, res) => {
    // const item = new Item({
    //   sku: req.body.sku,
    //   name: req.body.name,
    //   price: req.body.price,
    // });

    //await item.save();

    // return res.json({
    //   status: true,
    //   msg: "Item Created Successfully",
    //   item: item,
    // })

    //return next("Not implemented");

    // Massage the passed in form data a bit
    const sku = req.body.sku.trim();
    const name = req.body.name.trim();
    const price = req.body.price.trim();

    // Make sure that the passed data is complete
    if (!sku || !name || !price) {
      req.session.messages.push({
        type: "warning",
        text: "Please enter SKU, name and price!",
      });
      return res.redirect("/admin/item");
    }

    try {
      // If there was no existing item we now want to create a new item object
      if (!req.body.itemId) {
        const temp = await ItemService.getItemBySKU(sku);

        if(temp){
          req.session.messages.push({
            type: 'warning',
            text: 'Duplicate SKU Change It'
          });

          return res.redirect('/admin/item');
        }

        await ItemService.create({ sku, name, price });
      } else {
        const itemData = {
          sku,
          name,
          price,
        };

        if(!mongoose.isValidObjectId(req.body.itemId)){
          req.session.messages.push({
            type: "warning",
            text: "Please enter Valid ID!",
          });

          return res.redirect("/admin/item");
        }

        const obj = await ItemService.update(req.body.itemId, itemData);

        //console.log(obj);
      }
      req.session.messages.push({
        type: "success",
        text: `The item was ${
          req.body.itemId ? "updated" : "created"
        } successfully!`,
      });
      return res.redirect("/admin/item");
    } catch (err) {
      req.session.messages.push({
        type: "danger",
        text: "There was an error while saving the item!",
      });
      console.error(err);
      return res.redirect("/admin/item");
    }
  });

  // Delete item
  router.get("/delete/:itemId", async (req, res) => {
    //return next("Not implemented");

    try {
      if(!mongoose.isValidObjectId(req.params.itemId)) {
        req.session.messages.push({
          type: "warning",
          text: "Please Enter Valid ID For Item!",
        });

        return res.redirect("/admin/item");
      }
      await ItemService.remove(req.params.itemId);
    } catch (err) {
      // Error handling
      req.session.messages.push({
        type: "danger",
        text: "There was an error while deleting the item!",
      });
      console.error(err);
      return res.redirect("/admin/item");
    }
    // Let the item knows that everything went fine
    req.session.messages.push({
      type: "success",
      text: "The item was successfully deleted!",
    });
    return res.redirect("/admin/item");
  });
  return router;
};
