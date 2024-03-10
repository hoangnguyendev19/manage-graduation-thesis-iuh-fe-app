import { createSlice } from '@reduxjs/toolkit';
import Term from '../../utils/types';
import termrAPI from '../../api/term';

interface StateType {
  term: Term;
  error: boolean;
  is_loading: boolean;
}

const initialState = {
  term: {
    id: NaN,
    name: '',
    startDate: '',
    endDate: '',
    startDateSubmitTopic: '',
    endDateSubmitTopic: '',
    startDateChooseTopic: '',
    endDateChooseTopic: '',
    dateDiscussion: '',
    dateReport: '',
    createdAt: '',
    updatedAt: '',
    startDateDiscussion: '',
    endDateDiscussion: '',
    startDateReport: '',
    endDateReport: '',
    majors: {
      id: NaN,
    },
  },
  is_loading: false,
  error: false,
} as StateType;

export const TermSlices = createSlice({
  name: 'term',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(termrAPI.getTermNow().pending, (state) => {
      state.is_loading = true;
    });
    builder.addCase(termrAPI.getTermNow().fulfilled, (state, action) => {
      state.term = action.payload;
      state.is_loading = false;
      state.error = false;
    });
    builder.addCase(termrAPI.getTermNow().rejected, (state) => {
      state.error = true;
      state.is_loading = false;
    });
  },
});
