import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Header from '../components/Header';
import Clients from '../screens/Clients';
import ClientDetails from '../screens/Clients/ClientDetails';

export type ClientStackParamList = {
  ClientsScreen: undefined;
  ClientsDetailsScreen: undefined;
};

const Stack = createNativeStackNavigator<ClientStackParamList>();

const ClientStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ClientsScreen"
        component={Clients}
        options={{
          header: ({ navigation }) => {
            return (
              <Header Title={'Clientes'} goBack={() => navigation.goBack()} />
            );
          },
        }}
      />
      <Stack.Screen
        name="ClientsDetailsScreen"
        component={ClientDetails}
        options={{
          header: ({ navigation }) => {
            return (
              <Header Title={'Clientes'} goBack={() => navigation.goBack()} />
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default ClientStackScreen;
