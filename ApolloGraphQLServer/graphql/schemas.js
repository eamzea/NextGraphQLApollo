const { gql } = require('apollo-server');

const typeDef = gql`
  type User {
    id: ID
    name: String
    lastName: String
    email: String
    createdAt: String
  }

  input UserInput {
    name: String
    lastName: String
    email: String
    password: String
  }

  type Token {
    token: String
  }

  input AuthenticateInput {
    email: String!
    password: String!
  }

  type Product {
    id: ID
    name: String
    inventory: Int
    description: String
    price: Float
    createdAt: String
  }

  input ProductInput {
    name: String!
    description: String!
    inventory: Int!
    price: Float!
  }

  type Query {
    getUser(token: String!): User
    getProducts: [Product]
    getProduct(id: ID!): Product
  }

  type Mutation {
    #Users
    newUser(input: UserInput): User
    authenticate(input: AuthenticateInput): Token

    #Products
    newProduct(input: ProductInput): Product
  }
`;

module.exports = typeDef;
