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
  eventScheduledRoute,
  createEventScheduledRoute,
  invitesRoute
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

  const middlewares = { preHandler: [authMiddleware] };

  app.get("/", async (request, reply) => {
    return {};
  });

  app.get("/refresh", refreshRoute);
  app.post("/signup", signUpRoute);
  app.post("/signin", signInRoute);

  app.get("/user", middlewares, userRoute);
  app.get("/events/types", middlewares, eventTypesRoute);

  app.get("/events/schedules", middlewares, eventSchedulesRoute);
  app.get("/events/schedules/:id", middlewares, eventSchedulesRoute);
  app.get("/events/scheduled", middlewares, eventScheduledRoute);
  app.post("/events/scheduled", middlewares, createEventScheduledRoute);

  app.get("/invites/:hash", invitesRoute);

  return app;
}
