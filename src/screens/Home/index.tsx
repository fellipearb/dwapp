import React from 'react';
import { Text } from 'react-native';
import { getUser } from '../../utils/user';

const Home = () => {
  const user = async () => {
    return await getUser();
  };

  return (
    <>
      <Text>
        Home {user.name} {user.login}
      </Text>
    </>
  );
};

export default Home;
