import morgan from 'morgan';
import { Request, Response } from 'express';

import logger from './logger.config';

morgan.token('message', (_req: Request, res: Response) => res.locals['errorMessage'] || '');

const successResponseFormat = `:status | :method | :url | :response-time ms`;
const errorResponseFormat = `:status | :method | :url | :response-time ms | :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode >= 400 || req.url.includes('swagger'),
  stream: { write: (message: string) => logger.info(message.trim()) }
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (_req: Request, res: Response) => res.statusCode < 400,
  stream: { write: (message: string) => logger.error(message.trim()) }
});

export default {
  successHandler,
  errorHandler
};
