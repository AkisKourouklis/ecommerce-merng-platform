import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import { GraphQLError } from 'graphql';
import { verifyToken } from '../../middleware/auth';
import { Token } from './login.resolver';

@InputType()
class TokenInput {
  @Field()
  token: string;
}

@Resolver()
export class VerifyResolver {
  @Query(() => String)
  async verifyInfo() {
    return 'Here you can verify a token, the fields you should pass are, -token';
  }
  @Mutation(() => Token)
  async verify(@Arg('data') { token }: TokenInput): Promise<Token | GraphQLError> {
    try {
      verifyToken(token);

      return { token };
    } catch (error) {
      return new GraphQLError(error);
    }
  }
}
