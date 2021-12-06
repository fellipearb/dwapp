import { AsyncStorage } from 'react-native';

export const storeUser = async (user: any) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(user));
  } catch (error) {
    console.log('Something went wrong', error);
  }
};

export const getUser = async () => {
  try {
    let userData = await AsyncStorage.getItem('userData');
    let data = userData ? JSON.parse(userData) : {};

    return data;
  } catch (error) {
    console.log('Something went wrong', error);
  }
};
