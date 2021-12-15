import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Login from '../screens/Login';

import Header from '../components/Header';
import ClientStackScreen from './ClientsStackScreen';
import ServiceOrdersStackScreen from './ServiceOrdersStackScreen';

export type RootStackParamList = {
  LoginScreen: undefined;
  HomeScreen: undefined;
  ServiceOrdersScreen: undefined;
  ClientStackScreen: undefined;
  ServiceOrdersStackScreen: undefined;
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
          name="ClientStackScreen"
          component={ClientStackScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ServiceOrdersStackScreen"
          component={ServiceOrdersStackScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
