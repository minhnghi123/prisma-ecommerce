import { ErrorCode, HttpException } from "./root.exception";

//define bad_request
export class BadRequestException extends HttpException {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, errorCode, 400, null);
  }
}
