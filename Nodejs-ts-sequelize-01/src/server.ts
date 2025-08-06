import express, {Request, Response,} from "express"

import db from "./config/database.config";

let app = express()

app.get('/', (req: Request, res: Response) => {

    return res.status(200).json({
        "msg": "The main route, Hello World"
    })

});

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