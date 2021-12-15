import { gql } from '@apollo/client';

export const GET_ALL_SERVICE_ORDERS = gql`
  query getAllServiceOrders {
    getAllServiceOrders {
      id
      client_id
      equipment
      brand
      identification
      reports
      description
      notes
      value
      status_id
      client {
        id
        name
        email
        tel
        cpf
        cep
        street
        number
        city
        district
        state
        complement
        notes
      }
      images {
        id
        path
      }
      status {
        id
        name
        types
      }
    }
  }
`;
