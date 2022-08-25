import { Sequelize } from "sequelize";

let sequelize = null;

export const initDatabase = () => {
  sequelize = new Sequelize("timeformeet", "madgest", "Aa19882002", {
    dialect: "postgres",
    host: "130.193.54.233",
    port: "5432"
  });
  return sequelize;
};

export const getDatabase = () => {
  return sequelize ? sequelize : initDatabase();
};
