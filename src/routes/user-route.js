export const userRoute = async (request, reply) => {
  reply.send(request.user);
};
