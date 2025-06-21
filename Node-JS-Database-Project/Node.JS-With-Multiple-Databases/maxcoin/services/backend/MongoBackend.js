const CoinAPI = require('../CoinAPI');

const mongoose = require('mongoose');

class MongoBackend {

  constructor() {
    this.coinAPI = new CoinAPI();

    this.values = new mongoose.Schema({
      key: {
        type: String,
        required: true,
      },

      value: {
        type: String,
        required: true,
      }
    });


    this.Values = mongoose.model('Values', this.values);
  }

  async connect() {
    mongoose.connect('mongodb://localhost:27017/nodejs-db-course', {
      //useNewUrlParser: true,
      //useUnifiedTolpology: true
    }).then((res)=> {
      console.log("Connection To MongoDB OK");
      //console.log(typeof res);
    }).catch((err)=> {
      throw err;
    });
  }

  async disconnect() {
    await mongoose.disconnect();
  }

  async insert(key, value) {
    console.time('saving-key-value-data');
    const doc = this.Values({
      key, value
    });

    await doc.save();

    console.timeEnd('saving-key-value-data')
  }

  async getMax() {}

  async max() {
    console.log('Connecting To MongoDB');
    console.time('connect-to-mongodb');

    await this.connect();

    console.timeEnd('connect-to-mongodb');
  }

  async getAllData() {
    console.time('get-all-mongoose-data');
    const result = await this.Values.find({});
    console.timeEnd('get-all-mongoose-data');

    return result;
  }
}

module.exports = MongoBackend;