import gql from 'graphql-tag';

export const GET_EXECUTIVE_CLIENTS = gql`
  query getExecutiveClients {
    getExecutiveClients {
      name
    }
  }
`;
