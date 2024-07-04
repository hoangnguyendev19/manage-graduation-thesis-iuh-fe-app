import { axiosAuth } from '../utils/axiosConfig';

class LecturerService {
  async getLecturerByMajor(id: string) {
    return await axiosAuth({
      url: `api/v1/lecturers?majorId=${id}`,
      method: 'get',
    });
  }
}

const lecturerService = new LecturerService();
export default lecturerService;
