import { DataTypes } from "sequelize";

import { sequelize } from "../database/database.js";

import { Role } from "./roleModel.js";
import { DniType } from "./dniTypeModel.js";


export const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    names: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastNames: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dni: {
        type: DataTypes.INTEGER,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthDate: {
        type: DataTypes.DATE,
    },
    city: {
        type: DataTypes.STRING,
    },
    country: {
        type: DataTypes.STRING,
    },
    lastLogin: {
        type: DataTypes.DATE,
    },
});

Role.hasMany(User);
User.belongsTo(Role);

DniType.hasMany(User);
User.belongsTo(DniType);

