import { axiosAuth } from '../utils/axiosConfig';

class LecturerService {
  async getLecturerByMajor(termId: string, majorId: string) {
    return await axiosAuth({
      url: `api/v1/lecturers/major?termId=${termId}&majorId=${majorId}`,
      method: 'get',
    });
  }
}

const lecturerService = new LecturerService();
export default lecturerService;
