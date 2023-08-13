import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { UserService, AuthService } from 'services';
import { LoginUserDto, RegisterUserDto } from 'dtos';

export class AuthController {
  private userService: UserService;
  private authService: AuthService;

  constructor() {
    this.userService = new UserService();
    this.authService = new AuthService();

    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  async handleLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const body: LoginUserDto = req.body;
      const accessData = await this.authService.login(body);

      return res.status(httpStatus.OK).json({ data: accessData });
    } catch (error) {
      return next(error);
    }
  }

  async handleRegister(req: Request, res: Response, next: NextFunction) {
    try {
      const body: RegisterUserDto = req.body;
      const newUser = await this.userService.create(body);

      return res.status(httpStatus.CREATED).json({ data: newUser });
    } catch (error) {
      return next(error);
    }
  }
}
