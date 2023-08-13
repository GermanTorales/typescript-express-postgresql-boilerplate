import { User } from 'entities';

export interface RegisterUserDto extends User {
  email: string;
  password: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface AuthPayloadDto {
  email: string;
  username: string;
  id: string;
}
