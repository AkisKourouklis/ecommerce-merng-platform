import jwt from 'jsonwebtoken';
import { jwtExpirationInterval, jwtUserSecret } from '../config/vars';
import { AuthenticationError } from 'apollo-server';

const jwtAuthentication = {};

jwtAuthentication.checkToken = (authToken) => {
  if (authToken) {
    const token = authToken.split('Bearer ')[1];
    if (token) {
      try {
        jwt.verify(token, jwtUserSecret);
        return { token };
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired Token');
      }
    }
    throw new Error("Auth token must be 'Bearer [token]");
  }
  throw new Error('Auth header must be provided');
};

jwtAuthentication.createUserSign = (user) =>
  new Promise((resolve, reject) => {
    const jwtOptions = {
      expiresIn: jwtExpirationInterval
    };
    jwt.sign(user, jwtUserSecret, jwtOptions, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });

jwtAuthentication.verifyTokenMiddleware = (context) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, jwtUserSecret);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired Token');
      }
    }
    throw new Error("Auth token must be 'Bearer [token]");
  }
  throw new Error('Auth header must be provided');
};

module.exports = jwtAuthentication;
