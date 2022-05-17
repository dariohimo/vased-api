import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

import { Student_classroom } from './student_Classroom.js';

export const Attendance = sequelize.define('attendance', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,

    },
    time: {
        type: DataTypes.TIME,
        allowNull: false,
    },

})

Student_classroom.hasMany(Attendance)
Attendance.belongsTo(Student_classroom)