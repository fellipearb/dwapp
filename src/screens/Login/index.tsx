import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { LogoImage } from '../../assets/images';
import { ContainerCenter } from '../../components/Container/styles';
import { ContainerImage, ContainerInput, Logo } from './styles';

const Login = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <ContainerCenter>
      <ContainerImage>
        <Logo source={LogoImage} />
      </ContainerImage>
      <ContainerInput>
        <TextInput
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </ContainerInput>
      <ContainerInput>
        <TextInput
          label="Senha"
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </ContainerInput>
      <Button mode="contained" onPress={() => console.log('Pressed')}>
        Login
      </Button>
    </ContainerCenter>
  );
};

export default Login;
