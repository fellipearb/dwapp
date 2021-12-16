import { useQuery } from '@apollo/client';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList } from 'react-native';
import Container from '../../components/Container';
import { SafeContainer } from '../../components/Container/styles';
import Loading from '../../components/Loading';
import { IClient } from '../Clients';
import ServiceOrdersCard from './components/ServiceOrdersCard';
import { GET_ALL_SERVICE_ORDERS } from './index.graphql';
import { ButtonServiceOrder, ContainerCard } from './styles';

export interface IServiceOrders {
  id: number;
  client_id: number;
  equipment: string;
  brand: string;
  identification: string;
  reports: string;
  description: string;
  notes: string;
  value: number;
  status_id: string;
  closedAt: string;
  client: IClient;
  images?: {
    id: number;
    path: string;
  }[];
  status?: {
    id: number;
    name: string;
    types: string;
  };
  content: {
    value: string;
  };
}

export const ServiceOrders = () => {
  const navigation = useNavigation<any>();

  const goToDetails = (order?: IServiceOrders) =>
    navigation.navigate('ServiceOrdersDetailsScreen', {
      order,
    });

  const { data, loading, refetch } = useQuery(GET_ALL_SERVICE_ORDERS, {
    fetchPolicy: 'network-only',
  });

  const orders = data?.getAllServiceOrders || [];

  useFocusEffect(() => {
    refetch();
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeContainer>
      <Container>
        <FlatList
          data={orders}
          ListHeaderComponent={
            <ButtonServiceOrder
              icon="account-plus"
              mode="contained"
              onPress={() => goToDetails()}>
              Adicionar Ordem de Serviço
            </ButtonServiceOrder>
          }
          renderItem={({ item }) => (
            <ContainerCard>
              <ServiceOrdersCard
                order={item}
                goToDetails={() => goToDetails(item)}
              />
            </ContainerCard>
          )}
          keyExtractor={item => item.id}
        />
      </Container>
    </SafeContainer>
  );
};

export default ServiceOrders;
