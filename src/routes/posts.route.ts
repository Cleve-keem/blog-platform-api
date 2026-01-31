import { Router } from "express";
import postController from "../controllers/post-controller.js";

const route: Router = Router();

route.post("/posts", postController.createPost);
route.get("/posts", postController.fetchPosts);
route.put("/posts/:id", postController.updatePost);

export default route;
