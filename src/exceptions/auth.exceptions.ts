import httpStatus from 'http-status';
import { BaseHttpError } from 'utils';

export class InvalidData extends BaseHttpError {
  constructor(message: string) {
    super(message, httpStatus.BAD_REQUEST);

    Object.setPrototypeOf(this, InvalidData.prototype);
  }
}

export class Unauthorized extends BaseHttpError {
  constructor(message: string) {
    super(message, httpStatus.UNAUTHORIZED);

    Object.setPrototypeOf(this, Unauthorized.prototype);
  }
}
