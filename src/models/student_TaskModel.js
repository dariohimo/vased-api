import { DataTypes } from "sequelize";

import { sequelize } from "../database/database.js";

export const Student_task = sequelize.define("student_task", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    isSolved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});
