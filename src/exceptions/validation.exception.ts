import { ErrorCode, HttpException } from "./root.exception";

export class UnprocessableEntityException extends HttpException {
  constructor(error: any, message: string, errorCode: ErrorCode) {
    super(message, errorCode, 422, error);
  }
}
