import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { User } from "./userModel.js";

export const Student = sequelize.define("student", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
});

User.hasOne(Student);
Student.belongsTo(User);
