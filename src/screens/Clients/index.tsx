import React, { useCallback, useState } from 'react';
import { ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import { Button, List, TextInput } from 'react-native-paper';
import { SafeContainer } from '../../components/Container/styles';
import Loading from '../../components/Loading';
import { GET_ALL_CLIENTS } from './index.graphql';
import { TextItem } from './styles';

const Clients = () => {
  const { data, loading } = useQuery(GET_ALL_CLIENTS, {
    fetchPolicy: 'network-only',
  });

  const [search, setSearch] = useState('');

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
            {clients.map((item: any) => (
              <List.Accordion
                title={item.name}
                left={props => <List.Icon {...props} icon="account" />}>
                <List.Item
                  title={() => <TextItem>{item.content?.tel}</TextItem>}
                  description="Telefone"
                />
                <List.Item
                  title={() => <TextItem>{item.email}</TextItem>}
                  description="Email"
                />
                <List.Item
                  title={() => <TextItem>{item.cpf}</TextItem>}
                  description="CPF"
                />
                <List.Item
                  title={() => <TextItem>{item.cep}</TextItem>}
                  description="CEP"
                />
                <List.Item
                  title={() => (
                    <Button
                      icon="account-edit"
                      mode="contained"
                      onPress={() => console.log('Pressed')}>
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
