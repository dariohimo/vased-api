import {
    DataTypes
} from 'sequelize';

import {
    sequelize
} from '../database/database.js';


export const Task = sequelize.define('task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.INTEGER
    },
    description: {
        type: DataTypes.STRING
    },
    format: {
        type: DataTypes.STRING
    }

});