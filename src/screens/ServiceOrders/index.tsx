import { useQuery } from '@apollo/client';
import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { ContainerView } from '../../components/Container/styles';
import Loading from '../../components/Loading';
import ServiceOrdersCard from './components/ServiceOrdersCard';
import { GET_ALL_SERVICE_ORDERS } from './index.graphql';
import { ContainerCard } from './styles';

export const ServiceOrders = () => {
  const { data, loading } = useQuery(GET_ALL_SERVICE_ORDERS, {
    fetchPolicy: 'network-only',
    onCompleted: data => {
      console.log('data', data);
    },
    onError: err => {
      console.log('err', err);
    },
  });

  const orders = data?.getAllServiceOrders || [];

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <ContainerView>
          {orders.map((order: any) => (
            <ContainerCard>
              <ServiceOrdersCard {...order} />
            </ContainerCard>
          ))}
        </ContainerView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServiceOrders;
