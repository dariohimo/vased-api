import Sequelize from "sequelize";

export const sequelize = new Sequelize(
  "vaseddb", 
  "vasedAdmin", 
  "fundacion", 
  {
    host: "localhost",
    dialect: "postgres",
    
  }
);