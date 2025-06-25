// const coinAPI = require('./Node.JS-With-Multiple-Databases/maxcoin/services/CoinAPI');

const MongoBackend = require('./Node.JS-With-Multiple-Databases/maxcoin/services/backend/MongoBackend');

const RedisBackend = require('./Node.JS-With-Multiple-Databases/maxcoin/services/backend/RedisBackend');

const MySQLBackend = require('./Node.JS-With-Multiple-Databases/maxcoin/services/backend/MySQLBackend');

const mongoBackend= new MongoBackend();

async function runMongo(){
    // const obj1 = new coinAPI();

    await mongoBackend.max();

    // await mongoBackend.insert('Jafar', 'Loka');


    const result = await mongoBackend.getAllData();

    console.log(result);

    console.log("====================================");

    // result = obj1.fetch();

    //return result;
}

const redisBackend = new RedisBackend();

let client = null;

async function runRedis() {
    

    console.time('redis-connect-to-db');

    client = redisBackend.connect();
}

async function runMySQL() {
    let mysqlBackend = new MySQLBackend();

    return await mysqlBackend.max();
}

// runMongo().then((result)=> {
//     console.log("Before Dislay List Of Data");
//     //console.log(result);
//     console.time('disconnect-from-mongodb');
//     mongoBackend.disconnect().then(()=> {
//         console.timeEnd('disconnect-from-mongodb');
//         console.log('Disconnect From MongoDB');
//     });
//     console.log("After Return List Of Data");
// }).catch((err)=> {
//     throw err;
// })

// runRedis().then(async ()=>{
//     console.timeEnd('redis-connect-to-db');

//     console.time('redis-disconnect-db');

//     // await redisBackend.insert('Jafar-Loka-01', 'Jafar-Loka-01'); // this will produce an error
//     await redisBackend.insert('Jafar-Loka-09', 400000);
//     await redisBackend.insert('Jafar-Loka-07', 350000);
//     await redisBackend.insert('Jafar-Loka-04', 175000);
//     await redisBackend.insert('Jafar-Loka-01', 250000);

//     const result = await redisBackend.getMax();

//     console.log('The Result of Max Operation is: ' + result);


//     redisBackend.disconnect().then(()=>{
//         console.timeEnd('redis-disconnect-db');
//         console.log('disconnect from redis db');
//     });
// }).catch((err)=> {
//     throw err;
// })

runMySQL().then((value) => {
    console.log(`The Value of MySQL is: ${value}`);
});