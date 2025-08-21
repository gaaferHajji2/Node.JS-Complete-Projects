import express, {Request, Response} from "express"

import db from "./config/database.config";

db.sync().then(() => {
    console.log("Connected to db ok!!")
})

let app = express()

app.use(express.json())



app.use((req: Request, res: Response) => {
    return res.status(200).json({
        "msg": "Server OK"
    });
})

app.listen(3000, (error) => {
    if(error){
        throw error;
    }

    console.log("Server listen on port 3000");
})