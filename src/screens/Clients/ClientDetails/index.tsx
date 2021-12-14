import { useLazyQuery } from '@apollo/client';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { IClient } from '..';
import {
  ContainerInput,
  ContainerView,
  SafeContainer,
} from '../../../components/Container/styles';
import { UPDATE_CLIENT } from '../index.graphql';

interface IClientDetails {
  route: {
    params: {
      client?: IClient;
    };
  };
}

const ClientDetails = ({ route }: IClientDetails) => {
  const { client } = route.params;

  const [name, setName] = useState<string>(client?.name || '');
  const [email, setEmail] = useState<string>(client?.email || '');
  const [tel, setTel] = useState<string>(client?.tel || '');
  const [cpf, setCpf] = useState<string>(client?.cpf || '');
  const [cep, setCep] = useState<string>(client?.cep || '');
  const [street, setStreet] = useState<string>(client?.street || '');
  const [number, setNumber] = useState<string>(client?.number || '');
  const [district, setDistrict] = useState<string>(client?.district || '');
  const [city, setCity] = useState<string>(client?.city || '');
  const [state, setState] = useState<string>(client?.cep || '');
  const [complement, setComplement] = useState<string>(
    client?.complement || '',
  );
  const [notes, setNotes] = useState<string>(client?.notes || '');

  const getInputData = () => {
    return {
      notes,
      complement,
      state,
      city,
      district,
      number,
      street,
      cep,
      cpf,
      tel,
      email,
      name,
      id: client?.id,
    };
  };

  const [doUpdate, { loading: UPDATE_LOADING }] = useLazyQuery(UPDATE_CLIENT, {
    fetchPolicy: 'network-only',
    variables: {
      clientData: getInputData(),
    },
    onCompleted: data => {
      console.log('data', data);
    },
  });

  return (
    <SafeContainer>
      <ContainerView>
        <ScrollView>
          <ContainerInput>
            <TextInput
              label="Nome"
              autoCapitalize="none"
              value={name}
              onChangeText={text => setName(text)}
            />
          </ContainerInput>
          <ContainerInput>
            <TextInput
              label="E-mail"
              autoCapitalize="none"
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </ContainerInput>
          <ContainerInput>
            <TextInput
              label="Telefone"
              autoCapitalize="none"
              value={tel}
              onChangeText={text => setTel(text)}
            />
          </ContainerInput>
          <ContainerInput>
            <TextInput
              label="CPF"
              autoCapitalize="none"
              value={cpf}
              onChangeText={text => setCpf(text)}
            />
          </ContainerInput>
          <ContainerInput>
            <TextInput
              label="CEP"
              autoCapitalize="none"
              value={cep}
              onChangeText={text => setCep(text)}
            />
          </ContainerInput>
          <ContainerInput>
            <TextInput
              label="Rua"
              autoCapitalize="none"
              value={street}
              onChangeText={text => setStreet(text)}
            />
          </ContainerInput>
          <ContainerInput>
            <TextInput
              label="Número"
              autoCapitalize="none"
              value={number}
              onChangeText={text => setNumber(text)}
            />
          </ContainerInput>
          <ContainerInput>
            <TextInput
              label="Bairro"
              autoCapitalize="none"
              value={district}
              onChangeText={text => setDistrict(text)}
            />
          </ContainerInput>
          <ContainerInput>
            <TextInput
              label="Cidade"
              autoCapitalize="none"
              value={city}
              onChangeText={text => setCity(text)}
            />
          </ContainerInput>
          <ContainerInput>
            <TextInput
              label="Estado"
              autoCapitalize="none"
              value={state}
              onChangeText={text => setState(text)}
            />
          </ContainerInput>
          <ContainerInput>
            <TextInput
              label="Complemento"
              autoCapitalize="none"
              value={complement}
              onChangeText={text => setComplement(text)}
            />
          </ContainerInput>
          <ContainerInput>
            <TextInput
              label="Observações"
              autoCapitalize="none"
              value={notes}
              onChangeText={text => setNotes(text)}
            />
          </ContainerInput>
          <Button
            mode="contained"
            loading={UPDATE_LOADING}
            onPress={client ? doUpdate : () => {}}>
            {client ? 'Alterar' : 'Salvar'}
          </Button>
        </ScrollView>
      </ContainerView>
    </SafeContainer>
  );
};

export default ClientDetails;
