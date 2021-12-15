import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { IServiceOrders } from '..';
import {
  ContainerInput,
  ContainerView,
  SafeContainer,
} from '../../../components/Container/styles';
import { formatReal } from '../../../utils/money';

interface IClientDetails {
  route: {
    params: {
      order: IServiceOrders;
    };
  };
}

const ServiceOrdersDetails = ({ route }: IClientDetails) => {
  const { order } = route.params;

  const seFormatMoney = (value: string) => setValue(formatReal(value));

  const [equipment, setEquipment] = useState<string>(order?.equipment || '');
  const [brand, setBrand] = useState<string>(order?.brand || '');
  const [identification, setIdentification] = useState<string>(
    order?.identification || '',
  );
  const [reports, setReports] = useState<string>(order?.reports || '');
  const [description, setDescription] = useState<string>(
    order?.description || '',
  );
  const [notes, setNotes] = useState<string>(order?.notes || '');
  const [value, setValue] = useState<string>(formatReal(order?.value) || '0');

  return (
    <SafeContainer>
      <ContainerView>
        <ScrollView>
          <ContainerInput>
            <TextInput
              label="Equipamento"
              autoCapitalize="none"
              value={equipment}
              onChangeText={text => setEquipment(text)}
            />
          </ContainerInput>
          <ContainerInput>
            <TextInput
              label="Marca"
              autoCapitalize="none"
              value={brand}
              onChangeText={text => setBrand(text)}
            />
          </ContainerInput>
          <ContainerInput>
            <TextInput
              label="Identificação"
              autoCapitalize="none"
              value={identification}
              onChangeText={text => setIdentification(text)}
            />
          </ContainerInput>
          <ContainerInput>
            <TextInput
              label="Observações"
              autoCapitalize="none"
              value={reports}
              onChangeText={text => setReports(text)}
              multiline
            />
          </ContainerInput>
          <ContainerInput>
            <TextInput
              label="Descrição"
              autoCapitalize="none"
              value={description}
              onChangeText={text => setDescription(text)}
              multiline
            />
          </ContainerInput>
          <ContainerInput>
            <TextInput
              label="Anotações"
              autoCapitalize="none"
              value={notes}
              onChangeText={text => setNotes(text)}
              multiline
            />
          </ContainerInput>
          <ContainerInput>
            <TextInput
              label="Anotações"
              autoCapitalize="none"
              value={value}
              onChangeText={text => seFormatMoney(text)}
              multiline
            />
          </ContainerInput>
        </ScrollView>
      </ContainerView>
    </SafeContainer>
  );
};

export default ServiceOrdersDetails;
