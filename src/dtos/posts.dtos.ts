import z from "zod";

export const Post = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(4, "Content is too short!"),
  tags: z.array(z.string()),
});

export type PostSchema = z.infer<typeof Post>;
