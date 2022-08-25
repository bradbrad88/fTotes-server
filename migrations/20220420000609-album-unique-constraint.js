"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE public.albums
      ADD COLUMN
      url VARCHAR(255) NOT NULL,
      ADD CONSTRAINT uq_album_profile UNIQUE(owner, url);
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE public.albums
      DROP CONSTRAINT uq_album_profile,
      DROP COLUMN url;`);
  },
};
