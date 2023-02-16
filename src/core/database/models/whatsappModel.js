import sequelize from "sequelize";
const { Model, DataTypes } = sequelize;
import { connection } from "../connection.js";

class whatsapp extends Model {}

whatsapp.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    link: {
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

export { whatsapp };
