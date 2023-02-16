import sequelize from "sequelize";
const { Model, DataTypes } = sequelize;
import { connection } from "../connection.js";

class buysell extends Model { }

buysell.init(
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
    adder_type: {
      type: DataTypes.ENUM("doctor", "customer"),
      allowNull: false,
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("male", "female"),
      allowNull: false,
    },
    age: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobile: {
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
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    signature: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    txnId: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    bankTxnId: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    gateway: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bankName: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    txnDate: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    paytm_result: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    payment_status: {
      type: DataTypes.ENUM("pending", "paid"),
      allowNull: false,
      defaultValue: "pending",
    },
    ph_verification_status: {
      type: DataTypes.ENUM("pending", "verified"),
      allowNull: false,
      defaultValue: "pending",
    },
    status: {
      type: DataTypes.ENUM("none", "published", "draft"),
      defaultValue: "none",
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  { sequelize: connection, freezeTableName: true }
);

export { buysell };
