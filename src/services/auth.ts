import {axiosAuth, axiosFormData, axiosNotAuth} from '../utils/axiosConfig';

class AuthService {
  login(data: {username: string; password: string}) {
    console.log('data - AuthService', data);
    return axiosNotAuth({
      url: 'api/student/auth/login',
      method: 'post',
      data,
    });
  }
  getInfo() {
    return axiosAuth({
      url: 'api/student/me',
      method: 'get',
    });
  }

  updateUserInfo = async (data: FormData) => {
    return axiosFormData({
      url: 'api/student/me',
      method: 'put',
      data,
    });
  };

  getStudent(termId: number, groupExists: boolean) {
    return axiosAuth({
      url: `api/student/students?termId=${termId}&groupExists=${groupExists}`,
      method: 'get',
    });
  }

  getTranscripts(termId: number) {
    return axiosAuth({
      url: `api/student/transcripts?termId=${termId}`,
      method: 'get',
    });
  }
  resetPassword(data: {username: string}) {
    return axiosNotAuth({
      url: `api/student/auth/send-mail-forgot-password`,
      method: 'post',
      data,
    });
  }
  updatePassword(data: {oldPassword: string; newPassword: string}) {
    return axiosAuth({
      url: `api/student/me/password`,
      method: 'patch',
      data,
    });
  }
  getAllMotify() {
    return axiosAuth({
      url: 'api/student/me/notifications',
      method: 'get',
    });
  }

  readNotify(id: number) {
    return axiosAuth({
      url: `api/student/me/notification/${id}/read`,
      method: 'post',
    });
  }

  readAllNotify() {
    return axiosAuth({
      url: `api/student/me/notification/read-all`,
      method: 'post',
    });
  }
}

const authService = new AuthService();
export default authService;
