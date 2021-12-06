import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Login from '../screens/Login';
import ServiceOrders from '../screens/ServiceOrders';

import Header from '../components/Header';
import Clients from '../screens/Clients';

export type RootStackParamList = {
  LoginScreen: undefined;
  HomeScreen: undefined;
  ServiceOrdersScreen: undefined;
  ClientsScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={Home}
          options={{
            header: () => {
              return <Header Title={'Home'} />;
            },
          }}
        />
        <Stack.Screen
          name="ServiceOrdersScreen"
          component={ServiceOrders}
          options={{
            header: ({ navigation }) => {
              return (
                <Header
                  Title={'Ordens de Serviço'}
                  goBack={() => navigation.goBack()}
                />
              );
            },
          }}
        />
        <Stack.Screen
          name="ClientsScreen"
          component={Clients}
          options={{
            header: ({ navigation }) => {
              return (
                <Header
                  Title={'Ordens de Serviço'}
                  goBack={() => navigation.goBack()}
                />
              );
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
