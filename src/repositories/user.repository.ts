import { User } from 'entities';
import { IFindOneQuery } from 'interfaces';

export class UserRepository {
  private userEntity: typeof User;

  constructor() {
    this.userEntity = User;
  }

  async createUser(user: User): Promise<User> {
    return await this.userEntity.save(this.userEntity.create(user));
  }

  async findOne(fields: IFindOneQuery): Promise<User | null> {
    const query = this.buildQuery(fields);

    return await this.userEntity.findOne(query);
  }

  async find(): Promise<User[]> {
    return await this.userEntity.find();
  }

  private buildQuery(fields: IFindOneQuery) {
    const query = { where: {} };

    if (fields?.email) {
      query.where = { ...query.where, email: fields.email };
    }

    return query;
  }
}
