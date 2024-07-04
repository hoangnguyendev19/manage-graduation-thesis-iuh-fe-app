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
    id: '',
    name: '',
    created_at: '',
    updated_at: '',
  } as Major,
  isLoading: false,
  isError: false,
} as StateType;

const majorSlice = createSlice({
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

export const {} = majorSlice.actions;
export default majorSlice.reducer;
