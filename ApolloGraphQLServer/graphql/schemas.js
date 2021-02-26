const { gql } = require('apollo-server');

const typeDef = gql`
  type Query {
    getCourse: String
  }
`;

module.exports = typeDef;
