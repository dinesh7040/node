import sequelize from "sequelize";
const { Model, DataTypes } = sequelize;
import { connection } from "../connection.js";

class payments extends Model { }

payments.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM("poultry", "ruminant"),
            allowNull: false,
            defaultValue: "poultry",
        },
        ingredients: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        range: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        me: {
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

export { payments };
