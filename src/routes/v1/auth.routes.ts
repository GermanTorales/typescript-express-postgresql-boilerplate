import { AuthController } from 'controllers';
import { GenericRouter } from 'utils';

export default class AuthRoutes extends GenericRouter {
  private authController: AuthController;

  constructor() {
    super();

    this.log(AuthRoutes.name);

    this.authController = new AuthController();
  }

  setRoutes() {
    this.express.post('/local/register', this.authController.handleRegister);
    this.express.post('/local/login', this.authController.handleLogin);

    return this.express;
  }
}
