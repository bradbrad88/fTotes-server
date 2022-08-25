"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.query(`
      ALTER TABLE public.canvas_items
      ADD CONSTRAINT album_breakpoint_unq UNIQUE (album, breakpoint);
    `);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.query(`
      ALTER TABLE public.canvas_items
      REMOVE CONSTRAINT album_breakpoint_unq;
    `);
  },
};
