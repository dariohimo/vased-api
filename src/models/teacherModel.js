import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { User } from "./userModel.js";

export const Teacher = sequelize.define("teacher", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
});

User.hasOne(Teacher);
Teacher.belongsTo(User);
