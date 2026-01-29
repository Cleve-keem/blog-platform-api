import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import type { Application } from "express";
import expressLoader from "./app.js";
import type { Server } from "node:http";
import ProcessSupervisor from "./config/process-supervisor.js";
import { sequelize } from "./config/database.js";

const startServer = async () => {
  const app: Application = expressLoader();
  const PORT: number = Number(process.env.PORT);

  try {
    await sequelize.sync({ alter: true });
    console.log("[SEQUELIZE] ✅ Tables have been synced!");
    const server: Server = app.listen(PORT, () =>
      console.log(`[BOOT] server running on port ${PORT} (PID) ${process.pid}`),
    );
    const supervisor = new ProcessSupervisor(server, sequelize);
    supervisor.initialize();
  } catch (error: any) {
    console.error(
      "[SEQUELIZE ERROR] ❌ Database connection failed:",
      error.message,
    );
    console.error(
      "[BOOT ERROR] Failed to start the application:",
      error.message,
    );
    process.exit(1);
  }
};

startServer();
