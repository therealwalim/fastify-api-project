"use strict";

module.exports = async function (fastify, opts) {
  fastify.route({
    method: "GET",
    schema: {
      responses: {
        200: {
          type: 'object',
          properties: {
            status: {type: 'string'},
            timestamp: {type: 'string', format: 'date-time'}
          }
        },
      },
    },
    url: "/",
    handler: async (request, reply) => {
      return { status: "ok", timestamp: new Date };
    },
  });

  /*fastify.get('/', async function (request, reply) {
    return { root: true }
  })
  */
};
