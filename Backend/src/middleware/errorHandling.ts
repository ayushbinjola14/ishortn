import { Request, Response, NextFunction } from 'express';

class CustomError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
  ) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(err.statusCode).json({ error: err.message });
};

export { CustomError, errorHandler };
