import React, { useState } from 'react';
import { Appbar } from 'react-native-paper';
import Menu from '../Menu';

interface IHeader {
  goBack?: () => void;
  Title?: string;
  Subtitle?: string;
}

const Header = ({ goBack, Title, Subtitle }: IHeader) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleBackground = () => setShowMenu(!showMenu);

  return (
    <>
      <Appbar.Header>
        {goBack && <Appbar.BackAction onPress={goBack} />}
        {(Title || Subtitle) && (
          <Appbar.Content title={Title} subtitle={Subtitle} />
        )}
        <Appbar.Action icon="dots-vertical" onPress={toggleBackground} />
      </Appbar.Header>

      <Menu closeMenu={toggleBackground} showMenu={showMenu} />
    </>
  );
};

export default Header;
