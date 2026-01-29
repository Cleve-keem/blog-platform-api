import express, { type Application } from "express";
import { limiter } from "./middlewares/request-limiter.js";
import postRoutes from "./routes/posts.route.js";

const expressLoader = () => {
  const app: Application = express();

  app.use(limiter);
  app.use(express.json());

  app.get("/api/v1/health", (_, res) =>
    res.status(200).json({ status: "UP", pid: process.pid }),
  );

  app.use("/api/v1", postRoutes);

  return app;
};
export default expressLoader;
