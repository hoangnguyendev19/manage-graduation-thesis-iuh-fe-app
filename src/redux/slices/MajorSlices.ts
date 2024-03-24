import { createSlice } from '@reduxjs/toolkit';
import { Major } from '../../utils/types';
import majorAPI from '../../api/major';

interface StateType {
  major: Major;
  isLoading: boolean;
  isError: boolean;
}

const initialState = {
  major: {
    id: NaN,
    name: '',
    created_at: '',
    updated_at: '',
  },
  isLoading: false,
  isError: false,
} as StateType;

export const MajorSlices = createSlice({
  name: 'major',
  initialState,
  reducers: {
    //
  },
  extraReducers: (builder) => {
    builder.addCase(majorAPI.getMajorById().pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(majorAPI.getMajorById().fulfilled, (state, action) => {
      state.major = action.payload;
      state.isLoading = false;
    });
    builder.addCase(majorAPI.getMajorById().rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});
