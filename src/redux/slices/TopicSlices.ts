import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import authAPI from '../../api/auth';
import Major from '../../utils/types';
import Topic from '../../utils/types';
import topicAPI from '../../api/topic';

interface StateType {
  topic: Topic;
  error: boolean;
  is_loading: boolean;
}

const initialState = {
  topic: {
    id: NaN,
    name: '',
    quantityGroupMax: NaN,
    description: '',
    note: '',
    target: '',
    standradOutput: '',
    requireInput: '',
    comment: '',
    status: '',
    createdt: '',
    updatedt: '',
    lecturer: {
      id: NaN,
      username: '',
      avatar: '',
      phoneNumber: '',
      email: '',
      name: '',
      gender: '',
      createdt: '',
      updatedt: '',
      majors: {
        id: NaN,
      },
      degree: '',
      isdmin: '',
    },
    term: {
      id: NaN,
    },
  },
  is_loading: false,
  error: false,
} as StateType;

export const TopicSlices = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    setTopic: (state, action: PayloadAction<Topic>) => {
      state.topic = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(topicAPI.getTopicById().pending, (state) => {
      state.is_loading = true;
    });
    builder.addCase(topicAPI.getTopicById().fulfilled, (state, action) => {
      state.topic = action.payload;
      state.is_loading = false;
      state.error = false;
    });
    builder.addCase(topicAPI.getTopicById().rejected, (state) => {
      state.error = true;
      state.is_loading = false;
    });
  },
});

export const { setTopic } = TopicSlices.actions;
