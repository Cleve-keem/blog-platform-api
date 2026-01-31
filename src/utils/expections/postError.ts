export class PostTitleExistError extends Error {
  public code: number;

  constructor(message: string) {
    super(message);
    this.name = "POST TITLE ERROR";
    this.code = 400;
  }
}

export class PostNotFoundError extends Error {
  public code: number;

  constructor(message: string) {
    super(message);
    this.name = "POST NOT FOUND";
    this.code = 400;
  }
}
