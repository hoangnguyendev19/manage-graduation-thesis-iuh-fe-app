import { axiosAuth } from '../utils/axiosConfig';

class TranscriptService {
  getTranscripts(termId: string) {
    return axiosAuth({
      url: `api/v1/transcripts/summary?termId=${termId}`,
      method: 'get',
    });
  }

  getTranscriptByStudent(termId: string, type: string) {
    return axiosAuth({
      url: `api/v1/transcripts/student?termId=${termId}&type=${type}`,
      method: 'get',
    });
  }
}

const transcriptService = new TranscriptService();
export default transcriptService;
