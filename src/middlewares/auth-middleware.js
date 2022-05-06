import { validateAccessToken } from "../services/token-service.js";

export const authMiddleware = (request, response, next) => {
  const unauthorizedError = () => {
    response.statusCode = 401;
    next(new Error("Authentication error"));
  };

  try {
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      unauthorizedError();
    }

    const accessToken = authorizationHeader.split(" ")[1];

    if (!accessToken) {
      unauthorizedError();
    }

    const userData = validateAccessToken(accessToken);

    if (!userData) {
      unauthorizedError();
    }

    request.user = userData;

    next();
  } catch (e) {
    unauthorizedError();
  }
};
