import test, { describe } from "node:test";
import validatePost from "../src/utils/validator.js";

describe("validate post test", () => {
  test("that zod will validate post", async () => {
    const post = {
      title: "john doe",
      content: "testing if jest will work find",
      tags: ["jest, zos, practice"],
    };
    const validatePost = await validatePost(post);
  });
});
