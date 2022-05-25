import "dotenv/config.js";
import app from "./app.js";
import { sequelize } from "./database/database.js";



//models
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
        // sequelize connection
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        //port used
        app.listen(process.env.PORT || 3000);

        console.log("Server on port", process.env.PORT || 3000);
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

main();
