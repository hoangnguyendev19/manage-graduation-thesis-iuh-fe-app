import { createSlice } from '@reduxjs/toolkit';
import { Transcript } from '../../utils/types';
import transcriptAPI from '../../api/transcript';

interface StateType {
  transcript: Transcript;
  isLoading: boolean;
  isError: boolean;
}

const initialState = {
  transcript: {
    id: NaN,
    score: NaN,
    created_at: '',
    updated_at: '',
  },
  isLoading: false,
  isError: false,
} as StateType;

export const TranscriptSlices = createSlice({
  name: 'transcript',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(transcriptAPI.getTranscripts().pending, (state) => {
        state.isLoading = true;
      })
      .addCase(transcriptAPI.getTranscripts().fulfilled, (state, action) => {
        state.transcript = action.payload;
        state.isLoading = false;
      })
      .addCase(transcriptAPI.getTranscripts().rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const {} = TranscriptSlices.actions;
