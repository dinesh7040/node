import { Sequelize } from "sequelize";
import * as config from "../../../config/config.js";
const { database } =
  config.mode === "production" ? config.production : config.development;

//Declare & Assign Connection Variables
const connection = new Sequelize({
  database: database.db_name,
  host: database.host,
  username: database.username,
  password: database.password,
  dialect: "mysql",
  logging: false,
  dialectOptions: {
    typeCast: function (field, next) {
      // for reading from database
      if (field.type === "DATETIME") {
        return field.string();
      }
      return next();
    },
  },
  timezone: "+05:30",
});

export { connection };

export const rootuser = config.defaultuser;
