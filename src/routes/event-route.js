import { EventTypeModel } from "../models/event-type-model.js";
import { EventScheduleModel } from "../models/event-schedule-model.js";
import { EventScheduledModel } from "../models/event-scheduled-model.js";

export const eventTypesRoute = async (request, reply) => {
  const eventTypes = await EventTypeModel.findAll();
  reply.send(eventTypes);
};

export const eventSchedulesRoute = async (request, reply) => {
  const eventSchedule = await EventScheduleModel.findAll();
  reply.send(eventSchedule);
};

export const eventScheduledRoute = async (request, reply) => {
  const eventScheduled = await EventScheduledModel.findAll();
  reply.send(eventScheduled);
};
