require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { catchAsyncError } from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { redis } from "../utils/redis";

export const isAuthenticated = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken as string;
    if (!accessToken) {
      return next(new ErrorHandler("Please login..", 400));
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN as string);
    if (!decoded) {
      return next(new ErrorHandler("Access token invalid..", 400));
    }

    const user = await redis.get((decoded as JwtPayload).id);
    if (!user) {
      return next(new ErrorHandler("User not found..", 400));
    }
    req.user = JSON.parse(user);
    next();
  }
);
