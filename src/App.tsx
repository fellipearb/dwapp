import React from 'react';
import MainStack from './stacks';
import { Provider as PaperProvider } from 'react-native-paper';
import { ApolloProvider } from './providers';

const App = () => {
  return (
    <ApolloProvider>
      <PaperProvider>
        <MainStack />
      </PaperProvider>
    </ApolloProvider>
  );
};

export default App;
