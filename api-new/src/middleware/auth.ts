import { jwtExpirationInterval, jwtUserSecret } from '../config/vars';
import jwt from 'jsonwebtoken';

interface IUser {
  email: string;
  id: number;
  fullname: string;
  role: string;
}

export const createUserSign = (user: IUser): string => {
  const jwtOptions = {
    expiresIn: jwtExpirationInterval
  };
  return jwt.sign(user, jwtUserSecret, jwtOptions);
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, jwtUserSecret);
};
