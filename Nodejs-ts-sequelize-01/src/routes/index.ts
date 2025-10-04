import express, { NextFunction, Request, Response } from "express";
import { Todo } from "../models";

import ToDoValidator from "../validation/todo";
import CheckErrors from "../middleware"
const router = express.Router();

router.post(
  "/create",
  ToDoValidator.validateCreateTodo(),
  CheckErrors.checkAllErrors,
  async function (req: Request, res: Response) {
    // const id = uuidv4()

    console.log("The body is: ", req.body);
    // console.log("The id is: ", id)
    try {
      const todo = await Todo.create({ ...req.body });

      return res.json({ todo: todo }).status(201);
    } catch (e) {
      return res.json({ err: e }).status(500);
    }
  }
);

router.get('/get-all-todos', 
  ToDoValidator.validatePaginationQuery(),
  CheckErrors.checkAllErrors,
  async (req: Request, res: Response) => {

  try {

    let { limit, page } = req.query
    let size, offset
    if (limit == undefined) {
      size = 3;
    } else {
      size = parseInt(limit.toString())
    }

    if(page == undefined) {
      offset = 0
    } else {
      offset = (parseInt(page.toString()) - 1) * size;
    }

    let todos = await Todo.findAndCountAll({
      limit: size,
      offset: offset
    })

    return res.json({
      res: todos
    })
  } catch (e) {
    return res.json({ err: e }).status(500);
  }

});

router.get(
  "/todo/:id", 
  ToDoValidator.validateIdParam(),
  CheckErrors.checkAllErrors,
  async (req: Request, res: Response) => {

  try {
    let todo = await Todo.findByPk(req.params['id'])

    if(todo == undefined) {
      return res.status(404).json({ msg : "Check your id" })
    }

    return res.json(todo)

  } catch (e) {
    return res.json({ err: e }).status(500);
  }

});

export default router;
