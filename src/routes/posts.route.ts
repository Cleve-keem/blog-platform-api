import { Router } from "express";
import postController from "../controllers/post-controller.js";

const route: Router = Router();

route.post("/posts", postController.createPost);
route.get("/posts", postController.fetchPosts);

export default route;
