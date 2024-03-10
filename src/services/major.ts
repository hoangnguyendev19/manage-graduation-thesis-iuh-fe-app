import {axiosAuth} from '../utils/axiosConfig';

class MajorService {
  getMajorById(id: number) {
    return axiosAuth({
      url: 'api/student/majors/' + id,
      method: 'get',
    });
  }
  getLecturerByMajor(id: number) {
    return axiosAuth({
      url: `api/student/lecturers?majorsId=${id}`,
      method: 'get',
    });
  }
}

const majorService = new MajorService();

export default majorService;
