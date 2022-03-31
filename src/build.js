/* eslint strict:"off" */
"use strict";

import fastify from "fastify";
import { Sequelize } from "sequelize";
import fetch from "node-fetch";

export const build = (opts) => {
  const app = fastify(opts);

  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "/sandbox/db/database.db"
  });

  app.get("/", async (request, reply) => {
    return { hello: "world" };
  });

  app.get("/signup", async (request, reply) => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }

    return { hello: "world" };
  });

  app.get(
    "/login",
    {
      query: {
        name: {
          type: "string"
        }
      }
    },
    async (request, reply) => {
      // const { token } = request.query;
    }
  );

  return app;
};
