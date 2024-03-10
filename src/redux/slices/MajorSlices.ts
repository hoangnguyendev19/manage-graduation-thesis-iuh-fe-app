import { createSlice } from '@reduxjs/toolkit';
import authAPI from '../../api/auth';
import Major from '../../utils/types';
import { isNull, isNumber } from 'lodash';
import { number } from 'yup';
import majorAPI from '../../api/major';

interface StateType {
  major: Major;
  error: boolean;
  is_loading: boolean;
}

const initialState = {
  major: {
    id: '',
    name: '',
    headLecturer: {
      id: NaN,
      majors: {},
      degree: '',
      isAdmin: '',
      createdAt: '',
      updatedAt: '',
    },
  },
  is_loading: false,
  error: false,
} as StateType;

export const MajorSlices = createSlice({
  name: 'major',
  initialState,
  reducers: {
    //
  },
  extraReducers: (builder) => {
    builder.addCase(majorAPI.getMajorById().pending, (state) => {
      state.is_loading = true;
    });
    builder.addCase(majorAPI.getMajorById().fulfilled, (state, action) => {
      state.major = action.payload;
      state.is_loading = false;
      state.error = false;
    });
    builder.addCase(majorAPI.getMajorById().rejected, (state) => {
      state.error = true;
      state.is_loading = false;
    });
  },
});
