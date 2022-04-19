import fastify from "fastify";
import middie from "middie";
import bcrypt from "bcrypt";
import cors from "cors";
import { initDatabase } from "./utils.js";
import { UserModel } from "./models/user-model.js";

export async function build(opts) {
  const sequelize = initDatabase();
  const app = fastify(opts);

  await app.register(middie);

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

      reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ user });
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

    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ user });
  });

  return app;
}
