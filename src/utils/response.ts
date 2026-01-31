import { Response } from "express";

export const sendSuccessResponse = (
  res: Response,
  code: number,
  message: string,
  response?: unknown,
) => {
  res.status(code).json({
    status: "succes",
    code,
    message,
    response,
  });
};

export const sendErrorResponse = (
  res: Response,
  code: number,
  message: string,
  errors?: unknown,
) => {
  res.status(code).json({
    status: "error",
    code,
    message,
    errors,
  });
};
