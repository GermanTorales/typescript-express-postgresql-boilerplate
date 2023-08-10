import {} from '../services';

export class AuthController {
  constructor() {
    this.userService = new UserService();
  }

  async handleLogin(req: Request, res: Response) {}

  async handleRegister(req: Request, res: Response) {}
}
