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
        cpf
        cep
      }
    }
  }
`;

export const INSERT_CLIENT = gql`
  mutation storeClient($clientData: ClientInput!) {
    storeClient(ClientData: $clientData) {
      id
      name
      complement
    }
  }
`;

export const UPDATE_CLIENT = gql`
  mutation UpdateClient($clientData: ClientInput!) {
    updateClient(ClientData: $clientData) {
      id
      name
    }
  }
`;
