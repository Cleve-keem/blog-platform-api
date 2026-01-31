export class PostTitleExistError extends Error {
  public code: number;

  constructor(message: string) {
    super(message);
    this.name = "Post Error";
    this.code = 400;
  }
}
