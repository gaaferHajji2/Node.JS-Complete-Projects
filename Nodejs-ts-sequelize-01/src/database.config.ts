import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config()

var db = new Sequelize("todos", process.env.USERNAME!, process.env.PASSWORD!, {
    dialect: "postgres",
    port: 5432
})

export default db;