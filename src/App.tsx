import React from 'react';
import MainStack from './stacks';
import { Provider as PaperProvider } from 'react-native-paper';

const App = () => {
  return (
    <PaperProvider>
      <MainStack />
    </PaperProvider>
  );
};

export default App;
