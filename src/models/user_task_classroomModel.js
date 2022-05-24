import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Task_Classroom } from "./task_classroomModel.js";
import { User } from "./userModel.js";

export const User_Task_Classroom = sequelize.define("user_task_classroom", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
});

Task_Classroom.belongsToMany(User, { through: "user_task_classroom" });
User.belongsToMany(Task_Classroom, { through: "user_task_classroom" });

User.hasMany(User_Task_Classroom, {
    foreignKey: "createdBy",
});
User_Task_Classroom.belongsTo(User, {
    foreignKey: "createdBy",
});
