import { LoginUserDto } from 'dtos';
import { UserService } from './user.service';
import { User } from 'entities';
import { bcryptConfig, jwtConfig } from 'configurations';
import { InvalidData } from 'exceptions';

export class AuthService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async login(loginData: LoginUserDto) {
    const user: User = await this.userService.findByEmail(loginData.email);
    const { username, email, id, password } = user;

    const correctPassword = await bcryptConfig.compare(loginData.password, password);

    if (!correctPassword) throw new InvalidData('Invalid Data');

    return {
      access_token: jwtConfig.createAccessToken({ username, email, id })
    };
  }
}
