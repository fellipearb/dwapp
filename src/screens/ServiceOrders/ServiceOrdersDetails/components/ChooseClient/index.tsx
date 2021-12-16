import React from 'react';
import { ScrollView } from 'react-native';
import { Button, Dialog, RadioButton } from 'react-native-paper';
import { SafeContainer } from '../../../../../components/Container/styles';
import { IClient } from '../../../../Clients';

interface IChooseClient {
  hideDialog: () => void;
  setValue: (id: string | number) => void;
  client: string | number;
  clientList: IClient[];
}

const ChooseClient = ({
  hideDialog,
  setValue,
  client,
  clientList,
}: IChooseClient) => {
  return (
    <SafeContainer>
      <Dialog visible={true} onDismiss={hideDialog}>
        <ScrollView>
          <Dialog.Title>Clientes</Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group
              onValueChange={value => setValue(value)}
              value={client?.toString()}>
              {clientList?.map(c => (
                <RadioButton.Item
                  label={c.name}
                  value={c.id.toString()}
                  status={client === c.id.toString() ? 'checked' : 'unchecked'}
                />
              ))}
            </RadioButton.Group>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </ScrollView>
      </Dialog>
    </SafeContainer>
  );
};

export default ChooseClient;
