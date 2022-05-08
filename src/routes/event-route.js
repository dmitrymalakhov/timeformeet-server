import { EventTypeModel } from "../models/event-type-model.js";
import { EventScheduleModel } from "../models/event-schedule-model.js";

export const eventTypesRoute = async (request, reply) => {
  const eventTypes = await EventTypeModel.findAll();
  reply.send(eventTypes);
};

export const eventSchedulesRoute = async (request, reply) => {
  const eventTypes = await EventScheduleModel.findAll();
  reply.send(eventTypes);
};
