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
  createEventTypesRoute,
  removeEventTypesRoute,
  eventSchedulesRoute,
  eventScheduledRoute,
  createEventScheduledRoute,
  invitesRoute,
} from "./routes/index.js";
import { authMiddleware } from "./middlewares/auth-middleware.js";

export async function build(opts) {
  const app = fastify(opts);

  await app.register(middie);
  await app.register(fastifyCookie);

  app.use(
    cors({
      origin: "https://q5nzr0-3000.preview.csb.app",
      methods: ["GET", "POST", "DELETE"],
      credentials: true,
    })
  );

  const middlewares = { preHandler: [authMiddleware] };

  app.get("/", async (request, reply) => {
    return {};
  });

  app.get("/refresh", refreshRoute);
  app.post("/signup", signUpRoute);
  app.post("/signin", signInRoute);

  app.get("/user", middlewares, userRoute);

  app.get("/events/types", middlewares, eventTypesRoute);
  app.post("/events/types", middlewares, createEventTypesRoute);
  app.delete("/events/types/:id", middlewares, removeEventTypesRoute);

  app.get("/events/schedules", middlewares, eventSchedulesRoute);
  app.get("/events/schedules/:id", middlewares, eventSchedulesRoute);
  app.get("/events/scheduled", middlewares, eventScheduledRoute);
  app.post("/events/scheduled", middlewares, createEventScheduledRoute);

  app.get("/invitees/:hash", invitesRoute);

  return app;
}
