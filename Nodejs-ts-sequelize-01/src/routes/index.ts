import express, { NextFunction, Request, Response } from "express";
import { Todo } from "../models";

import ToDoValidator from "../validation/todo";
import { validationResult } from "express-validator/";

const router = express.Router();

router.post(
  "/create",
  ToDoValidator.validateCreateTodo(),
  (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req)

    if(!error.isEmpty()) {
        return res.json({ error }).status(400);
    }

    next()

  },
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
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if(!errors.isEmpty) {
      return res.json({ errors }).status(400)
    }

    next()
  },
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

    let todos = await Todo.findAll({
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

export default router;
