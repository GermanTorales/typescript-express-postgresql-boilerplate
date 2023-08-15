import { GenericRouter } from 'utils';
import { AuthRoutes } from './auth.routes';
import { UserRoutes } from './user.routes';
import { SwaggerRoutes } from './swagger.routes';

export default class RoutesV1 extends GenericRouter {
  constructor() {
    super();
  }

  setRoutes() {
    const authRoutes = new AuthRoutes();
    const userRoutes = new UserRoutes();
    const swaggerRoutes = new SwaggerRoutes();

    this.express.use('/api-docs', swaggerRoutes.setRoutes());
    this.express.use('/auth', authRoutes.setRoutes());
    this.express.use('/users', userRoutes.setRoutes());

    return this.express;
  }
}
