import { createAsyncThunk } from '@reduxjs/toolkit';
import topicService from '../services/topic';

class TopicAPI {
  getTopicById() {
    return createAsyncThunk('topic/get-topic-by-id', async (id: number) => {
      const result = await topicService.getTopicId(id);
      if (result.status === 200) return result.data;
    });
  }
}

const topicAPI = new TopicAPI();

export default topicAPI;
