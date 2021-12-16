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
      content {
        value
      }
    }
  }
`;

export const GET_ALL_SERVICE_ORDERS_STATUS = gql`
  query GetAllStatus {
    getAllStatus {
      id
      name
      types
    }
  }
`;

export const INSERT_SERVICE_ORDER = gql`
  mutation StoreServiceOrder($serviceOrderData: ServiceOrdersInput!) {
    storeServiceOrder(ServiceOrderData: $serviceOrderData) {
      id
      client_id
    }
  }
`;

export const UPDATE_SERVICE_ORDER = gql`
  mutation UpdateServiceOrder($serviceOrderData: ServiceOrdersInput!) {
    updateServiceOrder(ServiceOrderData: $serviceOrderData) {
      id
    }
  }
`;
