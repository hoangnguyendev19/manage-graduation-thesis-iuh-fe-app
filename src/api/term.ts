import { createAsyncThunk } from '@reduxjs/toolkit';
import termService from '../services/term';
import { setAllow } from '../redux/slices/UserSlices';

class TermrAPI {
  getTermNow() {
    return createAsyncThunk('term/get-term-last', async (majorsId: number, thunkAPI) => {
      try {
        const result = await termService.getTermNow(majorsId);
        if (result.status === 200) {
          thunkAPI.dispatch(setAllow(result.data.allow));
          return result.data.term;
        }
      } catch (error) {
        console.log('createAsyncThunk Error!', error);
      }
    });
  }
}

const termrAPI = new TermrAPI();

export default termrAPI;
