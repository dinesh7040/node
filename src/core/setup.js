import chalk from "chalk";
import { dbConnection, dbSync } from "./database/initialize.js";
import { log } from "./lib/log.js";
import { logger } from "./utils/logger.js";
//Execute Table
export const setup = async (gloablConfig) => {
  await processBlock(
    dbConnection,
    chalk.green("Db connected successfully"),
    "Db connection failed"
  );
  dbSync();
  return gloablConfig;
};

const processBlock = async (func, successTxt, errorTxt) => {
  try {
    await func();
    log.show("Welcome to Vetsline");
    logger.info(successTxt);
  } catch (error) {
    console.log(errorTxt);
    throw new Error(error);
  }
};
