import fastify from "fastify";
import fastifyCookie from "fastify-cookie";
import middie from "middie";
import cors from "cors";
import {
  refreshRoute,
  signInRoute,
  signUpRoute,
  userRoute,
  eventTypesRoute,
  eventSchedulesRoute,
  eventScheduledRoute
} from "./routes/index.js";
import { authMiddleware } from "./middlewares/auth-middleware.js";

export async function build(opts) {
  const app = fastify(opts);

  await app.register(middie);
  await app.register(fastifyCookie);

  app.use(
    cors({
      origin: "https://h5qzuy.csb.app",
      methods: ["GET", "POST"],
      credentials: true
    })
  );

  app.get("/", async (request, reply) => {
    return {};
  });

  app.get("/refresh", refreshRoute);
  app.post("/signup", signUpRoute);
  app.post("/signin", signInRoute);

  app.get("/test", { preHandler: [authMiddleware] }, async (request, reply) => {
    return { f: "f" };
  });

  app.get("/user", { preHandler: [authMiddleware] }, userRoute);
  app.get("/events/types", { preHandler: [authMiddleware] }, eventTypesRoute);

  app.get(
    "/events/schedules",
    { preHandler: [authMiddleware] },
    eventSchedulesRoute
  );

  app.get(
    "/events/scheduled",
    { preHandler: [authMiddleware] },
    eventScheduledRoute
  );
  return app;
}
