import { Router } from "express";
import postController from "../controllers/post-controller.js";

const route: Router = Router();

route.post("/posts", postController.createPost);
route.get("/posts", postController.fetchPosts);
route.get("/posts/:id", postController.getSinglePost);
route.put("/posts/:id", postController.updatePost);
route.delete("/posts/:id", postController.deletePost);

export default route;
