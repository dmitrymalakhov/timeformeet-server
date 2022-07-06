import { EventScheduledModel } from "../models/event-scheduled-model.js";
import { EventScheduleModel } from "../models/event-schedule-model.js";
import { EventTypeModel } from "../models/event-type-model.js";

const InviteModel = EventScheduledModel.belongsTo(EventScheduleModel, {
  as: "eventSchedules"
});

export const invitesRoute = async (request, reply) => {
  const { hash } = request.params;

  const eventScheduled = await EventScheduledModel.findOne({
    where: {
      hash
    },
    include: InviteModel
  });

  const eventType = await EventTypeModel.findOne({
    where: {
      id: eventScheduled.eventSchedules.event_type_id
    }
  });

  reply.send({ eventScheduled, eventType });
};
