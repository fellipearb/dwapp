import { useQuery } from '@apollo/client';
import React from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { SafeContainer } from '../../components/Container/styles';
import Loading from '../../components/Loading';
import { GET_ALL_CLIENTS } from './index.graphql';
import { TextItem } from './styles';

const Clients = () => {
  const { data, loading } = useQuery(GET_ALL_CLIENTS, {
    fetchPolicy: 'network-only',
  });

  const clients = data?.getAllClients || [];

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeContainer>
      <ScrollView>
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
            </List.Accordion>
          ))}
        </List.Section>
      </ScrollView>
    </SafeContainer>
  );
};

export default Clients;
