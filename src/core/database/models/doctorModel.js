import sequelize from "sequelize";
const { Model, DataTypes } = sequelize;
import { connection } from "../connection.js";

class doctor extends Model { }

doctor.init(
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
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sec_mobile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currently_working: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_reg_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    taluk: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pincode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sign: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ph_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    approval_status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      allowNull: true,
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

export { doctor };
