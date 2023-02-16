import sequelize from "sequelize";
const { Model, DataTypes } = sequelize;
import { connection } from "../connection.js";

class availability extends Model {}

availability.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    trade_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    presentative: {
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

export { availability };
