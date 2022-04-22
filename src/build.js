import fastify from "fastify";
import fastifyCookie from "fastify-cookie";
import middie from "middie";
import bcrypt from "bcrypt";
import cors from "cors";
import { initDatabase } from "./utils.js";
import { UserModel } from "./models/user-model.js";
import { generateToken, saveToken } from "./service/token-service.js";
import { UserDto } from "./dtos/user-dto.js";

export async function build(opts) {
  const sequelize = initDatabase();
  const app = fastify(opts);

  await app.register(middie);
  await app.register(fastifyCookie);

  app.use(cors());

  app.get("/", async (request, reply) => {
    return {};
  });

  app.get("/test", async (request, reply) => {
    await sequelize.authenticate();
    return { f: "f" };
  });

  app.post("/signup", async (request, reply) => {
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

      const tokens = generateToken(userDto);
      await saveToken(userDto.id, tokens.refreshToken);

      reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ user: userDto, ...tokens });
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  });

  app.post("/signin", async (request, reply) => {
    const { login, password, name } = JSON.parse(request.body);

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

    const tokens = generateToken(userDto);
    await saveToken(userDto.id, tokens.refreshToken);

    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .setCookie("refreshToken", tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })
      .send({ user: userDto, ...tokens });
  });

  return app;
}
