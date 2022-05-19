import { DataTypes } from "sequelize";

import { sequelize } from "../database/database.js";

import { Student_task } from "./student_TaskModel.js";

export const Answer = sequelize.define("answer", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    answer_text: {
        type: DataTypes.STRING,
    },
});

Student_task.hasOne(Answer);
Answer.belongsTo(Student_task);