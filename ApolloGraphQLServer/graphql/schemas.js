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

  type Client {
    id: ID
    name: String
    lastName: String
    email: String
    company: String
    phone: String
    ref: ID
  }

  input ClientInput {
    name: String!
    lastName: String!
    email: String!
    company: String!
    phone: String
  }

  type Query {
    getUser(token: String!): User
    getProducts: [Product]
    getProduct(id: ID!): Product
    getClients: [Client]
    getClient(id: ID!): Client
    getExecutiveClients: [Client]
  }

  type Mutation {
    #Users
    newUser(input: UserInput): User
    authenticate(input: AuthenticateInput): Token

    #Products
    newProduct(input: ProductInput): Product
    updateProduct(id: ID!, input: ProductInput): Product
    deleteProduct(id: ID!): Product

    #Clients
    newClient(input: ClientInput!): Client
  }
`;

module.exports = typeDef;
