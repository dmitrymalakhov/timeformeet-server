import { DataTypes } from "sequelize";
import { getDatabase } from "../utils.js";

export const EventScheduledModel = getDatabase().define(
  "event_scheduled",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    eventSchedulesId: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    comment: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.DATE
    },
    hash: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  },
  { tableName: "event_scheduled" }
);
