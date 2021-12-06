import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Drawer } from 'react-native-paper';
import { Container, Background } from './styles';

interface IMenu {
  closeMenu: () => void;
  showMenu: boolean;
}

const Menu = ({ closeMenu, showMenu }: IMenu) => {
  const navigation = useNavigation<any>();

  const goTo = (screen: string) => {
    closeMenu();
    return navigation.navigate(screen);
  };

  return (
    <>
      <Container showMenu={showMenu}>
        <Drawer.Section title="Menu">
          <Drawer.Item label="Home" onPress={() => goTo('HomeScreen')} />
          <Drawer.Item label="Clientes" onPress={() => goTo('ClientsScreen')} />
          <Drawer.Item
            label="Ordens de serviços"
            onPress={() => goTo('ServiceOrdersScreen')}
          />
        </Drawer.Section>
      </Container>
      <Background onPress={closeMenu} showMenu={showMenu} />
    </>
  );
};

export default Menu;
