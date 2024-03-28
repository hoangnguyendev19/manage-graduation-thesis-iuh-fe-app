import { configureStore } from '@reduxjs/toolkit';

import majorReducer from './slices/majorSlice';
import termReducer from './slices/termSlice';
import userReducer from './slices/userSlice';
import topicReducer from './slices/topicSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    term: termReducer,
    major: majorReducer,
    topic: topicReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
