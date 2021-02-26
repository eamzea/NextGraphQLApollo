require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');
const DB = require('./config/db');

DB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    const myContext = 'Hello';

    return {
      myContext,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(process.env);
  console.log(`Server ready on PORT ${url}`);
});
