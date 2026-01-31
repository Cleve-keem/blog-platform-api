import { z } from "zod";

export const PostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters long")
    .max(120, "Title cannot exceed 100 characters"),

  content: z
    .string()
    .trim()
    .min(10, "Content is too short! Please provide at least 10 characters"),

  category: z.string().trim().min(3, "Category is needed! Please provide one"),

  tags: z
    .array(z.string().min(1, "Tag cannot be empty").toLowerCase())
    .max(5, "You can only add up to 5 tags")
    .optional()
    .default([]),
});

export type PostType = z.infer<typeof PostSchema>;
