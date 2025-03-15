import { NextFunction, Request, Response } from "express";
import { ErrorCode, HttpException } from "./src/exceptions/root.exception";
import { InternalException } from "./src/exceptions/internal.exception";

//error handler to wrap the controller in order to avoid the repetitive try catch block.
export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      let exception: HttpException;
      if (error instanceof HttpException) {
        exception = error;
      } else {
        exception = new InternalException(
          "Something went wrong",
          error,
          ErrorCode.INTERNAL_EXCEPTION
        );
        next(exception);
      }
    }
  };
};
