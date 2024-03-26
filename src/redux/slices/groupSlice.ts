import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Group } from '../../utils/types';
import groupAPI from '../../api/group';
import termrAPI from '../../api/term';

interface StateType {
  group: Group;
  isLoading: boolean;
  isError: boolean;
}

const initialState = {
  group: {
    id: NaN,
    status: '',
    name: '',
    typeReport: '',
    topic_id: NaN,
    term_id: NaN,
    created_at: '',
    updated_at: '',
  },
  isLoading: false,
  isError: false,
} as StateType;

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(groupAPI.getMyGroup().pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(groupAPI.getMyGroup().fulfilled, (state, action) => {
      state.group = action.payload;
      state.isLoading = false;
    });

    builder.addCase(groupAPI.getMyGroup().rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export const {} = groupSlice.actions;
export default groupSlice.reducer;
