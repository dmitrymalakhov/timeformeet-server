import md5 from "md5";
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
  let eventScheduled = null;

  const { id } = request.params;

  if (id) {
    eventScheduled = await EventScheduledModel.findOne({ where: { id } });
  } else {
    eventScheduled = await EventScheduledModel.findAll();
  }

  reply.send(eventScheduled);
};

export const createEventScheduledRoute = async (request, reply) => {
  const { date, eventSchedulesId, comment, name, email } = JSON.parse(
    request.body
  );

  const eventScheduled = await EventScheduledModel.create({
    date,
    eventSchedulesId,
    comment,
    name,
    email,
    hash: md5(request.body)
  });

  reply.send(eventScheduled);
};
