import { useQuery } from '@apollo/client';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Container from '../../components/Container';
import { SafeContainer } from '../../components/Container/styles';
import Loading from '../../components/Loading';
import { IClient } from '../Clients';
import ServiceOrdersCard from './components/ServiceOrdersCard';
import { GET_ALL_SERVICE_ORDERS } from './index.graphql';
import { ButtonServiceOrder, ContainerButtons, ContainerCard } from './styles';

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

  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('os');

  const goToDetails = (order?: IServiceOrders) =>
    navigation.navigate('ServiceOrdersDetailsScreen', {
      order,
    });

  const { data, loading, refetch } = useQuery(GET_ALL_SERVICE_ORDERS, {
    fetchPolicy: 'network-only',
  });

  const filterOrders = useCallback(() => {
    const regex = new RegExp(search, 'gi');

    if (search && searchBy === 'os') {
      return data?.getAllServiceOrders.filter(
        (order: IServiceOrders) =>
          order?.id?.toString().search(regex) > -1 ||
          order?.equipment?.toString().search(regex) > -1 ||
          order?.identification?.toString().search(regex) > -1,
      );
    }

    if (search && searchBy === 'client') {
      return data?.getAllServiceOrders.filter(
        (order: IServiceOrders) =>
          order?.client?.name?.search(regex) > -1 ||
          order?.client?.tel?.search(regex) > -1,
      );
    }

    return data?.getAllServiceOrders || [];
  }, [data?.getAllServiceOrders, search, searchBy]);

  const orders = filterOrders();

  useFocusEffect(() => {
    refetch();
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeContainer>
      <Container>
        {
          //@ts-ignore
          <ButtonServiceOrder
            icon="file-plus"
            mode="contained"
            onPress={() => goToDetails()}
            compact
          />
        }
        <FlatList
          data={orders}
          ListHeaderComponent={
            <>
              <Text>Filtre por:</Text>
              <ContainerButtons>
                <Button
                  icon="file"
                  mode={searchBy === 'os' ? 'contained' : 'outlined'}
                  onPress={() => setSearchBy('os')}>
                  Ordem de Serviço
                </Button>
                <Button
                  icon="account"
                  mode={searchBy === 'client' ? 'contained' : 'outlined'}
                  onPress={() => setSearchBy('client')}>
                  Client
                </Button>
              </ContainerButtons>
              <TextInput
                label="Buscar"
                value={search}
                onChangeText={text => setSearch(text)}
              />
            </>
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
