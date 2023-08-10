import { GenericRouter } from 'utils';

export default class AuthRoutes extends GenericRouter {
  constructor() {
    super();

    this.log(AuthRoutes.name);
  }

  Routes() {
    this.express.post('login');
    this.express.post('register');
  }
}
