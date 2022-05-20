import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Task } from "./taskModel.js";
import { Classroom } from "./classroomModel.js";
import { User } from "./userModel.js";

export const Task_Classroom = sequelize.define("task_classroom", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
});

Task.belongsToMany(Classroom, { through: "task_classroom" });
Classroom.belongsToMany(Task, { through: "task_classroom" });

User.hasMany(Task_Classroom, {
    foreignKey: "createdBy",
});
Task_Classroom.belongsTo(User);
