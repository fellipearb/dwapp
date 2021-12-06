import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Header from '../components/Header';

export type RootStackParamList = {
  LoginScreen: undefined;
  HomeScreen: undefined;
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
