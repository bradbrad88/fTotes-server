"use strict";
require("dotenv").config();
const fs = require("fs");
const roles = require("../config/roles.json");

const genSql = () => {
  const values = Object.entries(roles).map(([key, obj]) => {
    return `(${obj.value}, '${key}', '${obj.description}')`;
  });
  return values.join(", ");
};
const rolesSql = genSql();

let sql = fs.readFileSync("createDB.sql").toString();
sql = sql.replace(/USER_ENVIRONMENT_VARIABLE/g, process.env.DB_USER);
sql = sql.replace(/ROLES_ENVIRONMENT_VARIABLE/, rolesSql);

module.exports = {
  up: async queryInterface => {
    return queryInterface.sequelize.transaction(transaction => {
      return Promise.all([queryInterface.sequelize.query(sql)]);
    });
  },

  down: async queryInterface => {
    await queryInterface.dropAllTables();
  },
};
