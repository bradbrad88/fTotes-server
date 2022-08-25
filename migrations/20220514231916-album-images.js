"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS public.album_images
      (
        album_id INTEGER,
        image_id UUID,
        updated_at TIMESTAMPTZ,
        PRIMARY KEY (album_id, image_id),
        CONSTRAINT album_images_album_id_fkey FOREIGN KEY (album_id)
          REFERENCES public.albums (id) MATCH SIMPLE
            ON UPDATE CASCADE
            ON DELETE CASCADE,
        CONSTRAINT album_images_image_id_fkey FOREIGN KEY (image_id)
          REFERENCES public.image_gallery (image_id) MATCH SIMPLE
            ON UPDATE CASCADE
            ON DELETE CASCADE
      );`);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS public.album_images;`);
  },
};
