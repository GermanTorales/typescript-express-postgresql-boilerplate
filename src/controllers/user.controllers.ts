/* Dependencies imports */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

/* Internal modules imports */
import { User } from 'entities';
import { UserService } from 'services';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();

    this.handleGetAll = this.handleGetAll.bind(this);
    this.handleGetById = this.handleGetById.bind(this);
  }

  async handleGetAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const users: User[] = await this.userService.getUsers();

      return res.status(httpStatus.OK).json({ data: users });
    } catch (error) {
      return next(error);
    }
  }

  async handleGetById(req: Request, res: Response, next: NextFunction) {
    try {
      const id: string = req.params.id;
      const user: User = await this.userService.getUserById(id);

      return res.status(httpStatus.OK).json({ data: user });
    } catch (error) {
      return next(error);
    }
  }
}
