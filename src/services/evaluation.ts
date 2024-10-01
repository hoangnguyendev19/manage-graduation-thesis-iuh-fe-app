import { axiosAuth } from '../utils/axiosConfig';

class EvaluationService {
  getEvaluationsByType(termId: string, type: string) {
    return axiosAuth({
      url: `api/v1/evaluations?termId=${termId}&type=${type}`,
      method: 'get',
    });
  }
}

const evaluationService = new EvaluationService();
export default evaluationService;
