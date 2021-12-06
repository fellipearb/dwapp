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

  const toggleMenu = () => setShowMenu(!showMenu);

  const goBackMain = () => {
    goBack && goBack();
    setShowMenu(false);
  };

  return (
    <>
      <Appbar.Header>
        {goBack && <Appbar.BackAction onPress={goBackMain} />}
        {(Title || Subtitle) && (
          <Appbar.Content title={Title} subtitle={Subtitle} />
        )}
        <Appbar.Action icon="dots-vertical" onPress={toggleMenu} />
      </Appbar.Header>

      <Menu closeMenu={toggleMenu} showMenu={showMenu} />
    </>
  );
};

export default Header;
