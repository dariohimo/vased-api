import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { User } from './userModel.js';

export const Classroom = sequelize.define('classroom', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    capacity: {
        type: DataTypes.INTEGER,

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false

    },
    code: {
        type: DataTypes.STRING,

    },
    adminDescription: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    endsAt : {
        type: DataTypes.DATEONLY
    }
})

User.hasMany(Classroom, {
    foreignKey: "createdBy",
});
Classroom.belongsTo(User, {
    foreignKey: "createdBy",
});

