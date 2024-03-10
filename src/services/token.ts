import AsyncStorage from '@react-native-async-storage/async-storage';

class TokenService {
  getAccessToken = async () => {
    try {
      const value = await AsyncStorage.getItem('access_token');
      if (value !== null) {
        return value;
      }

      return null;
    } catch (error) {
      console.log('Error getAccessToken', error);
    }
  };

  setAccessToken = async (token: string) => {
    try {
      const value = await AsyncStorage.setItem('access_token', token);
      console.log('TokenService setAccessToken ', value);

      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.log('Error setAccessToken', error);
    }
  };

  getRefreshToken = async () => {
    try {
      const value = await AsyncStorage.getItem('refresh_token');
      console.log('TokenService getRefreshToken ', value);
      return value;
    } catch (error) {
      console.log('Error getRefreshToken', error);
    }
  };

  setRefreshToken = async (token: string) => {
    const value = await AsyncStorage.setItem('refresh_token', token);
    return value;
  };

  reset = async () => {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
  };
}

const tokenService = new TokenService();
export default tokenService;
