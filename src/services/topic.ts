import { axiosAuth } from '../utils/axiosConfig';

class TopicService {
  async getTopicId(id: string) {
    return await axiosAuth({
      url: `api/v1/topics/${id}`,
      method: 'get',
    });
  }

  async getTopicList(termId: string) {
    return await axiosAuth({
      url: `api/v1/topics/approved?termId=${termId}`,
      method: 'get',
    });
  }
}

const topicService = new TopicService();

export default topicService;
