import { Connection } from 'typeorm';
import { graphqlCall } from '../graphqlCall';
import { testConnection } from '../testConnection';
import faker from 'faker';
import { User } from '../../entity/User';

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

describe('Register', () => {
  it('create user', async () => {
    const user = {
      fullname: faker.internet.userName(),
      email: faker.internet.email(),
      role: 'administrator',
      password: faker.internet.password()
    };
    const response = await graphqlCall({
      source: registerMutation,
      variableValues: {
        data: user
      }
    });

    expect(response).toMatchObject({
      data: {
        register: {
          fullname: user.fullname,
          email: user.email,
          role: user.role
        }
      }
    });

    const dbUser = await User.findOne({ where: { email: user.email } });
    expect(dbUser).toBeDefined();
    expect(dbUser?.email).toBe(user.email);
    expect(dbUser?.fullname).toBe(user.fullname);
    expect(dbUser?.role).toBe(user.role);
  });
  it('user already exists', async () => {
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
    const response = await graphqlCall({
      source: registerMutation,
      variableValues: {
        data: user
      }
    });

    if (response?.errors) {
      expect(response.errors[0]?.message).toBe('User already exists.');
    }
  });
});
