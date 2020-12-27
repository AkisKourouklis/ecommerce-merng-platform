import 'reflect-metadata';
import 'dotenv/config';
import { ApolloError, ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { Error } from './entity/Error';
import { GraphQLError } from 'graphql';
import { LoginResolver } from './modules/user/login.resolver';
import { port } from './config/vars';
import { RegisterResolver } from './modules/user/register.resolver';
import { v4 as uuid } from 'uuid';
import Express from 'express';
import { VerifyResolver } from './modules/user/verify.resolver';
import { verifyToken } from './middleware/auth';
import { ResetPasswordResolver } from './modules/user/reset-password';
import { ForgotPasswordResolver } from './modules/user/forgot-password';

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver, VerifyResolver, ResetPasswordResolver, ForgotPasswordResolver],
    authChecker: ({ context: { req } }) => {
      return !!verifyToken(req.headers.authorization);
    }
  });

  const apolloServer = new ApolloServer({
    schema,
    formatError: (error: GraphQLError): any => {
      if (error.originalError instanceof ApolloError) {
        return error;
      }

      const errId = uuid();
      console.log('uuid: ', errId);
      console.log(error);

      Error.create({ uuid: errId, error: error.message }).save();

      return {
        uuid: `uuid: ${errId}`,
        errors: { msg: error.message, extensions: error.extensions?.exception?.validationErrors }
      };
    },
    context: ({ req, res }: any) => ({ req, res })
  });

  const app = Express();

  apolloServer.applyMiddleware({ app, path: '/graphql/v1' });

  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}/graphql/v1 `);
  });
};

main();
