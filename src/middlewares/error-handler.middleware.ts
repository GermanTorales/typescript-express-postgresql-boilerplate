/* Dependencies imports */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

/* Internal modules imports */
import { envVars } from 'configurations';
import { InvalidData, NotFoundError, Unauthorized } from 'exceptions';

/* eslint-disable-next-line no-unused-vars */
export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof InvalidData || err instanceof NotFoundError) {
    return res.status(err.status).json({ status: err.status, message: err.message, date: err.date });
  } else if (err instanceof Unauthorized) {
    const redirectTo: string = `${envVars.host}/api/v1/auth/login`;

    return res.status(err.status).json({ status: err.status, message: err.message, date: err.date, redirectTo });
  }

  return res.status(httpStatus.NOT_FOUND).json({ status: httpStatus.NOT_FOUND, message: 'Unexpected error' });
};
