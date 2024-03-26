import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import authAPI from '../../api/auth';
import { Topic } from '../../utils/types';
import topicAPI from '../../api/topic';

interface StateType {
  topic: Topic;
  isLoading: boolean;
  isError: boolean;
}

const initialState = {
  topic: {
    id: NaN,
    name: '',
    description: '',
    quantityGroupMax: NaN,
    note: '',
    target: '',
    standardOutput: '',
    requireInput: '',
    comment: '',
    status: '',
    level: '',
    created_at: '',
    updated_at: '',
    lecturerTerm: {
      id: NaN,
      lecturer: {
        id: NaN,
        fullName: '',
        avatarUrl: '',
        email: '',
        phoneNumber: '',
        gender: '',
        degree: '',
        major: {
          id: NaN,
          name: '',
        },
      },
    },
  } as Topic,
  isLoading: false,
  isError: false,
} as StateType;

const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    setTopic: (state, action: PayloadAction<Topic>) => {
      state.topic = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(topicAPI.getTopicById().pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(topicAPI.getTopicById().fulfilled, (state, action) => {
      state.topic = action.payload;
      state.isLoading = false;
    });
    builder.addCase(topicAPI.getTopicById().rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export const { setTopic } = topicSlice.actions;
export default topicSlice.reducer;
