import dotenv from "dotenv";
import { Sequelize, Options } from "sequelize";

dotenv.config()

// console.log("username is: " + process.env.USER)
// console.log("Password is: " + process.env.PASSWORD)

var db = new Sequelize("db", process.env.user!, process.env.PASSWORD!, {
    dialect: "postgres",
    port: 5432,
    logging: console.log,
})

export default db;