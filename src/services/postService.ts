import { PostType } from "../dtos/posts.dtos.js";
import postRepository from "../repositories/post.repository.js";
import {
  PostNotFoundError,
  PostTitleExistError,
} from "../utils/expections/postError.js";

class PostService {
  static async createNewPost(post: PostType) {
    const exitPost = await postRepository.findByTitle(post.title);
    if (exitPost) throw new PostTitleExistError("Post title already exist");

    return await postRepository.savePost(post);
  }
  static async getAllPosts() {
    return await postRepository.findAll();
  }
  static async updateExistingPostById(
    postId: string | number,
    updatedPost: PostType,
  ) {
    const postInstance = await postRepository.findById(Number(postId));
    if (!postInstance) {
      throw new PostNotFoundError("Post not found!");
    }

    const newPost = await postInstance.update({
      title: updatedPost.title,
      content: updatedPost.content,
      tags: updatedPost.tags,
    });

    return newPost.dataValues;
  }
}

export default PostService;
