import React from 'react';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { Container } from './styles';

const Loading = () => {
  return (
    <Container>
      <ActivityIndicator animating={true} color={Colors.red800} />
    </Container>
  );
};

export default Loading;
