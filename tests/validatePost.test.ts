import validatePostData from "../src/utils/validator.js";

describe("Post data validation mode", () => {
  it("should validate data when input is valid", async () => {
    const post = {
      title: "Hello World",
      content: "This is a valid mock data",
      category: "Technology",
      tags: ["test", "jest", "mock"],
    };

    const { data } = validatePostData(post as any);
    expect(data).toEqual(post);
  });

  it("should fail when post title fields is empty", async () => {
    const post = {
      title: "",
      content: "This is a valid mock data",
      tags: ["test", "jest", "mock"],
    };
    const { success } = validatePostData(post as any);
    expect(success).toBe(false);
  });
  // expect(response).toEqual(
  //   expect.objectContaining({
  //     status: "success",
  //     code: 200,
  //     message: expect.any(String),
  //     response: expect.arrayContaining([
  //       expect.objectContaining({
  //         id: expect.any(Number),
  //         title: post.title,
  //         content: post.content,
  //         tags: post.tags,
  //         createdAt: expect.any(String),
  //         updatedAt: expect.any(String),
  //       }),
  //     ]),
  //   }),
});
