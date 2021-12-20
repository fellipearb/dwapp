import React, { useCallback, useState } from 'react';
import { ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import { Button, List, TextInput } from 'react-native-paper';
import {
  ContainerView,
  SafeContainer,
} from '../../components/Container/styles';
import Loading from '../../components/Loading';
import { GET_ALL_CLIENTS } from './index.graphql';
import { ButtonClient, TextItem } from './styles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export interface IClient {
  notes: string;
  complement: string;
  state: string;
  city: string;
  district: string;
  number: string;
  street: string;
  cep: string;
  cpf: string;
  tel: string;
  email: string;
  name: string;
  id: number;
  content: {
    tel: string;
    cep: string;
    cpf: string;
  };
}

const Clients = () => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation<any>();

  const goToClientDetails = (client?: IClient) => {
    navigation.navigate('ClientsDetailsScreen', { client });
  };

  const { data, loading, refetch } = useQuery(GET_ALL_CLIENTS, {
    fetchPolicy: 'network-only',
  });

  const filterClients = useCallback(
    (term: string) => {
      if (term) {
        const regex = new RegExp(term, 'gi');
        return data?.getAllClients.filter(
          (client: IClient) => client.name.search(regex) > -1,
        );
      }

      return data?.getAllClients || [];
    },
    [data?.getAllClients],
  );

  const clients = filterClients(search);

  useFocusEffect(() => {
    refetch();
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeContainer>
      <ContainerView>
        {
          //@ts-ignore
          <ButtonClient
            icon="account-plus"
            mode="contained"
            onPress={() => goToClientDetails()}
            compact
          />
        }
        <ScrollView>
          <TextInput
            label="Buscar"
            value={search}
            onChangeText={text => setSearch(text)}
          />
          <List.Section title="Clientes">
            {clients.map((client: IClient, index: number) => (
              <List.Accordion
                title={client.name}
                left={props => <List.Icon {...props} icon="account" />}
                key={index}>
                <List.Item
                  title={() => <TextItem>{client.content?.tel}</TextItem>}
                  description="Telefone"
                />
                <List.Item
                  title={() => <TextItem>{client.email}</TextItem>}
                  description="Email"
                />
                <List.Item
                  title={() => <TextItem>{client.content.cpf}</TextItem>}
                  description="CPF"
                />
                <List.Item
                  title={() => <TextItem>{client.content.cep}</TextItem>}
                  description="CEP"
                />
                <List.Item
                  title={() => (
                    <Button
                      icon="account-edit"
                      mode="contained"
                      onPress={() => goToClientDetails(client)}>
                      Editar
                    </Button>
                  )}
                />
              </List.Accordion>
            ))}
          </List.Section>
        </ScrollView>
      </ContainerView>
    </SafeContainer>
  );
};

export default Clients;
