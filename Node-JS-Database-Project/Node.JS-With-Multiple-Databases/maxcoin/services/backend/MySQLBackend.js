/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
const CoinAPI = require('../CoinAPI');

const mysql2 = require('mysql2/promise');

class MySQLBackend {

  constructor() {
    //this.coinAPI = new CoinAPI();

    this.connection = null;
  }

  async connect() {
    this.connection = await mysql2.createConnection({
      host: 'localhost',
      database: 'test',
      port: 3306,
      user: 'root',
      password: null,
    });

    return this.connection;
  }

  async disconnect() {
    await this.connection.end();
  }

  async insert(coindate, coinvalue) {
    const query = "INSERT INTO coin_values (coindate, coinvalue) VALUES (?, ?)";

    await this.connection.execute(query, [coindate, coinvalue]);

    console.log(`Successfully Inserting Data ${coindate}, ${coinvalue}`);

    // if we have array of array values [[1, 2], [3, 4]] then we can use
    // this.connection.query(sql, [values]).
    // where values is array of array.
  }

  async getMax() {
    const query = "SELECT * FROM `coin_values` ORDER BY coinvalue DESC LIMIT 1;";

    let result = await this.connection.execute(query);

    return result;
  }

  async max() {
    await this.connect();

    // this.insert('2023-12-12', 15000);
    // this.insert('2023-12-13', 30000);
    // this.insert('2023-12-14', 45000);
    // this.insert('2023-12-15', 60000);


    const result = await this.getMax();

    // console.log(`The Result of Get Max Operation is: ${result[0][0].id}, ${result[0][0].coindate}, ${result[0][0].coinvalue}`);
    // console.log(`The Final Result is: ${JSON.stringify(result[0][0])}`);
    console.log(result[0][0]);
    console.log(result[0]);
    // console.log(`The Result of Get Max Operation is: ${result[1]}`);

    
    // console.log(Object.keys(result[0]));
    // console.log(Object.entries(result[0]));
    // console.log("-------------------------");
    // console.log(Object.keys(result[1]));
    // console.log(Object.entries(result[1]));

    await this.disconnect();

    console.log('Successfully Connection And Disconnect From DB.');
  }
}

module.exports = MySQLBackend;