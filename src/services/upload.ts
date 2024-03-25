import { axiosFormData } from '../utils/axiosConfig';

class UploadService {
  async uploadAvatar(file: FormData) {
    const result = await axiosFormData.post('api/v1/uploads', file);

    return result.data;
  }
}

const uploadService = new UploadService();
export default uploadService;
