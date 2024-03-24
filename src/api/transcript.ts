import { createAsyncThunk } from '@reduxjs/toolkit';
import transcriptService from '../services/transcript';

class TranscriptAPI {
  getTranscripts() {
    return createAsyncThunk('transcript/get-transcripts', async (termId: number, thunkAPI) => {
      try {
        const result = await transcriptService.getTranscripts(termId);
        if (result.status === 200) {
          return result.data;
        }
      } catch (error) {
        return thunkAPI.rejectWithValue('transcripts fail');
      }
    });
  }
}

const transcriptAPI = new TranscriptAPI();

export default transcriptAPI;
