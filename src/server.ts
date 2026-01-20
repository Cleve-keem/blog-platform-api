import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import type { Application } from "express";
import expressLoader from "./main/app.js";
import type { Server } from "node:http";
import ProcessSupervisor from "./config/process-supervisor.js";
import { connectDB } from "./config/db.js";

const startServer = async () => {
  const app: Application = expressLoader();
  const PORT: number = Number(process.env.PORT);

  try {
    const db = await connectDB();
    console.log(`[MYSQL] database successfully connected!`);

    const server: Server = app.listen(PORT, () =>
      console.log(`[BOOT] server running on port ${PORT} (PID) ${process.pid}`),
    );
    const supervisor = new ProcessSupervisor(server, db);
    supervisor.initialize();
  } catch (error) {
    console.error("[BOOT ERROR] Failed to start the application:", error);
    process.exit(1);
  }
};

startServer();
