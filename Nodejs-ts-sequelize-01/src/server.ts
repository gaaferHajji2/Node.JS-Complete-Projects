import express, {Request, Response} from "express"

import TodoRouter from './routes' 

import db from "./config/database.config";

db.sync().then(() => {
    console.log("Connected to db ok!!")
})

let app = express()

app.use(express.json())

app.use('/api', TodoRouter)

app.use((req: Request, res: Response) => {
    return res.status(200).json({
        "msg": "Server OK"
    });
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  
});

app.listen(process.env.PORT, (error) => {
    if(error){
        throw error;
    }

    console.log("Server listen on port: " + process.env.PORT);
})