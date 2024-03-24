import { axiosAuth } from '../utils/axiosConfig';

class MajorService {
  getMajorById(id: number) {
    return axiosAuth({
      url: `api/v1/majors/${id}`,
      method: 'get',
    });
  }
}

const majorService = new MajorService();

export default majorService;
