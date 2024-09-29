import { axiosAuth } from '../utils/axiosConfig';

class TopicService {
  async getTopicId(id: string) {
    return await axiosAuth({
      url: `api/v1/topics/${id}`,
      method: 'get',
    });
  }

  async getTopicList(
    termId: string,
    keywords: string,
    searchField: string,
    page: number,
    limit: number,
    sort: string,
  ) {
    return await axiosAuth({
      url: `api/v1/topics?termId=${termId}&keywords=${keywords}&searchField=${searchField}&page=${page}&limit=${limit}&sort=${sort}`,
      method: 'get',
    });
  }
}

const topicService = new TopicService();

export default topicService;
