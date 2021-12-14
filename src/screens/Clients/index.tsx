import React, { useCallback, useState } from 'react';
import { ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import { Button, List, TextInput } from 'react-native-paper';
import { SafeContainer } from '../../components/Container/styles';
import Loading from '../../components/Loading';
import { GET_ALL_CLIENTS } from './index.graphql';
import { TextItem } from './styles';
import { useNavigation } from '@react-navigation/native';

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
  };
}

const Clients = () => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation<any>();

  const goToClientDetails = (client: IClient) => {
    navigation.navigate('ClientsDetailsScreen', { client });
  };

  const { data, loading } = useQuery(GET_ALL_CLIENTS, {
    fetchPolicy: 'network-only',
  });
  const filterClients = useCallback(
    (term: string) => {
      if (term) {
        const regex = new RegExp(term, 'gi');
        return data?.getAllClients.filter(
          (client: any) => client.name.search(regex) > -1,
        );
      }

      return data?.getAllClients || [];
    },
    [data?.getAllClients],
  );

  const clients = filterClients(search);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeContainer>
      <ScrollView>
        <>
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
                  title={() => <TextItem>{client.cpf}</TextItem>}
                  description="CPF"
                />
                <List.Item
                  title={() => <TextItem>{client.cep}</TextItem>}
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
        </>
      </ScrollView>
    </SafeContainer>
  );
};

export default Clients;
