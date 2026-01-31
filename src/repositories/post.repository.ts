import { PostType } from "../dtos/posts.dtos.js";
import { Post } from "../models/post.js";

export default class postRepository {
  static async findAll() {
    return await Post.findAll();
  }

  static async savePost(post: PostType) {
    return await Post.create(post);
  }

  static async findByTitle(title: string) {
    return await Post.findOne({ where: { title: title } });
  }

  static async findById(id: number) {
    return await Post.findByPk(id);
  }

  // static async updateExistingPost(post: PostResponseType) {}
}
