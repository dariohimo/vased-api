import "dotenv/config.js";
import app from "./app.js";
import { sequelize } from "./database/database.js";

import "./models/userModel.js";
import "./models/answerModel.js";
import "./models/roleModel.js";
import "./models/taskModel.js";
import "./models/classroomModel.js";
import "./models/dniTypeModel.js";
import "./models/user_task_classroomModel.js";
import "./models/user_classroomModel.js";
import "./models/task_classroomModel.js";

async function main() {
    try {
        await sequelize.authenticate();
        console.log(
            "Connection --vaseddb-- has been established successfully."
        );
        await sequelize.sync({ alter: true });
        //port used
        app.listen(process.env.PORT || 3000);

        console.log("Server on port", process.env.PORT || 3000);
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

main();
