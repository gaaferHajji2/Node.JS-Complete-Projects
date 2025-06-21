#!/usr/bin/env node

const http = require('http');

const mongoose = require('mongoose');

const Redis = require('ioredis');

const config = require('../config');
const App = require('../app');

const Sequelize = require('sequelize');

async function connectToMongoose(){
  console.time('connection-to-mongodb-using-shopper-project');
  return mongoose.connect(config.mongodbConnectionURL);
}

function connectToRedis(){
  const redis = new Redis(config.redis.port);

  redis.on('connect', function(){
    console.log('Successfully Connect To Redis');
  });

  redis.on('error', (err)=>{
    // throw err;

    console.error(err);

    process.exit(1);
  });

  return redis;
}

function connectToMySQL() {
  const sequelize = new Sequelize(config.mysql.options);

  sequelize.authenticate().then(() => {
    console.log("Connection to MYSQL OK");
  }).catch((err) => {
    console.error(err);

    process.exit(1);
  });

  return sequelize;
}

const redis = connectToRedis();

const mysql = connectToMySQL();

config.mysql.client = mysql;

config.redis.client = redis;

/* Logic to start the application */
const app = App(config);
const port = process.env.PORT || '3000';
app.set('port', port);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port  ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

const server = http.createServer(app);
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;

  console.info(`${config.applicationName} listening on ${bind}`);
}
server.on('error', onError);
server.on('listening', onListening);

connectToMongoose().then((connectionObj)=> {
  console.timeEnd('connection-to-mongodb-using-shopper-project');
  console.log('Connection To MongoDB is OK...');
  server.listen(port);

}).catch((err)=> {
  throw err;
})

//connectToRedis();