import { DataTypes } from "sequelize";

import { sequelize } from "../database/database.js";

import { Teacher } from "./teacherModel.js";
import { Classroom } from "./classroomModel.js";

export const Teacher_classroom = sequelize.define("teacher_classroom", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
});

Teacher.belongsToMany(Classroom, { through: "teacher_classroom" });
Classroom.belongsToMany(Teacher, { through: "teacher_classroom" });
