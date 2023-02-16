import sequelize from "sequelize";
const { Model, DataTypes } = sequelize;
import { connection } from "../connection.js";

class forum extends Model { }

forum.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        chatId: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        askerId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true,
        },
        replierId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true,
        },
        chat: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    { sequelize: connection, freezeTableName: true }
);

export { forum };
