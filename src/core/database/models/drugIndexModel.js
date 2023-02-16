import sequelize from "sequelize";
const { Model, DataTypes } = sequelize;
import { connection } from "../connection.js";

class drugindex extends Model { }

drugindex.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dose: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    availability: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    note: {
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

export { drugindex };
