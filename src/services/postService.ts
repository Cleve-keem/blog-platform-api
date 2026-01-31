import { PostType } from "../dtos/posts.dtos.js";
import postRepository from "../repositories/post.repository.js";
import { PostTitleExistError } from "../utils/expections/postError.js";

class PostService {
  static async createPost(post: PostType) {
    const exitPost = await postRepository.findByTitle(post.title);
    if (exitPost) throw new PostTitleExistError("Post title already exist");

    return await postRepository.savePost(post);
  }
  static async getPosts() {
    return await postRepository.findAll();
  }
}

export default PostService;
