import * as models from "./models/index.js";
import { connection } from "./connection.js";
import { DBController } from "./DbController.js";
import { rootuser } from "./connection.js";
import { mode } from "../../../config/config.js";

export const modelAssociations = async () => {
  // models.stadium.hasOne(models.bookedstadium, {
  //   foreignKey: "stadium_id",
  // });
  // models.bookedstadium.belongsTo(models.stadium, {
  //   foreignKey: "stadium_id",
  //   sourceKey: "id",
  // });
  models.instantApproval.belongsTo(models.doctor, {
    foreignKey: "doctor_id",
    sourceKey: "id",
  });

  models.pet.hasOne(models.breed, {
    foreignKey: "pet_id",
  });

  models.editRequest.hasOne(models.doctor, {
    foreignKey: "doctor_id",
  })


};

//Check connection
export const dbConnection = async () => {
  return await connection.authenticate();
};

export const dbSync = async () => {
  //table associations
  await modelAssociations();

  //sync all Db Models
  await Promise.all(Object.values(models));
  //Create Db Models
  await connection.sync({ force: false });

  // default values
  // DBController.defaultUsers.Default.player(rootuser.player);
};
