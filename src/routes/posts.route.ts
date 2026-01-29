import { Router } from "express";
import postController from "../controllers/post-controller.js";

const route: Router = Router();

route.post("/posts", postController);

export default route;
