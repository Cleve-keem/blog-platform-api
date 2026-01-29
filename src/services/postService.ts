import { PostSchema } from "../dtos/posts.dtos.js";
import { Post } from "../models/post.js";

class PostService {
  static async createPost(post: PostSchema) {
    return await Post.create(post);
  }
}

export default PostService;
