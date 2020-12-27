import { graphql } from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { verifyToken } from '../middleware/auth';
import { buildSchema } from 'type-graphql';

interface Options {
  source: string;
  variableValues?: Maybe<{ [key: string]: any }>;
  authorization?: string;
}

export const graphqlCall = async ({ source, variableValues, authorization }: Options) => {
  return graphql({
    schema: await buildSchema({
      resolvers: [__dirname + '/../modules/*/*.resolver.ts'],
      authChecker: ({ context: { req } }) => {
        return !!verifyToken(req.headers.authorization);
      }
    }),
    source,
    variableValues,
    contextValue: {
      req: {
        headers: {
          authorization
        }
      }
    }
  });
};
