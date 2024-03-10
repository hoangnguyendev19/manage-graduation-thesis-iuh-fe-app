import { createAsyncThunk } from '@reduxjs/toolkit';

import authService from '../services/auth';
import tokenService from '../services/token';
// import {setTranscript, setUser} from '../slices/UserSlices';
import { setUser } from '../redux/slices/UserSlices';
// import axios from 'axios';

class AuthAPI {
  getInfo() {
    return createAsyncThunk('user/get-info', async () => {
      const result = await authService.getInfo();
      if (result.status === 200) return result.data;
    });
  }

  login() {
    return createAsyncThunk(
      'user/login',
      async (data: { username: string; password: string }, thunkAPI) => {
        const result = await authService.login(data);
        if (result.status === 200) {
          await tokenService.setAccessToken(result.data.accessToken);

          await tokenService.setRefreshToken(result.data.refreshToken);
          thunkAPI.dispatch(setUser(result.data));
          return result.data;
        }
        return thunkAPI.rejectWithValue('login fail');
      },
    );
  }

  updateUserInfo() {
    return createAsyncThunk('user/update-info', async (data: FormData, thunkAPI) => {
      try {
        const result = await authService.updateUserInfo(data);
        if (result.status === 200) return result.data;
      } catch (error) {
        return thunkAPI.rejectWithValue('update fail');
      }
    });
  }
  getTranscripts() {
    return createAsyncThunk('user/get-transcripts', async (termId: number, thunkAPI) => {
      try {
        const result = await authService.getTranscripts(termId);
        if (result.status === 200) {
          // thunkAPI.dispatch(setTranscript(result.data));
          return result.data;
        }
      } catch (error) {
        return thunkAPI.rejectWithValue('transcripts fail');
      }
    });
  }
}

const authAPI = new AuthAPI();

export default authAPI;
