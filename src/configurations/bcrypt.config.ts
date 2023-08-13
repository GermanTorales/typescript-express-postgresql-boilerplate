import bcrypt from 'bcrypt';
import { envVars } from 'configurations';

const hash = async (password: string): Promise<string> => {
  return bcrypt.hash(password, envVars.hashRounds);
};

const compare = async (password: string, hashPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashPassword);
};

export default { hash, compare };
