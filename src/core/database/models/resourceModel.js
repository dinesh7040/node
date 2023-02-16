import sequelize from "sequelize";
const { Model, DataTypes } = sequelize;
import { connection } from "../connection.js";

class resource extends Model { }

resource.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    adder: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    adderType: {
      type: DataTypes.ENUM("doctor", "customer"),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    doorno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taluk: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pincode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photos: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    resource_type: {
      type: DataTypes.ENUM(
        "PET_CLINIC",
        "LABS",
        "FEED_SHOPS",
        "FARM_EQUIPMENTS",
        "POULTRY_EQUIPMENTS"
      ),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      allowNull: false,
      defaultValue: "pending",
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  { sequelize: connection, freezeTableName: true }
);

export { resource };
