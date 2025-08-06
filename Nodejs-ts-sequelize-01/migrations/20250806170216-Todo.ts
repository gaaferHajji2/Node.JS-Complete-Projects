'use strict';

import { DataTypes, QueryInterface, Sequelize } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

      return queryInterface.createTable('todos', {
        id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          allowNull: false,
        },

        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        completed: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        }
      })
  },

  down: (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

      return  queryInterface.dropTable('todos');
  }
};
