/* Dependencies imports */
import { plainToInstance } from 'class-transformer';

/* Internal modules imports */
import { RegisterUserDto } from 'dtos';
import { UserRepository } from 'repositories';
import { bcryptConfig } from 'configurations';
import { User } from 'entities';
import { NotFoundError } from 'exceptions';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(userData: RegisterUserDto): Promise<User> {
    const [emailUser] = userData.email.split('@');
    const username = `${emailUser}_${new Date().getTime()}`;

    userData.username = username;
    userData.password = await bcryptConfig.hash(userData.password);

    return await this.userRepository.createUser(userData);
  }

  async findByEmail(email: string): Promise<User> {
    const user: User | null = await this.userRepository.findOne({ email });

    if (!user) throw new NotFoundError('User not found.');

    return user;
  }

  async getUsers(): Promise<User[]> {
    return plainToInstance(User, await this.userRepository.find());
  }
}
