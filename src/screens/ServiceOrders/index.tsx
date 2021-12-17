import { useQuery } from '@apollo/client';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import Container from '../../components/Container';
import { SafeContainer } from '../../components/Container/styles';
import Loading from '../../components/Loading';
import { IClient } from '../Clients';
import { IStatus } from '../ServiceOrdersStatus';
import ServiceOrdersCard from './components/ServiceOrdersCard';
import {
  GET_ALL_SERVICE_ORDERS,
  GET_ALL_SERVICE_ORDERS_STATUS,
} from './index.graphql';
import {
  ButtonFilter,
  ButtonServiceOrder,
  ContainerButtons,
  ContainerCard,
} from './styles';

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
  status_id: number;
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
  const [searchBy, setSearchBy] = useState('');
  const [filterStatus, setFilterStatus] = useState(0);

  const goToDetails = (order?: IServiceOrders) =>
    navigation.navigate('ServiceOrdersDetailsScreen', {
      order,
    });

  const showTextSearch = useMemo(() => {
    return searchBy === 'os' || searchBy === 'client';
  }, [searchBy]);

  const { data, loading, refetch } = useQuery(GET_ALL_SERVICE_ORDERS, {
    fetchPolicy: 'network-only',
  });

  const { data: allStatus } = useQuery(GET_ALL_SERVICE_ORDERS_STATUS, {
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

    if (filterStatus && searchBy === 'status') {
      return data?.getAllServiceOrders.filter(
        (order: IServiceOrders) => order?.status_id === filterStatus,
      );
    }

    return data?.getAllServiceOrders || [];
  }, [data?.getAllServiceOrders, filterStatus, search, searchBy]);

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
              <ContainerButtons horizontal>
                <ButtonFilter
                  icon="file"
                  mode={searchBy === 'os' ? 'contained' : 'outlined'}
                  onPress={() => setSearchBy('os')}>
                  Ordem de Serviço
                </ButtonFilter>
                <ButtonFilter
                  icon="account"
                  mode={searchBy === 'client' ? 'contained' : 'outlined'}
                  onPress={() => setSearchBy('client')}>
                  Clientes
                </ButtonFilter>
                <ButtonFilter
                  icon="account"
                  mode={searchBy === 'status' ? 'contained' : 'outlined'}
                  onPress={() => setSearchBy('status')}>
                  Status
                </ButtonFilter>
              </ContainerButtons>
              {!!showTextSearch && (
                <TextInput
                  label="Buscar"
                  value={search}
                  onChangeText={text => setSearch(text)}
                />
              )}
              {searchBy === 'status' && <Text>Status:</Text>}
              <ContainerButtons horizontal>
                {searchBy === 'status' &&
                  allStatus?.getAllStatus?.map((status: IStatus) => (
                    <ButtonFilter
                      icon="account"
                      mode={
                        filterStatus === status.id ? 'contained' : 'outlined'
                      }
                      onPress={() => setFilterStatus(status.id)}
                      key={status.id}>
                      {status.name}
                    </ButtonFilter>
                  ))}
              </ContainerButtons>
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
