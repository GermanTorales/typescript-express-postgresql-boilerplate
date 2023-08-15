import { UserController } from 'controllers';
import { auth } from 'middlewares';
import { GenericRouter } from 'utils';

export class UserRoutes extends GenericRouter {
  private userController: UserController;

  constructor() {
    super();

    this.log(UserRoutes.name);

    this.userController = new UserController();
  }

  setRoutes() {
    this.express.get('/', auth, this.userController.handleGetAll);
    this.express.get('/:id', auth, this.userController.handleGetById);

    return this.express;
  }
}
