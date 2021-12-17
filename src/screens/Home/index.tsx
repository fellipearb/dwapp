import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, Touchable, TouchableOpacity } from 'react-native';

import Container from '../../components/Container';
import { SafeContainer } from '../../components/Container/styles';
import { getUser, IUser } from '../../utils/user';

const Home = () => {
  const navigation = useNavigation<any>();
  const [user, setUser] = useState<IUser | any>();

  const getUserStorage = async () => {
    const userStorage = await getUser();

    setUser(userStorage);
  };

  useEffect(() => {
    getUserStorage();
  }, []);

  const goTo = (screen: string, stack?: string) => {
    if (stack) {
      return navigation.navigate(stack, { screen });
    }

    return navigation.navigate(screen);
  };

  return (
    <>
      <SafeContainer>
        <Container>
          <Text>Bem-vindo {user?.name}</Text>
          <TouchableOpacity
            onPress={() =>
              goTo('ServiceOrdersScreen', 'ServiceOrdersStackScreen')
            }>
            <Text>sss</Text>
          </TouchableOpacity>
        </Container>
      </SafeContainer>
    </>
  );
};

export default Home;
