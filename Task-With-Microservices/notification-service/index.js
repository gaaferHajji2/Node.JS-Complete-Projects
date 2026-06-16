import express from 'express'
import amqp from 'amqplib'
import dotenv from 'dotenv'

dotenv.config()

let channel, connection;
let app = express()

async function start() {
    try {
        connection = await amqp.connect(process.env.RABBITMQ_URL)
        channel = await connection.createChannel()
        await channel.assertQueue("task_created")
        console.log("Connection To RabbitMQ Successfully")
        channel.consume("task_created", (msg) => {
            const taskData = JSON.parse(msg.content.toString())
            console.log("The task data is: ", taskData)
            channel.ack(msg)
        })
    } catch (e) {
        console.error("Error In RabbitMQ Connection: " + e)
        throw new Error("RabbitMQ Connection Failed")
    }
}

start().then(() => { }).catch(e => {
    console.error("Error In Connection to RABBITMQ: " + process.env.RABBITMQ_URL)
    process.exit(1)
})

app.get("/health", (req, res) => {
    return res.json({
        hello: "hello task route"
    })
})

let PORT = process.env.PORT || 3002
console.log("PORT is: " + process.env.PORT)

app.listen(PORT, (err) => {
    if (err) {
        console.log("Error in creating server: ", err)
    }
    console.log(`Server running on: http://localhost:${PORT}/`)
})