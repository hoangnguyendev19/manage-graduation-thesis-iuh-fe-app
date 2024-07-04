import { axiosAuth } from '../utils/axiosConfig';

class TranscriptService {
  getTranscripts(termId: string) {
    return axiosAuth({
      url: `api/v1/transcripts/summary?termId=${termId}`,
      method: 'get',
    });
  }

  getTranscriptByType(termId: string, type: string, studentId: string) {
    return axiosAuth({
      url: `api/v1/transcripts?termId=${termId}&type=${type}&studentId=${studentId}`,
      method: 'get',
    });
  }
}

const transcriptService = new TranscriptService();
export default transcriptService;
