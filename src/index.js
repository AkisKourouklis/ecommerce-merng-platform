import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import { connectDb } from './mongodb';
import { port } from './config/vars';
import rootTypes from './modules/Graphql/rootTypes';

const typeDefs = [rootTypes];
const resolvers = {};

const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => ({ req }) });
const app = express();
server.applyMiddleware({ app });
app.use(cors());

connectDb().then(async () => {
  app.listen(port, () => console.log(`Server is running on port ${port}.\nDatabase is connected successfully.`));
});
