import { UserModel } from "../models/user-model.js";
import { UserDto } from "../dtos/user-dto.js";
import {
  generateTokens,
  saveToken,
  findToken,
  validateRefreshToken
} from "../services/token-service.js";

export const userTokenRefresh = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error(401, "Unauthorized Error");
  }

  const userData = validateRefreshToken(refreshToken);
  const tokenFromDb = await findToken(refreshToken);

  if (!userData || !tokenFromDb) {
    throw new Error(401, "Unauthorized Error");
  }

  const user = await UserModel.findOne({ where: { id: userData.id } });
  const userDto = UserDto(user);
  const tokens = generateTokens({ ...userDto });

  await saveToken(userDto.id, tokens.refreshToken);

  return { ...tokens, user: userDto };
};
