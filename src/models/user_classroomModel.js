import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { User } from "./userModel.js";
import { Classroom } from "./classroomModel.js";

export const User_Classroom = sequelize.define("user_classroom", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
});

User.belongsToMany(Classroom, {through: "user_classroom"});
Classroom.belongsToMany(User, {through: "user_classroom"});