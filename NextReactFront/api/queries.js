import gql from 'graphql-tag';

export const GET_USER = gql`
  query getUser {
    getUser {
      id
      name
    }
  }
`;

export const GET_EXECUTIVE_CLIENTS = gql`
  query getExecutiveClients {
    getExecutiveClients {
      id
      name
      lastName
      email
      company
      phone
    }
  }
`;

export const GET_CLIENT = gql`
  query getClient($id: ID!) {
    getClient(id: $id) {
      id
      name
      lastName
      company
      email
      phone
    }
  }
`;
