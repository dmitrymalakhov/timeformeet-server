import { DataTypes } from "sequelize";
import { getDatabase } from "../utils.js";

export const UserModel = getDatabase().define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  },
  login: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  }
});
