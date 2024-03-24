import { axiosAuth } from '../utils/axiosConfig';

class TranscriptService {
  getTranscripts(termId: number) {
    return axiosAuth({
      url: `api/v1/transcripts/summary?termId=${termId}`,
      method: 'get',
    });
  }

  getTranscriptByTypeEvaluation(termId: number, typeEvaluation: string) {
    return axiosAuth({
      url: `api/v1/transcripts?termId=${termId}&type=${typeEvaluation}`,
      method: 'get',
    });
  }
}

const transcriptService = new TranscriptService();
export default transcriptService;
