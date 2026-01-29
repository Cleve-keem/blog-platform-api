import { Response } from "express";

export const sendSucessResponse = (
  res: Response,
  code: number,
  message: string,
  data?: unknown,
) => {
  res.status(code).json({
    status: "succes",
    code,
    message,
    data,
  });
};

export const sendErrorResponse = (
  res: Response,
  code: number,
  message: string,
  error: any = null,
) => {
  res.status(code).json({
    status: "error",
    code,
    message,
    error,
  });
};
