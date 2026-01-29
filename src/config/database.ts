import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { Sequelize } from "sequelize";

const DATABASE_NAME = process.env.MYSQL_DATABASE_NAME as string;
const ROOT = process.env.MYSQL_DATABASE_USER as string;
const PASSWORD = process.env.MYSQL_DATABASE_PASSWORD as string;
const HOST = process.env.MYSQL_DATABASE_HOST || "127.0.0.1";

export const sequelize = new Sequelize(DATABASE_NAME, ROOT, PASSWORD, {
  host: HOST,
  port: Number(process.env.MYSQL_DATABASE_PORT) || 3306,
  dialect: "mysql",
  logging: false,
});

try {
  await sequelize.authenticate();
  console.log("[Sequelize] Connection has been established successfully.");
} catch (error) {
  console.error("[Sequelize] Unable to connect to the database:", error);
}
