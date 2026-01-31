import { PostSchema, PostType } from "../dtos/posts.dtos.js";

export default function validatePostData(post: PostType) {
  return PostSchema.safeParse(post);
}
