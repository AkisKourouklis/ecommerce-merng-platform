import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { connectDb } from './mongodb';
import { port } from './config/vars';
import typeDefs from './modules/Graphql/rootTypes';
import resolvers from './modules/Graphql/rootResolvers';

const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => ({ req }) });
const app = express();
const pathUrl = '/graphql/v1';
app.use(express.static('public'));
server.applyMiddleware({ app, path: pathUrl });
app.use(cors());

connectDb()
  .then(async () => {
    app.listen(port, () => console.log(`Server is running on port ${port}.\nDatabase is connected successfully.`));
  })
  .catch((err) => {
    console.log(err);
  });
