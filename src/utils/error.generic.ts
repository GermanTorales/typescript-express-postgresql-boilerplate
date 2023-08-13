import httpStatus from 'http-status';

export class BaseHttpError extends Error {
  status: number;
  date: string;

  constructor(message: string, status: number) {
    super(message);
    this.status = status || httpStatus.NOT_FOUND;
    this.date = new Date().toISOString();

    /* This line is very importan to functionality */
    Object.setPrototypeOf(this, BaseHttpError.prototype);
  }
}
