import { Connection } from 'typeorm';
import { graphqlCall } from '../graphqlCall';
import { testConnection } from '../testConnection';
import faker from 'faker';

let connection: Connection;
beforeAll(async () => {
  connection = await testConnection();
});
afterAll(async () => {
  await connection.close();
});

const registerMutation = `
  mutation($data: RegisterInput!) {
    register(data: $data) {
      id
      fullname
      email
      role
    }
  }

`;
const loginMutation = `
mutation($data: LoginInput!) {
    login(data: $data) {
      token
    }
  }
`;

describe('Login', () => {
  it('login user', async () => {
    const user = {
      fullname: faker.internet.userName(),
      email: faker.internet.email(),
      role: 'administrator',
      password: faker.internet.password()
    };
    await graphqlCall({
      source: registerMutation,
      variableValues: {
        data: user
      }
    });

    const loginUser = {
      email: user?.email,
      password: user?.password
    };

    const response = await graphqlCall({
      source: loginMutation,
      variableValues: {
        data: loginUser
      }
    });

    expect(response).toMatchObject({
      data: {
        login: {
          token: response.data?.login.token
        }
      }
    });
  });
  it('login user wrong password', async () => {
    const user = {
      fullname: faker.internet.userName(),
      email: faker.internet.email(),
      role: 'administrator',
      password: faker.internet.password()
    };
    await graphqlCall({
      source: registerMutation,
      variableValues: {
        data: user
      }
    });

    const loginUser = {
      email: user?.email,
      password: 'test'
    };

    const response = await graphqlCall({
      source: loginMutation,
      variableValues: {
        data: loginUser
      }
    });

    if (response?.errors) {
      expect(response.errors[0]?.message).toBe("Passwords don't match");
    }
  });
  it('login user not exists', async () => {
    const user = {
      fullname: faker.internet.userName(),
      email: faker.internet.email(),
      role: 'administrator',
      password: faker.internet.password()
    };
    await graphqlCall({
      source: registerMutation,
      variableValues: {
        data: user
      }
    });

    const loginUser = {
      email: 'test@te123.he',
      password: user?.password
    };

    const response = await graphqlCall({
      source: loginMutation,
      variableValues: {
        data: loginUser
      }
    });

    if (response?.errors) {
      expect(response.errors[0]?.message).toBe('User does not exist');
    }
  });
});
