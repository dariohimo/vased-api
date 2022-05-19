import "dotenv/config.js";
import app from "./app.js";
import { sequelize } from "./database/database.js";

import "./models/userModel.js";
import "./models/answerModel.js";
import "./models/teacher_ClassroomModel.js";
import "./models/roleModel.js";
import "./models/taskModel.js";
import "./models/student_ClassroomModel.js";
import "./models/student_TaskModel.js";
import "./models/attendanceModel.js";
import "./models/calificationModel.js";
import "./models/classroomModel.js";
import "./models/dniTypeModel.js";
import "./models/teacherModel.js";
import "./models/studentModel.js";

async function main() {
    try {
        await sequelize.authenticate();
        console.log(
            "Connection --vaseddb-- has been established successfully."
        );
        await sequelize.sync({ force: true });
        //port used
        app.listen(3000);

        console.log("Server on port 3000");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

main();
