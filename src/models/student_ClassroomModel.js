import { DataTypes } from "sequelize";

import { sequelize } from "../database/database.js";

export const Student_classroom = sequelize.define("student_classroom", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    sessionTime: {
        type: DataTypes.TIME,
    }
});
