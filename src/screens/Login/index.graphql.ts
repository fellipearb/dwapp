import { gql } from '@apollo/client';

export const DO_LOGIN = gql`
  query Login($loginData: LoginInput!) {
    doLogin(LoginData: $loginData) {
      id
      name
      login
      accessToken
    }
  }
`;
