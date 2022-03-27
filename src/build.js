/* eslint strict:"off" */
'use strict';

import fastify from 'fastify';
import fetch from 'node-fetch';

export const build = (opts) => {
  const app = fastify(opts);

  app.get('/', async (request, reply) => {
    return { hello: 'world' };
  });

  app.get(
    '/login',
    {
      query: {
        name: {
          type: 'string'
        }
      }
    },
    async (request, reply) => {
      // const { token } = request.query;
    }
  );

  return app;
};
