import gql from 'graphql-tag';

export const NEW_USER = gql`
  mutation newUser($input: UserInput) {
    newUser(input: $input) {
      name
      lastName
      id
    }
  }
`;

export const AUTHENTICATE = gql`
  mutation authenticate($input: AuthenticateInput) {
    authenticate(input: $input) {
      token
    }
  }
`;
