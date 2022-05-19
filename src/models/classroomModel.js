import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Classroom = sequelize.define('classroom', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    capability: {
        type: DataTypes.INTEGER,

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false

    },
    code: {
        type: DataTypes.INTEGER,

    },
    adminDescription: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    format: {
        type: DataTypes.STRING,


    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false

    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false

    }

})