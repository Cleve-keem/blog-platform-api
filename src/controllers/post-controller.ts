import { Request, Response } from "express";
import validatePostData from "../utils/validator.js";
import PostService from "../services/postService.js";
import { sendErrorResponse, sendSuccessResponse } from "../utils/response.js";
import { formatValidationError } from "../utils/helpers/formatError.js";
import { PostTitleExistError } from "../utils/expections/postError.js";

class postController {
  static async createPost(req: Request, res: Response) {
    try {
      const { data, error } = validatePostData(req.body);
      // Handle validation error
      if (error) {
        const errors = formatValidationError(error.issues);
        return sendErrorResponse(res, 400, "Validation error", errors);
      }
      // Create post if valid
      const post = await PostService.createPost(data);
      console.log("✅[CREATE POST CONTROLLER] Post created successfully!");
      return sendSuccessResponse(res, 201, "Post created successfully!", post);
    } catch (err: any) {
      console.log("[CREATE_POST CONTROLLER] Error creating post:", err.message);
      if (err instanceof PostTitleExistError) {
        return sendErrorResponse(res, err.code, err.message);
      }
      return sendErrorResponse(res, 500, "Error creating post");
    }
  }

  static async fetchPosts(_: Request, res: Response) {
    try {
      const posts = await PostService.getPosts();
      if (!posts) return sendErrorResponse(res, 400, "Error getting posts");

      console.log("✅[FETCH POSTS CONTROLLER] Post was fetched successfully!");
      return sendSuccessResponse(res, 200, "Post fetched successfully", posts);
    } catch (error: any) {
      console.log(
        "[FETCH POSTS CONTROLLER] Error fetching posts:",
        error.message,
      );
    }
  }
}

export default postController;
