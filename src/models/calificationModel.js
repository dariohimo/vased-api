import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

import { Answer } from './answerModel.js';

export const Calification = sequelize.define('calification', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    feedback: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    grade: {
        type: DataTypes.INTEGER
    }
});

Answer.hasOne(Calification);
Calification.belongsTo(Answer);