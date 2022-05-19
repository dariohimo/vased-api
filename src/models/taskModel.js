import {
    DataTypes
} from 'sequelize';

import {
    sequelize
} from '../database/database.js';

import { User } from './userModel.js';

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
    },
    baseScore: {
        type: DataTypes.INTEGER
    }

});

User.hasMany(Task);
Task.belongsTo(User);