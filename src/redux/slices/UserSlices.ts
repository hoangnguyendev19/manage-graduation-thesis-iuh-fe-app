import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import authAPI from '../../api/auth';
import User from '../../utils/types';
import Transcript from '../../utils/types';

interface StateType {
  user: User;
  error: boolean;
  is_loading: boolean;
  is_login: boolean;
  updated: boolean;
  updateError: boolean;
  notify: number;
  allow: boolean;
}

const initialState = {
  user: {
    id: '',
    username: '',
    avatar: '',
    phoneNumber: '',
    email: '',
    name: '',
    gender: '',
    createdAt: '',
    updatedAt: '',
    majors: {
      id: NaN,
    },
    typeTraining: '',
    schoolYear: '',
  },
  error: false,
  is_login: false,
  updated: false,
  updateError: false,
  notify: NaN,
  allow: true,
} as StateType;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setAllow: (state, action) => {
      console.log('-======> setAllow', action);
      state.allow = action.payload;
    },
    setNotySlice: (state, action) => {
      console.log('-======> noty', action);
      state.notify = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authAPI.login().fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.error = false;
      state.is_login = true;
    });
    builder.addCase(authAPI.login().rejected, (state) => {
      state.is_login = false;
      state.error = true;
    });

    builder.addCase(authAPI.getInfo().fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { updateUser, setUser, setAllow, setNotySlice } = userSlice.actions;
