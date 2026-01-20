import express, { type Application } from "express";
import { limiter } from "../middleware/request-limiter.js";

const expressLoader = () => {
  const app: Application = express();

  app.use(limiter);
  app.use(express.json());

  app.get("/api/v1/health", (_, res) =>
    res.status(200).json({ status: "UP", pid: process.pid }),
  );

  return app;
};
export default expressLoader;
