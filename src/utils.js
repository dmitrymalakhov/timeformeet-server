import { Sequelize } from "sequelize";

let sequelize = null;

export const initDatabase = () => {
  sequelize = new Sequelize("timeformeet", "madgest", "Aa19882002", {
    dialect: "postgres",
    host: "51.250.101.40",
    port: "5432"
  });
  return sequelize;
};

export const getDatabase = () => {
  return sequelize ? sequelize : initDatabase();
};
