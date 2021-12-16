import { useMutation, useQuery } from '@apollo/client';
import React, { useCallback, useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { IServiceOrders } from '..';
import Alert from '../../../components/Alert';
import {
  ContainerInput,
  ContainerView,
  SafeContainer,
} from '../../../components/Container/styles';
import Loading from '../../../components/Loading';
import { formatFloatValue, formatReal } from '../../../utils/money';
import { IClient } from '../../Clients';
import { GET_ALL_CLIENTS } from '../../Clients/index.graphql';
import { IStatus } from '../../ServiceOrdersStatus';
import {
  GET_ALL_SERVICE_ORDERS_STATUS,
  INSERT_SERVICE_ORDER,
  UPDATE_SERVICE_ORDER,
} from '../index.graphql';
import ChooseOptions from './components/ChooseOptions';
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

  /**
   * FIELDS
   */
  const seFormatMoney = (value: string) => setValue(formatReal(value));

  const [client, setClient] = useState<IClient | undefined>(order?.client);
  const [idClient, setIdClient] = useState<string>(
    order?.client?.id?.toString() || '0',
  );

  const [status, setStatus] = useState<IStatus | undefined>(order?.status);
  const [idStatus, setIdStatus] = useState<string>(
    order?.status?.id?.toString() || '0',
  );

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
  const [value, setValue] = useState<string>(order?.content?.value || '0');

  const [toggleCLientList, setToggleClientList] = useState<boolean>(false);
  const [toggleStatusList, setToggleStatusList] = useState<boolean>(false);

  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [successModal, setSuccessModal] = useState<boolean>(false);

  const getInputData = () => {
    return {
      id: order?.id,
      client_id: parseInt(idClient, 10),
      brand,
      status_id: parseInt(idStatus, 10),
      equipment,
      identification,
      reports,
      description,
      notes,
      value: value ? formatFloatValue(value) : 0,
      // images: null,
    };
  };

  /**
   * QUERIES AND MUTATIONS
   */
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

  const [doInsert, { loading: INSERT_LOADING }] = useMutation(
    INSERT_SERVICE_ORDER,
    {
      fetchPolicy: 'network-only',
      variables: {
        serviceOrderData: getInputData(),
      },
      onCompleted: () => {
        setSuccessModal(true);
      },
      onError: () => {
        setErrorModal(true);
      },
    },
  );

  const [doUpdate, { loading: UPDATE_LOADING }] = useMutation(
    UPDATE_SERVICE_ORDER,
    {
      fetchPolicy: 'network-only',
      variables: {
        serviceOrderData: getInputData(),
      },
      onCompleted: () => {
        setSuccessModal(true);
      },
      onError: () => {
        setErrorModal(true);
      },
    },
  );

  /**
   * FNS TO CHANGE CLIENT AND STATUS
   */

  const toggleClientListAction = () => setToggleClientList(!toggleCLientList);
  const toggleStatusListAction = () => setToggleStatusList(!toggleStatusList);

  const changeClient = useCallback(
    (id: number | string) => {
      setIdClient(id.toString());

      const currentClient = allClients?.getAllClients?.find(
        (c: IClient) => c.id.toString() === id,
      );

      if (currentClient) {
        setClient(currentClient);
      }
    },
    [allClients],
  );

  const changeStatus = useCallback(
    (id: number | string) => {
      setIdStatus(id.toString());

      const currentStatus = allStatus?.getAllStatus?.find(
        (c: IStatus) => c.id.toString() === id,
      );

      if (currentStatus) {
        setStatus(currentStatus);
      }
    },
    [allStatus],
  );

  const alertModalError = {
    title: 'Erro',
    text: 'Erro ao inserir/atualizar OS',
    visible: true,
    toggleDialog: () => setErrorModal(false),
  };

  const alertModalSuccess = {
    title: 'Sucesso!',
    text: 'Sucesso ao inserir/atualizar OS',
    visible: true,
    toggleDialog: () => setSuccessModal(false),
  };

  if (CLIENT_LOADING || STATUS_LOADING) {
    return <Loading />;
  }

  if (toggleCLientList) {
    return (
      <ChooseOptions
        list={allClients?.getAllClients}
        id={idClient}
        setValue={changeClient}
        hideDialog={toggleClientListAction}
      />
    );
  }

  if (toggleStatusList) {
    return (
      <ChooseOptions
        list={allStatus?.getAllStatus}
        id={idStatus}
        setValue={changeStatus}
        hideDialog={toggleStatusListAction}
      />
    );
  }

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
              label="Cliente"
              autoCapitalize="none"
              value={client?.name || ''}
              onPressIn={toggleClientListAction}
              disabled
            />
          </ContainerInput>
          <ContainerInput>
            <TextInput
              label="Status"
              autoCapitalize="none"
              value={status?.name || ''}
              onPressIn={toggleStatusListAction}
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
        </ScrollView>
        <Button
          mode="contained"
          loading={CLIENT_LOADING || INSERT_LOADING || UPDATE_LOADING}
          onPress={order ? doUpdate : doInsert}>
          {order ? 'Alterar' : 'Salvar'}
        </Button>
      </ContainerView>
    </SafeContainer>
  );
};

export default ServiceOrdersDetails;
