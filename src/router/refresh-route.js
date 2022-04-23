export const refreshRoute = async (request, reply) => {
  try {
    const { refreshToken } = request.cookies;

    reply.send({ refreshToken });
  } catch (e) {
    throw new Error(e);
  }
};
