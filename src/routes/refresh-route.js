import { userTokenRefresh } from "../services/user-service.js";

export const refreshRoute = async (request, reply) => {
  try {
    const { refreshToken } = request.cookies;

    const userData = await userTokenRefresh(refreshToken);

    reply
      .setCookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: "none",
        secure: true,
        httpOnly: true
      })
      .send(userData);
  } catch (e) {
    reply.code(401).send();
  }
};
