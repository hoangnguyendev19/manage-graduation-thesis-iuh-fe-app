import AsyncStorage from '@react-native-async-storage/async-storage';

class TokenService {
  getAccessToken = async () => {
    try {
      const value = await AsyncStorage.getItem('access_token');

      return value;
    } catch (error) {
      console.log('Error getAccessToken', error);
    }
  };

  setAccessToken = async (token: string) => {
    try {
      await AsyncStorage.setItem('access_token', token);
    } catch (error) {
      console.log('Error setAccessToken', error);
    }
  };

  getRefreshToken = async () => {
    try {
      const value = await AsyncStorage.getItem('refresh_token');
      return value;
    } catch (error) {
      console.log('Error getRefreshToken', error);
    }
  };

  setRefreshToken = async (token: string) => {
    try {
      await AsyncStorage.setItem('refresh_token', token);
    } catch (error) {
      console.log('Error setRefreshToken', error);
    }
  };

  reset = async () => {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
  };
}

const tokenService = new TokenService();
export default tokenService;
