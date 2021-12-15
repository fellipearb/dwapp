import * as React from 'react';
import { Button, Paragraph, Dialog } from 'react-native-paper';

interface IAlert {
  visible: boolean;
  toggleDialog: () => void;
  title: string;
  text: string;
}

const Alert = ({ title, text, visible, toggleDialog }: IAlert) => {
  return (
    <Dialog visible={visible} onDismiss={toggleDialog}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Content>
        <Paragraph>{text}</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={toggleDialog}>Ok</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default Alert;
