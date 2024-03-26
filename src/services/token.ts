import AsyncStorage from '@react-native-async-storage/async-storage';

class TokenService {
  async getAccessToken() {
    try {
      const value = await AsyncStorage.getItem('access_token');

      return value;
    } catch (error) {
      console.log('Error getAccessToken', error);
    }
  }

  async setAccessToken(token: string) {
    try {
      await AsyncStorage.setItem('access_token', token);
    } catch (error) {
      console.log('Error setAccessToken', error);
    }
  }

  async getRefreshToken() {
    try {
      const value = await AsyncStorage.getItem('refresh_token');
      return value;
    } catch (error) {
      console.log('Error getRefreshToken', error);
    }
  }

  async setRefreshToken(token: string) {
    try {
      await AsyncStorage.setItem('refresh_token', token);
    } catch (error) {
      console.log('Error setRefreshToken', error);
    }
  }

  async logout() {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
  }
}

const tokenService = new TokenService();
export default tokenService;
