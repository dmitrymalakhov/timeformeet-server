import { DataTypes } from "sequelize";
import { getDatabase } from "../utils.js";

export const EventScheduleModel = getDatabase().define("event_schedule", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  event_type_id: {
    type: DataTypes.INTEGER
  },
  day: {
    type: DataTypes.STRING
  },
  start_time: {
    type: DataTypes.TIME
  },
  end_time: {
    type: DataTypes.TIME
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  }
});
