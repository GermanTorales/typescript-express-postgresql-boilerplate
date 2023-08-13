import jwt from 'jsonwebtoken';
import envVars from './environment-variables.config';

const createAccessToken = (payload: any) => {
  return jwt.sign(payload, envVars.jwt.secret, {
    expiresIn: envVars.jwt.expireIn
  });
};

const decoded = (token: string): any => {
  return jwt.verify(token, envVars.jwt.secret);
};

export default { createAccessToken, decoded };
