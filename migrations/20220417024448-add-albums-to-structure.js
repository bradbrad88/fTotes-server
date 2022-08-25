"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async transaction => {
      return await Promise.all([
        queryInterface.sequelize.query(
          `
          CREATE TABLE IF NOT EXISTS public.albums
          (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            owner UUID NOT NULL,
            CONSTRAINT albums_owner_fkey FOREIGN KEY (owner)
              REFERENCES public.profiles (profile_id) MATCH SIMPLE
                ON UPDATE CASCADE
                ON DELETE CASCADE
          )`,
          { transaction }
        ),
        queryInterface.sequelize.query(
          `
          ALTER TABLE public.image_gallery
          ADD COLUMN album INTEGER,
          ADD CONSTRAINT image_gallery_album_fkey FOREIGN KEY (album)
              REFERENCES public.albums (id) MATCH SIMPLE
              ON UPDATE CASCADE
              ON DELETE SET NULL`,
          { transaction }
        ),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async transaction => {
      return await Promise.all([
        queryInterface.sequelize.query(
          `
          ALTER TABLE public.image_gallery
          DROP CONSTRAINT image_gallery_album_fkey,
          DROP COLUMN album`,
          { transaction }
        ),
        queryInterface.sequelize.query(
          `
            DROP TABLE public.albums`,
          { transaction }
        ),
      ]);
    });
  },
};
