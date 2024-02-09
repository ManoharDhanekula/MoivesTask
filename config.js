import { Sequelize } from "sequelize";
import "dotenv/config";
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname')
export const sequelize = new Sequelize(process.env.SQL_URL);
