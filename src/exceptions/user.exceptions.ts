import httpStatus from 'http-status';
import { BaseHttpError } from 'utils';

export class NotFoundError extends BaseHttpError {
  constructor(message: string) {
    super(message, httpStatus.NOT_FOUND);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class EmailAlreadyExistError extends BaseHttpError {
  constructor(message: string) {
    super(message, httpStatus.BAD_REQUEST);

    Object.setPrototypeOf(this, EmailAlreadyExistError.prototype);
  }
}
