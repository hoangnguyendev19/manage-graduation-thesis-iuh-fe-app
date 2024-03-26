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
    id: NaN,
    name: '',
    startDate: '',
    endDate: '',
    isChooseGroup: false,
    isChooseTopic: false,
    isSubmitTopic: false,
    isDiscussion: false,
    isReport: false,
    isPublicResult: false,
    created_at: '',
    updated_at: '',
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
