import React from 'react';
import { Appbar } from 'react-native-paper';

interface IHeader {
  goBack?: () => void;
  Title?: string;
  Subtitle?: string;
}

const Header = ({ goBack, Title, Subtitle }: IHeader) => {
  return (
    <Appbar.Header>
      {goBack && <Appbar.BackAction onPress={goBack} />}
      {(Title || Subtitle) && (
        <Appbar.Content title={Title} subtitle={Subtitle} />
      )}
      <Appbar.Action icon="dots-vertical" onPress={() => {}} />
    </Appbar.Header>
  );
};

export default Header;
