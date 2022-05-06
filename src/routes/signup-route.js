import bcrypt from "bcrypt";
import { UserModel } from "../models/user-model.js";
import { UserDto } from "../dtos/user-dto.js";
import { generateTokens, saveToken } from "../services/token-service.js";
import { getDatabase } from "../utils.js";

const sequelize = getDatabase();

export const signUpRoute = async (request, reply) => {
  try {
    const { login, password, name } = JSON.parse(request.body);

    await sequelize.authenticate();

    const hashPassword = await bcrypt.hash(password, 3);

    const user = await UserModel.create({
      login,
      password: hashPassword,
      name
    });

    const userDto = new UserDto(user);

    const tokens = generateTokens(userDto);
    await saveToken(userDto.id, tokens.refreshToken);

    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ user: userDto, ...tokens });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
