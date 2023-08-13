import { User } from 'entities';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { UserService } from 'services';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();

    this.handleGetAll = this.handleGetAll.bind(this);
  }

  async handleGetAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const users: User[] = await this.userService.getUsers();

      return res.status(httpStatus.OK).json({ data: users });
    } catch (error) {
      return next(error);
    }
  }
}
