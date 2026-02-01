import { Request, Response } from "express";
import validatePostData from "../utils/validator.js";
import PostService from "../services/postService.js";
import { sendErrorResponse, sendSuccessResponse } from "../utils/response.js";
import { formatValidationError } from "../utils/helpers/formatError.js";
import {
  PostNotFoundError,
  PostTitleExistError,
} from "../utils/expections/postError.js";

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
      const post = await PostService.createNewPost(data);
      console.log("✅ [CREATE POST CONTROLLER] Post created successfully!");
      return sendSuccessResponse(res, 201, "Post created successfully!", post);
    } catch (err: any) {
      console.log(
        "❌ [CREATE_POST CONTROLLER] Error creating post:",
        err.message,
      );
      if (err instanceof PostTitleExistError) {
        return sendErrorResponse(res, err.code, err.message);
      }
      return sendErrorResponse(res, 500, "Error creating post");
    }
  }

  static async fetchPosts(req: Request, res: Response) {
    const term = req.query.term as string;
    try {
      let posts;

      if (term) {
        console.log(`Searching for posts containing: ${term}`);
        posts = await PostService.findPostByTerm(term);
      } else {
        posts = await PostService.getAllPosts();
        if (!posts) return sendErrorResponse(res, 400, "Error getting posts");
      }

      console.log(
        "✅ [FETCH_POSTS CONTROLLER] Posts was fetched successfully!",
      );
      return sendSuccessResponse(res, 200, "Post fetched successfully", posts);
    } catch (error: any) {
      console.log(
        "❌ [FETCH_POSTS CONTROLLER] Error fetching posts:",
        error.message,
      );
      return sendErrorResponse(res, 500, "Error fetching posts", error.message);
    }
  }

  static async updatePost(req: Request, res: Response) {
    try {
      const updatedPost = await PostService.updateExistingPostById(
        req.params.id as string,
        req.body,
      );
      console.log(
        `✅ [UPDATED_POST CONTROLLER] Post (ID:${updatedPost.id}) was fetched successfully!`,
      );
      return sendSuccessResponse(
        res,
        201,
        "Post updated successfully",
        updatedPost,
      );
    } catch (error: any) {
      console.log(
        "❌ [UPDATED_POSTS CONTROLLER] Error fetching posts:",
        error.message,
      );
      return sendErrorResponse(res, 500, "Error updating post");
    }
  }

  static async deletePost(req: Request, res: Response) {
    try {
      await PostService.deletePostById(req.params.id as string);
      console.log("✅ [DELETE_POST_CONTROLLER] Post deleted successfully!");
      return sendSuccessResponse(res, 204, "Post deleted!");
    } catch (error: any) {
      console.log(
        "❌ [DELETE_POST_CONTROLLER] Error deleting post:",
        error.message,
      );
      if (error instanceof PostNotFoundError) {
        return sendErrorResponse(
          res,
          400,
          "Error deleting post",
          error.message,
        );
      }
      return sendErrorResponse(res, 500, "Something went wrong", error.message);
    }
  }

  static async getSinglePost(req: Request, res: Response) {
    try {
      const post = await PostService.getOnePostById(req.params.id as string);
      console.log("✅ [SINGLE_POST_CONTROLLER] Post fetched successfully!");
      return sendSuccessResponse(res, 200, "Post fetched!", post);
    } catch (error: any) {
      console.log(
        "❌ [SINGLE_POST_CONTROLLER] Error getting post:",
        error.message,
      );
      if (error instanceof PostNotFoundError) {
        return sendErrorResponse(res, 400, "Error getting post", error.message);
      }
      return sendErrorResponse(res, 500, "Something went wrong", error.message);
    }
  }
}

export default postController;
