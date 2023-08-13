import { Entity, Column } from 'typeorm';
import { Exclude } from 'class-transformer';

import Model from './base-entity.entity';

@Entity('user')
export class User extends Model {
  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  @Exclude()
  password: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  username: string;
}
