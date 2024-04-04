import { createAsyncThunk } from '@reduxjs/toolkit';

import authService from '../services/auth';
import tokenService from '../services/token';

class AuthAPI {
  getInfo() {
    return createAsyncThunk('user/get-info', async () => {
      const result = await authService.getMe();

      if (result.status === 200) return result.data.user;
    });
  }

  login() {
    return createAsyncThunk(
      'user/login',
      async (data: { userName: string; password: string }, thunkAPI) => {
        try {
          const result = await authService.login(data);

          if (result.status === 200) {
            await tokenService.setAccessToken(result.data.accessToken);

            await tokenService.setRefreshToken(result.data.refreshToken);
            return result.data.user;
          }
        } catch (error) {
          console.log('error', error);
          return thunkAPI.rejectWithValue('login fail');
        }
      },
    );
  }

  updateInfo() {
    return createAsyncThunk('user/update-info', async (data: any, thunkAPI) => {
      try {
        const result = await authService.updateMe(data);
        if (result.status === 200) return result.data.user;
      } catch (error) {
        return thunkAPI.rejectWithValue('update fail');
      }
    });
  }

  logout() {
    return createAsyncThunk('user/logout', async () => {
      const result = await authService.logout();

      if (result.status === 200) {
        await tokenService.logout();
      }
    });
  }
}

const authAPI = new AuthAPI();

export default authAPI;
