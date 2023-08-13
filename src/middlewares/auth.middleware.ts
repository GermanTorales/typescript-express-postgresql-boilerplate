/* Dependencies imports */
import { NextFunction, Request, Response } from 'express';

/* Internal modules imports */
import { jwtConfig } from 'configurations';
import { AuthPayloadDto } from 'dtos';
import { Unauthorized } from 'exceptions';

interface UserRequest extends Request {
  user: AuthPayloadDto;
}

export const auth = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token?.length) throw new Unauthorized('Token not found.');

    const paylod = jwtConfig.decoded(token);

    (req as UserRequest).user = paylod;

    return next();
  } catch (error) {
    const parsedError = JSON.parse(JSON.stringify(error));

    if (parsedError?.name === 'JsonWebTokenError') return next(new Unauthorized(parsedError.message));
    if (parsedError?.name === 'TokenExpiredError') return next(new Unauthorized(parsedError.message));

    return next(error);
  }
};
