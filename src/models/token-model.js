import { DataTypes } from "sequelize";
import { getDatabase } from "../utils.js";

export const TokenModel = getDatabase().define("token", {
  user: {
    type: DataTypes.INTEGER
  },
  refreshToken: {
    type: DataTypes.STRING
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  }
});
