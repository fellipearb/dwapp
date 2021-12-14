import { gql } from '@apollo/client';

export const GET_ALL_CLIENTS = gql`
  query GetAllClients {
    getAllClients {
      notes
      complement
      state
      city
      district
      number
      street
      cep
      cpf
      tel
      email
      name
      id
      content {
        tel
      }
    }
  }
`;

export const UPDATE_CLIENT = gql`
  query GetAllClients {
    getAllClients {
      notes
      complement
      state
      city
      district
      number
      street
      cep
      cpf
      tel
      email
      name
      id
      content {
        tel
      }
    }
  }
`;
