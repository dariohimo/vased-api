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
    },
    lastNames: {
        type: DataTypes.STRING,
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
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

Role.hasMany(User, {
    foreignKey: {
        allowNull: false,
    },
});
User.belongsTo(Role, {
    foreignKey: {
        allowNull: false,
    },
});

DniType.hasMany(User);
User.belongsTo(DniType);
