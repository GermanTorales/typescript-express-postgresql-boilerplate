import swaggerRoutes from './swagger.routes';
import { GenericRouter } from 'utils';
import AuthRoutes from './auth.routes';
import { UserRoutes } from './user.routes';

export default class RoutesV1 extends GenericRouter {
  constructor() {
    super();
  }

  setRoutes() {
    const authRoutes = new AuthRoutes();
    const userRoutes = new UserRoutes();

    this.express.use('/api-docs', new swaggerRoutes().express);
    this.express.use('/auth', authRoutes.setRoutes());
    this.express.use('/users', userRoutes.setRoutes());

    return this.express;
  }
}
