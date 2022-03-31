import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  // Data is stored in the file `database.sqlite` in the folder `db`.
  // To prevent the database being copied on fork the db folder has been added to a .gitignore file
  storage: "/sandbox/db/database.db"
});

export const getDBInstance = () => {
  return sequelize;
};
