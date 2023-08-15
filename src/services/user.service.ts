/* Dependencies imports */

/* Internal modules imports */
import { RegisterUserDto } from 'dtos';
import { UserRepository } from 'repositories';
import { bcryptConfig } from 'configurations';
import { User } from 'entities';
import { EmailAlreadyExistError, NotFoundError } from 'exceptions';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(userData: RegisterUserDto): Promise<User> {
    const existEmail = await this.userRepository.findOne({ email: userData.email });

    if (existEmail) throw new EmailAlreadyExistError('Email already register.');

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
    return await this.userRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    const user: User | null = await this.userRepository.findOne({ id });

    if (!user) throw new NotFoundError('User not found.');

    return user;
  }
}
