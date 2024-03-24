import { axiosAuth } from '../utils/axiosConfig';

class TopicService {
  getTopicId(id: number) {
    console.log('TopicService getTopicId', id);

    return axiosAuth({
      url: `api/student/topics/${id}`,
      method: 'get',
    });
  }
  getTopicList(termId: number, majorId: number) {
    return axiosAuth({
      url: `api/v1/topics?termId=${termId}&majorId=${majorId}`,
      method: 'get',
    });
  }
  chooseTopic(termId: number, topicId: number) {
    console.log(' termId', termId);
    console.log(' topicId', topicId);

    return axiosAuth({
      url: `api/student/groups/topic`,
      method: 'post',
      data: { termId, topicId },
    });
  }
  cancelTopic(termId: number) {
    return axiosAuth({
      url: `api/student/groups/topic`,
      method: 'delete',
      data: { termId },
    });
  }
}

const topicService = new TopicService();

export default topicService;
