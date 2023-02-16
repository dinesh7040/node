import sequelize from "sequelize";
const { Model, DataTypes } = sequelize;
import { connection } from "../connection.js";

class dose extends Model {}

dose.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    one_m: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    one_v: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    oral: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "DEACTIVE", "DELETE"),
      allowNull: false,
      defaultValue: "ACTIVE",
    },
  },
  { sequelize: connection, freezeTableName: true }
);

export { dose };
