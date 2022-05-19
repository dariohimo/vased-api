import { DataTypes } from "sequelize";

import { sequelize } from "../database/database.js";

import { Student } from "./studentModel.js";
import  {Classroom}  from "./classroomModel.js";

export const Student_classroom = sequelize.define("student_classroom", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    sessionTime: {
        type: DataTypes.TIME,
    }
});

Student.belongsToMany(Classroom, {through: 'student_classroom'});
Classroom.belongsToMany(Student, {through: 'student_classroom'});
