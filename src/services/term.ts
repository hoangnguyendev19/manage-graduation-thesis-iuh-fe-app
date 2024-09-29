import { axiosAuth } from '../utils/axiosConfig';

class TermService {
  getTermNow(majorId: String) {
    return axiosAuth({
      url: `api/v1/terms/now?majorId=${majorId}`,
      method: 'get',
    });
  }
}

const termService = new TermService();

export default termService;
