import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import  {User_Task_Classroom} from "./user_task_classroomModel.js";

export const Answer = sequelize.define("answer", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    answer_text: {
        type: DataTypes.TEXT,
    },
    feedback: {
        type: DataTypes.TEXT,
    },
    score: {
        type: DataTypes.INTEGER,
    },
});

User_Task_Classroom.hasOne(Answer);
Answer.belongsTo(User_Task_Classroom);

Answer.hasOne(User_Task_Classroom, {
    foreignKey: "answer_id",
})
User_Task_Classroom.belongsTo(Answer, {
    foreignKey: "answer_id",
})