import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { IServiceOrders } from '..';
import {
  ContainerInput,
  ContainerView,
  SafeContainer,
} from '../../../components/Container/styles';
import Loading from '../../../components/Loading';
import { formatReal } from '../../../utils/money';
import { IClient } from '../../Clients';
import { GET_ALL_CLIENTS } from '../../Clients/index.graphql';
import { IStatus } from '../../ServiceOrdersStatus';
import { GET_ALL_SERVICE_ORDERS_STATUS } from '../index.graphql';
import { ContainerImages, Image } from './styles';

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

  const [client, setClient] = useState<IClient>(order?.client);
  const [status, setStatus] = useState<IStatus>(order?.status);

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

  const { data: allClients, loading: CLIENT_LOADING } = useQuery(
    GET_ALL_CLIENTS,
    {
      fetchPolicy: 'network-only',
    },
  );

  const { data: allStatus, loading: STATUS_LOADING } = useQuery(
    GET_ALL_SERVICE_ORDERS_STATUS,
    {
      fetchPolicy: 'network-only',
    },
  );

  const doUpdate = () => {};
  const doInsert = () => {};

  if (CLIENT_LOADING || STATUS_LOADING) {
    return <Loading />;
  }

  return (
    <SafeContainer>
      <ContainerView>
        <ScrollView>
          <ContainerInput>
            <TextInput
              label="Cliente"
              autoCapitalize="none"
              value={client?.name || ''}
              onPressIn={() => console.log('press')}
              disabled
            />
          </ContainerInput>
          <ContainerInput>
            <TextInput
              label="Status"
              autoCapitalize="none"
              value={status?.name || ''}
              onPressIn={() => console.log('press')}
              disabled
            />
          </ContainerInput>
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
              label="Valor"
              autoCapitalize="none"
              value={value}
              onChangeText={text => seFormatMoney(text)}
              multiline
            />
          </ContainerInput>
          <ContainerImages horizontal={true}>
            {order?.images?.map(image => (
              <Image source={{ uri: image.path }} key={image.id} />
            ))}
          </ContainerImages>
          <Button
            mode="contained"
            loading={CLIENT_LOADING}
            onPress={order ? doUpdate : doInsert}>
            {order ? 'Alterar' : 'Salvar'}
          </Button>
        </ScrollView>
      </ContainerView>
    </SafeContainer>
  );
};

export default ServiceOrdersDetails;
