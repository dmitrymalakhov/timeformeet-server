module.exports = function (fastify, opts, done) {
  fastify.get('/user');
  done();
};
