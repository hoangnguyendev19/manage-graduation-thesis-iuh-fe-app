import { createSlice } from '@reduxjs/toolkit';
import { Term } from '../../utils/types';
import termAPI from '../../api/term';

interface StateType {
  term: Term;
  isLoading: boolean;
  isError: boolean;
}

const initialState = {
  term: {
    id: '',
    name: '',
    startDate: '',
    endDate: '',
    startChooseGroupDate: '',
    endChooseGroupDate: '',
    startChooseTopicDate: '',
    endChooseTopicDate: '',
    startDiscussionDate: '',
    endDiscussionDate: '',
    startReportDate: '',
    endReportDate: '',
    startPublicResultDate: '',
    endPublicResultDate: '',
  } as Term,
  isLoading: false,
  isError: false,
} as StateType;

const termSlice = createSlice({
  name: 'term',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(termAPI.getTermNow().pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(termAPI.getTermNow().fulfilled, (state, action) => {
      state.term = action.payload;
      state.isLoading = false;
    });
    builder.addCase(termAPI.getTermNow().rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export const {} = termSlice.actions;
export default termSlice.reducer;
