//define httpException for error handling .
export class HttpException extends Error {
  message: string;
  errorCode: ErrorCode;
  statusCode: number;
  errors: any;
  constructor(
    message: string,
    errorCode: ErrorCode,
    statusCode: number,
    errors: any
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
//define enum of error codes
export enum ErrorCode {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXIST = 1002,
  INCORRECT_PASSWORD = 1003,
  UNPROCESSED_ENTITY = 2001,
  INTERNAL_EXCEPTION = 3001,
  UNAUTHENTICATED = 4001,
}
