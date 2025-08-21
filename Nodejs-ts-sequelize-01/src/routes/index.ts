import express, {Request, Response} from "express";
import { Todo } from "../models";

import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

router.post('/create', async function(req: Request, res: Response) {

    const id = uuidv4()

    console.log("The body is: ", req.body)
    console.log("The id is: ", id)
    try{
        const todo = await Todo.create({ ...req.body, id })

        return res.json({ todo: todo }).status(201)
    } catch (e) {
        return res.json({ err: e }).status(500)
    }

    

})

export default router;