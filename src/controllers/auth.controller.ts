import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../secrets";
import { BadRequestException } from "../exceptions/bad_request.exception";
import { ErrorCode } from "../exceptions/root.exception";
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("Email and password are required");
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });
    if (!user)
      return next(
        new BadRequestException("User not found !", ErrorCode.USER_NOT_FOUND)
      );
    if (!compareSync(password, user.password))
      return next(
        new BadRequestException(
          "Incorrect Password!",
          ErrorCode.INCORRECT_PASSWORD
        )
      );
    const accessToken = jwt.sign(
      {
        userId: user.id,
      },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );
    const refreshToken = jwt.sign(
      {
        userId: user.id,
      },
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.status(200).json({
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    let user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });
    if (user)
      throw new BadRequestException(
        "User already exist !",
        ErrorCode.USER_ALREADY_EXIST
      );
    user = await prismaClient.user.create({
      data: {
        email,
        password: hashSync(password, 10),
        name,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
  }
};
