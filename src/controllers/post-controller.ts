import { Request, Response } from "express";
import validatePost from "../utils/validator.js";
import PostService from "../services/postService.js";
import { sendErrorResponse, sendSucessResponse } from "../utils/response.js";

const postController = async (req: Request, res: Response) => {
  try {
    const validatedPost = await validatePost(req.body);
    if (!validatedPost) {
      return res.status(400).json({ message: "Invalid post data provided." });
    }

    const post = await PostService.createPost(validatedPost);
    console.log("✅Post created successfully!");
    return sendSucessResponse(res, 201, "Post created successfully!", post);
  } catch (err: any) {
    console.log(err.message);
    return sendErrorResponse(res, 500, "Error creating post");
  }
};

export default postController;
