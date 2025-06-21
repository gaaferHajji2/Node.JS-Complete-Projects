/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
const CoinAPI = require('../CoinAPI');

const Redis = require('ioredis');

class RedisBackend {

  constructor() {
    this.coinAPI = new CoinAPI();

    //this.url = 'redis://localhost:6379/1';

    this.client = null;
  }

  async connect() {
    this.client = new Redis(6379, 'localhost', {
      db: 0,
    });

    return this.client;
  }

  async disconnect() {
    return this.client.disconnect();
  }

  async insert(key, value) {
    // ioredis.insert()

    // this will add the number of docuemnt that inserted.
    // Here no Duplicte is Allowed Here.
    // WHERE key:value is a ordered set that no duplicate inside it.

    // here the second parameter can be multiple values not only 2-values.
    // it maybe 4, 6, 8, 10, ...etc.
    // this will only return the number of inserted items.
    return this.client.zadd('jafar:loka', [value, key]);
  }

  async getMax() {
    // Define the set that we want to use to get range of values.
    // get only the start element as last element.
    // get only the end element as last element.
    // then define WITHSCORES.
    return this.client.zrange('jafar:loka', -1, -1, 'WITHSCORES')
  }

  async max() {

  }
}

module.exports = RedisBackend;