import React, { useState } from 'react';

import { Button, TextInput } from 'react-native-paper';
import { LogoImage } from '../../assets/images';
import {
  ContainerCenter,
  ContainerInput,
} from '../../components/Container/styles';
import { ContainerImage, Logo } from './styles';

import { DO_LOGIN } from './index.graphql';
import { useLazyQuery } from '@apollo/client';
import { storeUser } from '../../utils/user';
import { useNavigation } from '@react-navigation/core';
import Alert from '../../components/Alert';

const Login = () => {
  const navigation = useNavigation<any>();

  const [login, setLogin] = useState<string>();
  const [password, setPassword] = useState<string>();

  const [errorModal, setErrorModal] = useState<boolean>(false);

  const alertModalError = {
    title: 'Erro',
    text: 'Usuário e/ou senha inválidos',
    visible: true,
    toggleDialog: () => setErrorModal(!errorModal),
  };

  const [doLogin, { loading }] = useLazyQuery(DO_LOGIN, {
    fetchPolicy: 'network-only',
    variables: {
      loginData: {
        login,
        password,
      },
    },
    onCompleted: data => {
      storeUser(data.doLogin);

      navigation.navigate('HomeScreen');
    },
    onError: err => {
      console.log('err', err);

      setErrorModal(!errorModal);
    },
  });

  if (errorModal) {
    return <Alert {...alertModalError} />;
  }

  return (
    <ContainerCenter>
      <ContainerImage>
        <Logo source={LogoImage} />
      </ContainerImage>
      <ContainerInput>
        <TextInput
          label="Usuário"
          autoCapitalize="none"
          value={login}
          onChangeText={text => setLogin(text)}
        />
      </ContainerInput>
      <ContainerInput>
        <TextInput
          label="Senha"
          secureTextEntry={true}
          autoCapitalize="none"
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </ContainerInput>
      <Button mode="contained" onPress={() => doLogin()} loading={loading}>
        Login
      </Button>
    </ContainerCenter>
  );
};

export default Login;
