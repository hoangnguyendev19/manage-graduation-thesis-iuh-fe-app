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

  async chooseTopic(termId: number, topicId: number) {
    return await axiosAuth({
      url: `api/student/groups/topic`,
      method: 'post',
      data: { termId, topicId },
    });
  }

  async cancelTopic(termId: number) {
    return await axiosAuth({
      url: `api/student/groups/topic`,
      method: 'delete',
      data: { termId },
    });
  }
}

const topicService = new TopicService();

export default topicService;
