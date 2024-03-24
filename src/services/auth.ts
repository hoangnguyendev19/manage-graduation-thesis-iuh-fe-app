import { axiosAuth, axiosFormData, axiosNotAuth } from '../utils/axiosConfig';

class AuthService {
  async login(data: { userName: string; password: string }) {
    return await axiosNotAuth({
      url: 'api/v1/students/login',
      method: 'post',
      data,
    });
  }

  async getMe() {
    return await axiosAuth({
      url: 'api/v1/students/me',
      method: 'get',
    });
  }

  async updateMe(data: FormData) {
    return axiosFormData({
      url: 'api/v1/students/me',
      method: 'put',
      data,
    });
  }

  // getStudent(termId: number, groupExists: boolean) {
  //   return axiosAuth({
  //     url: `api/student/students?termId=${termId}&groupExists=${groupExists}`,
  //     method: 'get',
  //   });
  // }

  // resetPassword(data: {username: string}) {
  //   return axiosNotAuth({
  //     url: `api/students/auth/send-mail-forgot-password`,
  //     method: 'post',
  //     data,
  //   });
  // }

  updatePassword(data: { password: string; newPassword: string }) {
    return axiosAuth({
      url: `api/v1/students/update-password`,
      method: 'put',
      data,
    });
  }
}

const authService = new AuthService();
export default authService;
