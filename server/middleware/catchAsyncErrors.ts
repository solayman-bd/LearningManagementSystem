import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const catchAsyncError = (asyncFunc: AsyncFunction) => (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  Promise.resolve(asyncFunc(req, res, next)).catch(next);
};
