import { createConnection } from 'typeorm';

export const testConnection = () => {
  return createConnection({
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'sovrakofanela-test',
    synchronize: true,
    logging: false,
    dropSchema: false, //if you want the database not to get deleted every time, make this false
    entities: [__dirname + '/../entity/*.*']
  });
};
