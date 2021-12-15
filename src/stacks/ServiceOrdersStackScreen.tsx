import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Header from '../components/Header';
import ServiceOrders from '../screens/ServiceOrders';
import ServiceOrdersDetails from '../screens/ServiceOrders/ServiceOrdersDetails';

export type ClientStackParamList = {
  ServiceOrdersScreen: undefined;
  ServiceOrdersDetailsScreen: undefined;
};

const Stack = createNativeStackNavigator<ClientStackParamList>();

const ServiceOrdersStackScreen = () => {
  return (
    <Stack.Navigator>
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
        name="ServiceOrdersDetailsScreen"
        component={ServiceOrdersDetails}
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
  );
};

export default ServiceOrdersStackScreen;
