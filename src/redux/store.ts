import { configureStore } from '@reduxjs/toolkit';

import { GroupSlices } from './slices/GroupSlices';
import { MajorSlices } from './slices/MajorSlices';
import { TermSlices } from './slices/TermSlices';
import userSlice from './slices/UserSlices';
import { TopicSlices } from './slices/TopicSlices';

// ...

export const store = configureStore({
  reducer: {
    user: userSlice,
    major: MajorSlices.reducer,
    term: TermSlices.reducer,
    group: GroupSlices.reducer,
    topic: TopicSlices.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
