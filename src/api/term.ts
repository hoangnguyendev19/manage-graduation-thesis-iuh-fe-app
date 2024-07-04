import { createAsyncThunk } from '@reduxjs/toolkit';
import termService from '../services/term';

class TermAPI {
  getTermNow() {
    return createAsyncThunk('term/get-term-last', async () => {
      try {
        const result = await termService.getTermNow();

        if (result.status === 200) {
          // thunkAPI.dispatch(setAllow(result.data.allow));
          return result.data.term;
        }
      } catch (error) {
        console.log('createAsyncThunk Error!', error);
      }
    });
  }
}

const termAPI = new TermAPI();

export default termAPI;
