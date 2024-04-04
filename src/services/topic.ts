import { axiosAuth } from '../utils/axiosConfig';

class TopicService {
  async getTopicId(id: number) {
    return await axiosAuth({
      url: `api/v1/topics/${id}`,
      method: 'get',
    });
  }

  async getTopicList(termId: number, majorId: number) {
    return await axiosAuth({
      url: `api/v1/topics?termId=${termId}&majorId=${majorId}`,
      method: 'get',
    });
  }
}

const topicService = new TopicService();

export default topicService;
