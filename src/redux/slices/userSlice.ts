import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import authAPI from '../../api/auth';
import { Student } from '../../utils/types';

interface StateType {
  user: Student;
  isLoading: boolean;
  isError: boolean;
  isLogin: boolean;
}

const initialState = {
  user: {
    id: '',
    username: '',
    fullName: '',
    avatar: '',
    phone: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    clazzName: '',
    typeTraining: '',
    isActive: true,
    majorId: '',
    majorName: '',
  } as Student,
  isLoading: false,
  isError: false,
  isLogin: false,
} as StateType;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Student>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authAPI.login().pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authAPI.login().fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLogin = true;
      })
      .addCase(authAPI.login().rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(authAPI.getInfo().pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authAPI.getInfo().fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLogin = true;
      })
      .addCase(authAPI.getInfo().rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(authAPI.updateInfo().pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authAPI.updateInfo().fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(authAPI.updateInfo().rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(authAPI.logout().pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authAPI.logout().fulfilled, (state) => {
        state.isLoading = false;
        state.isLogin = false;
        state.user = initialState.user;
      })
      .addCase(authAPI.logout().rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
