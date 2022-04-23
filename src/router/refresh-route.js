export const refreshRoute = async (request, reply) => {
  try {
    const { refreshToken } = request.cookies;

    reply.setCookie("bar", "bar").send({ hello: "world" });
  } catch (e) {
    throw new Error(e);
  }
};
