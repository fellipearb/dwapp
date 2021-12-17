import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

import Container from '../../components/Container';
import { SafeContainer } from '../../components/Container/styles';
import { getUser, IUser } from '../../utils/user';

const Home = () => {
  const [user, setUser] = useState<IUser | any>();

  const getUserStorage = async () => {
    const userStorage = await getUser();

    setUser(userStorage);
  };

  useEffect(() => {
    getUserStorage();
  }, []);

  return (
    <>
      <SafeContainer>
        <Container>
          <Text>Bem-vindo {user?.name}</Text>
        </Container>
      </SafeContainer>
    </>
  );
};

export default Home;
