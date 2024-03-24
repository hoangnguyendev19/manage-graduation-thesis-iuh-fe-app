import { axiosAuth } from '../utils/axiosConfig';

class TermService {
  getTermNow() {
    return axiosAuth({
      url: 'api/v1/terms/now',
      method: 'get',
    });
  }
}

const termService = new TermService();

export default termService;
