import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { IClient } from '..';
import Alert from '../../../components/Alert';
import {
  ContainerInput,
  ContainerView,
  SafeContainer,
} from '../../../components/Container/styles';
import { maskCEP, maskCPF, maskPhone } from '../../../utils/formatters';
import { onlyNumbers } from '../../../utils/money';
import { INSERT_CLIENT, UPDATE_CLIENT } from '../index.graphql';

interface IClientDetails {
  route: {
    params: {
      client?: IClient;
    };
  };
}

const ClientDetails = ({ route }: IClientDetails) => {
  const { client } = route.params;
  const navigation = useNavigation<any>();

  const [name, setName] = useState<string>(client?.name || '');
  const [email, setEmail] = useState<string>(client?.email || '');
  const [tel, setTel] = useState<string>(client?.content?.tel || '');
  const [cpf, setCpf] = useState<string>(client?.content?.cpf || '');
  const [cep, setCep] = useState<string>(client?.content?.cep || '');
  const [street, setStreet] = useState<string>(client?.street || '');
  const [number, setNumber] = useState<string>(client?.number || '');
  const [district, setDistrict] = useState<string>(client?.district || '');
  const [city, setCity] = useState<string>(client?.city || '');
  const [state, setState] = useState<string>(client?.state || '');
  const [complement, setComplement] = useState<string>(
    client?.complement || '',
  );
  const [notes, setNotes] = useState<string>(client?.notes || '');

  const onChangeCep = (text: string) => setCep(maskCEP(text));
  const onChangeCpf = (text: string) => setCpf(maskCPF(text));
  const onChangePhone = (text: string) => setTel(maskPhone(text));

  const getInputData = () => {
    return {
      notes,
      complement,
      state,
      city,
      district,
      number,
      street,
      cep: onlyNumbers(cep),
      cpf: onlyNumbers(cpf),
      tel: onlyNumbers(tel),
      email,
      name,
      id: client?.id,
    };
  };

  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [successModal, setSuccessModal] = useState<boolean>(false);

  const alertModalError = {
    title: 'Erro',
    text: 'Erro ao atualizar cliente',
    visible: true,
    toggleDialog: () => {
      setErrorModal(false);
      navigation.goBack();
    },
  };

  const alertModalSuccess = {
    title: 'Sucesso!',
    text: 'Sucesso ao inserir/atualizar cliente',
    visible: true,
    toggleDialog: () => {
      setSuccessModal(false);
      navigation.goBack();
    },
  };

  const [doInsert, { loading: INSERT_LOADING }] = useMutation(INSERT_CLIENT, {
    fetchPolicy: 'network-only',
    variables: {
      clientData: getInputData(),
    },
    onCompleted: () => {
      setSuccessModal(true);
    },
    onError: err => {
      console.error('err', err);
      setErrorModal(true);
    },
  });

  const [doUpdate, { loading: UPDATE_LOADING }] = useMutation(UPDATE_CLIENT, {
    fetchPolicy: 'network-only',
    variables: {
      clientData: getInputData(),
    },
    onCompleted: () => {
      setSuccessModal(true);
    },
    onError: err => {
      console.error('err', err);
      setErrorModal(true);
    },
  });

  if (successModal) {
    return <Alert {...alertModalSuccess} />;
  }

  if (errorModal) {
    return <Alert {...alertModalError} />;
  }

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
              onChangeText={text => onChangePhone(text)}
              keyboardType="numeric"
            />
          </ContainerInput>
          <ContainerInput>
            <TextInput
              label="CPF"
              autoCapitalize="none"
              value={cpf}
              onChangeText={text => onChangeCpf(text)}
              keyboardType="numeric"
            />
          </ContainerInput>
          <ContainerInput>
            <TextInput
              label="CEP"
              autoCapitalize="none"
              value={cep}
              onChangeText={text => onChangeCep(text)}
              keyboardType="numeric"
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
              keyboardType="numeric"
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
            loading={UPDATE_LOADING || INSERT_LOADING}
            onPress={client ? doUpdate : doInsert}>
            {client ? 'Alterar' : 'Salvar'}
          </Button>
        </ScrollView>
      </ContainerView>
    </SafeContainer>
  );
};

export default ClientDetails;
