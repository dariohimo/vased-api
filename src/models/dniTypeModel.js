import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const DniType = sequelize.define('dniType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}
);
