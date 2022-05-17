import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

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

    studend_classroom_id: {
        type: DataTypes.STRING,
    }

})