import jwt from "jsonwebtoken";
import { TokenModel } from "../models/token-model.js";

export const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15h"
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d"
  });

  return {
    accessToken,
    refreshToken
  };
};

export const saveToken = async (userId, refreshToken) => {
  const tokenData = await TokenModel.findOne({ user: userId });

  if (tokenData) {
    const token = await TokenModel.update(
      { refreshToken },
      {
        where: {
          user: userId
        }
      }
    );

    return token;
  }

  const token = await TokenModel.create({ user: userId, refreshToken });

  return token;
};

export const validateAccessToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return userData;
  } catch (e) {
    return null;
  }
};

export const validateRefreshToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return userData;
  } catch (e) {
    return null;
  }
};

export const removeToken = async (refreshToken) => {
  const tokenData = await TokenModel.deleteOne({ refreshToken });
  return tokenData;
};

export const findToken = async (refreshToken) => {
  const tokenData = await TokenModel.findOne({ refreshToken });
  return tokenData;
};
