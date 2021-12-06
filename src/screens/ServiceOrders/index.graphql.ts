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
    }
  }
`;
