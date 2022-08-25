"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS public.verify_identity
      (
        id SERIAL PRIMARY KEY,
        profile UUID NOT NULL,
        email VARCHAR(255),
        code VARCHAR(255),
        provider VARCHAR(255),
        provider_user_id VARCHAR(255),
        expires TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        CONSTRAINT provider_user_id_uq UNIQUE(provider, provider_user_id)
      );
      DROP TABLE IF EXISTS public.verification_queue
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS public.verify_identity;
      CREATE TABLE IF NOT EXISTS public.verification_queue
      (
        id SERIAL PRIMARY KEY,
        profile uuid,
        email varchar(255) UNIQUE,
        secret varchar(171),
        status integer DEFAULT 0
      );
    `);
  },
};
