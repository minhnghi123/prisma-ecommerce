import { Request, Response, NextFunction } from "express";
import { UnAuthenticateException } from "../exceptions/unauthenticate.exception";
import { ErrorCode } from "../exceptions/root.exception";
import { ACCESS_TOKEN_SECRET } from "../secrets";
import jwt from "jsonwebtoken";
import { prismaClient } from "..";
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: any = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
      return next(
        new UnAuthenticateException(
          "Unauthenticated",
          ErrorCode.UNAUTHENTICATED
        )
      );
    }
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET) as jwt.JwtPayload;
    const user = await prismaClient.user.findFirst({
      where: {
        id: payload.userId,
      },
    });
    if (!user) {
      return next(
        new UnAuthenticateException(
          "Unauthenticated",
          ErrorCode.UNAUTHENTICATED
        )
      );
    }
    req.user = user;
    next();
  } catch (error) {
    return next(
      new UnAuthenticateException("Unauthenticated", ErrorCode.UNAUTHENTICATED)
    );
  }
};
