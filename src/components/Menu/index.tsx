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

  const goTo = (screen: string, stack?: string) => {
    closeMenu();
    if (stack) {
      return navigation.navigate(stack, { screen });
    }

    return navigation.navigate(screen);
  };

  if (!showMenu) {
    return null;
  }

  return (
    <>
      <Container showMenu={showMenu}>
        <Drawer.Section title="Menu">
          <Drawer.Item label="Home" onPress={() => goTo('HomeScreen')} />
          <Drawer.Item
            label="Clientes"
            onPress={() => goTo('ClientsScreen', 'ClientStackScreen')}
          />
          <Drawer.Item
            label="Ordens de serviços"
            onPress={() =>
              goTo('ServiceOrdersScreen', 'ServiceOrdersStackScreen')
            }
          />
        </Drawer.Section>
      </Container>
      <Background onPress={closeMenu} showMenu={showMenu} />
    </>
  );
};

export default Menu;
