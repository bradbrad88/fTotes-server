"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("image_display");
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS public.canvas_items
      (
        id SERIAL PRIMARY KEY,
        album INTEGER,
        breakpoint VARCHAR(255),
        items JSONB,
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        CONSTRAINT canvas_items_album_fkey FOREIGN KEY (album)
          REFERENCES public.albums (id) MATCH SIMPLE
            ON UPDATE cascade
            ON DELETE cascade
      )
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("canvas_items");
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS public.image_display
      (
          profile UUID,
          layouts jsonb,
          CONSTRAINT image_display_profile_fkey FOREIGN KEY (profile)
              REFERENCES public.profiles (profile_id) MATCH SIMPLE
              ON UPDATE CASCADE
              ON DELETE CASCADE
      )
    `);
  },
};
