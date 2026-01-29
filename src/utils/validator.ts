import { ZodError } from "zod";
import { Post, PostSchema } from "../dtos/posts.dtos.js";

export default async function validatePost(post: PostSchema) {
  try {
    const validatedData = await Post.parseAsync(post);
    return validatedData;
  } catch (err) {
    if (err instanceof ZodError) {
      console.error("❌Validation failed:", err.message);
      return;
    }
    console.error("❌Error occur during validation!");
  }
}
