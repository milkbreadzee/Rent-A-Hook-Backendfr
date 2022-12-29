import { Sequelize } from "sequelize";
const db = new Sequelize('auth_db', 'root', 'iloverosh69', {
    host: "localhost",
    dialect: "mysql"
});
 
export default db;