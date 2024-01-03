import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../utils/ErrorHandler';

// Express middleware for handling errors
export const errorMiddleware= (
  err: any,            // The error object
  req: Request,       // The Express request object
  res: Response,      // The Express response object
  next: NextFunction  // The next middleware function in the stack
) => {
  // Set a default status code of 500 (Internal Server Error)
  // and a default error message if not provided
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // Handle specific error types and customize the error response
  if (err.name === 'CastError') {
    // CastError occurs when casting fails, typically due to invalid data types
    const message = `Resource not found. Invalid: ${err.path}`;
    // Create a new instance of the ErrorHandler with a 400 status code
    err = new ErrorHandler(message, 400);
  }

  if (err.code === 11000) {
    // MongoDB duplicate key error (code 11000)
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    // Create a new instance of the ErrorHandler with a 400 status code
    err = new ErrorHandler(message, 400);
  }

  if (err.name === 'JsonWebTokenError') {
    // JsonWebTokenError occurs when there's an issue with JWT verification
    const message = 'Json web token is expired, try again';
    // Create a new instance of the ErrorHandler with a 400 status code
    err = new ErrorHandler(message, 400);
  }

  // Respond with a JSON object containing error details
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
