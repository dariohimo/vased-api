
import "dotenv/config.js";
import app from "./app.js";
import { sequelize } from "./database/database.js";
import './models/userModel.js'
import './models/roleModel.js'
import './models/taskModel.js'
import './models/student_Classroom.js'


async function main() {
    try {
        await sequelize.authenticate();
        console.log(
            "Connection --vaseddb-- has been established successfully."
        );
        await sequelize.sync();
        //port used
        app.listen(3000);

        console.log("Server on port 3000");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

main();
