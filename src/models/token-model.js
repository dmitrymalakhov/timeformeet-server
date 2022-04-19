import { DataTypes } from "sequelize";
import { UserModel } from "./user-model.js";
import { getDatabase } from "../utils.js";

export const TokenModel = getDatabase().define("user", {
  user: {
    type: DataTypes.INTEGER,
    references: {
      model: UserModel,
      key: "id"
    }
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
