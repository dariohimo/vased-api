import Sequelize from "sequelize";


export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "ec2-44-194-4-127.compute-1.amazonaws.com",
    dialect: "postgres",
});

