import { DataTypes } from "sequelize";
import { getDatabase } from "../utils.js";

export const EventTypeModel = getDatabase().define("event_type", {
  id: {
    type: DataTypes.INTEGER
  },
  owner: {
    type: DataTypes.INTEGER
  },
  start_date: {
    type: DataTypes.DATE
  },
  end_date: {
    type: DataTypes.DATE
  },
  duration: {
    type: DataTypes.INTEGER
  },
  repeat: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING
  },
  location: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  link: {
    type: DataTypes.STRING
  },
  color: {
    type: DataTypes.STRING
  },
  active: {
    type: DataTypes.BOOLEAN
  },
  team_id: {
    type: DataTypes.INTEGER
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  }
});
