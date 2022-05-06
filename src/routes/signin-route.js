import bcrypt from "bcrypt";
import { UserModel } from "../models/user-model.js";
import { UserDto } from "../dtos/user-dto.js";
import { generateTokens, saveToken } from "../services/token-service.js";
import { getDatabase } from "../utils.js";
const sequelize = getDatabase();

export const signInRoute = async (request, reply) => {
  try {
    const { login, password } = JSON.parse(request.body);

    await sequelize.authenticate();

    const user = await UserModel.findOne({ where: { login } });

    if (!user) {
      throw new Error("The user with this login was not found");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw new Error(`Invalid password`);
    }

    const userDto = UserDto(user);

    const tokens = generateTokens(userDto);
    await saveToken(userDto.id, tokens.refreshToken);

    reply
      .setCookie("refreshToken", tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: "none",
        secure: true,
        httpOnly: true
      })
      .send({ user: userDto, ...tokens });
  } catch (e) {
    throw new Error(e);
  }
};
