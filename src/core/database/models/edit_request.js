import sequelize from "sequelize";
const { Model, DataTypes } = sequelize;
import { connection } from "../connection.js";

class editRequest extends Model { }

editRequest.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    doctor_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    query: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "rejected", "approved"),
      allowNull: false,
      defaultValue: "pending",
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  { sequelize: connection, freezeTableName: true }
);

export { editRequest };
