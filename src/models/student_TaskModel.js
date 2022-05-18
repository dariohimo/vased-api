import { DataTypes } from "sequelize";

import { sequelize } from "../database/database.js";

import {Task} from "./taskModel.js";
import { Student_classroom } from "./student_Classroom.js";

export const Student_task = sequelize.define("student_task", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    isSolved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});

Task.belongsToMany(Student_classroom, {through: 'student_task'});
Student_classroom.belongsToMany(Task, {through: 'student_task'});