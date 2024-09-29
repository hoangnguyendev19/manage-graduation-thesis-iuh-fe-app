import { createAsyncThunk } from '@reduxjs/toolkit';
import termService from '../services/term';

class TermAPI {
  getTermNow() {
    return createAsyncThunk('term/get-term-last', async (majorId: String) => {
      try {
        const result = await termService.getTermNow(majorId);

        if (result.status === 200) {
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
