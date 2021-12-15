import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import {
  ContainerInput,
  ContainerView,
  SafeContainer,
} from '../../../components/Container/styles';

interface IClientDetails {
  route: {
    params: {
      order: any;
    };
  };
}

const ServiceOrdersDetails = ({ route }: IClientDetails) => {
  const { order } = route.params;

  const [name, setName] = useState<string>(order?.name || '');

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
        </ScrollView>
      </ContainerView>
    </SafeContainer>
  );
};

export default ServiceOrdersDetails;
