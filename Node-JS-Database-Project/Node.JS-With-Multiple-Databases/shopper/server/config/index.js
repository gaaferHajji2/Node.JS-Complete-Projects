const pkg = require('../../../../package.json');

module.exports = {
  applicationName: pkg.name,
  mongodbConnectionURL: 'mongodb://127.0.0.1:27017/shopper-db-course',

  redis: {
    port: 6379,
    client: null,
  },

  mysql: {
    options: {
      host: 'localhost',
      port: 3306,
      database: 'shopper',
      username: 'root',
      password: null,
      dialect: 'mysql',
      charset: 'utf8',
      collate: 'utf8_general_ci', 
      timestamps: true,
    },
    
    client: null,
  }
};
