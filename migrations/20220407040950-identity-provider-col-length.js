"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.query(`
      ALTER TABLE profile_identities
      AlTER COLUMN provider_name TYPE varchar(255);
    `);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.query(`
      ALTER TABLE profile_identities
      AlTER COLUMN provider_name TYPE varchar(20);
    `);
  },
};
