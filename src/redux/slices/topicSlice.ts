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
    id: '',
    name: '',
    description: '',
    quantityGroupMax: NaN,
    note: '',
    target: '',
    standardOutput: '',
    requireInput: '',
    status: '',
    created_at: '',
    updated_at: '',
    lecturerTerm: {
      id: '',
      lecturer: {
        id: '',
        username: '',
        fullName: '',
        avatar: '',
        email: '',
        phone: '',
        gender: '',
        degree: '',
        major: {
          id: '',
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
