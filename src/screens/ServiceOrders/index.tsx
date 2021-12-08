import { useQuery } from '@apollo/client';
import React from 'react';
import { FlatList } from 'react-native';
import Container from '../../components/Container';
import { SafeContainer } from '../../components/Container/styles';
import Loading from '../../components/Loading';
import ServiceOrdersCard from './components/ServiceOrdersCard';
import { GET_ALL_SERVICE_ORDERS } from './index.graphql';
import { ContainerCard } from './styles';

export const ServiceOrders = () => {
  const { data, loading } = useQuery(GET_ALL_SERVICE_ORDERS, {
    fetchPolicy: 'network-only',
  });

  const orders = data?.getAllServiceOrders || [];

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeContainer>
      <Container>
        <FlatList
          data={orders}
          renderItem={({ item }) => (
            <ContainerCard>
              <ServiceOrdersCard {...item} />
            </ContainerCard>
          )}
          keyExtractor={item => item.id}
        />
      </Container>
    </SafeContainer>
  );
};

export default ServiceOrders;
