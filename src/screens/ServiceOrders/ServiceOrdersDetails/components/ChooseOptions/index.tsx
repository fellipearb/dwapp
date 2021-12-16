import React from 'react';
import { ScrollView } from 'react-native';
import { Button, Dialog, RadioButton } from 'react-native-paper';
import { IClient } from '../../../../Clients';
import { IStatus } from '../../../../ServiceOrdersStatus';
import { DialogContainer } from './styles';
interface IChooseOptions {
  hideDialog: () => void;
  setValue: (id: string | number) => void;
  id: string | number;
  list: IClient[] | IStatus[];
}

const ChooseOptions = ({ hideDialog, setValue, id, list }: IChooseOptions) => {
  return (
    <DialogContainer visible={true} onDismiss={hideDialog}>
      <Dialog.Title>Clientes</Dialog.Title>
      <ScrollView>
        <Dialog.Content>
          <RadioButton.Group
            onValueChange={value => setValue(value)}
            value={id?.toString()}>
            {list?.map(c => (
              <RadioButton.Item
                label={c.name}
                value={c.id.toString()}
                status={id === c.id.toString() ? 'checked' : 'unchecked'}
                key={c.id}
              />
            ))}
          </RadioButton.Group>
        </Dialog.Content>
      </ScrollView>
      <Dialog.Actions>
        <Button onPress={hideDialog}>Ok</Button>
      </Dialog.Actions>
    </DialogContainer>
  );
};

export default ChooseOptions;
