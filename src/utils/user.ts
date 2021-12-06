import { AsyncStorage } from 'react-native';

export interface IUser {
  id: number;
  name: string;
  login: string;
  accessToken: string;
}

export const storeUser = async <IUser>(user: IUser) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(user));

    return user;
  } catch (error) {
    console.log('Something went wrong', error);
  }
};

export const getUser = async <IUser>() => {
  try {
    let userData = await AsyncStorage.getItem('userData');
    let data = userData ? JSON.parse(userData) : {};

    return data;
  } catch (error) {
    console.log('Something went wrong', error);
  }
};
