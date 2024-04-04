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
    return await axiosAuth({
      url: 'api/v1/students/me',
      method: 'put',
      data,
    });
  }

  async updatePassword(data: { password: string; newPassword: string }) {
    return await axiosAuth({
      url: `api/v1/students/update-password`,
      method: 'put',
      data,
    });
  }

  async logout() {
    return await axiosAuth({
      url: 'api/v1/students/logout',
      method: 'delete',
    });
  }

  // resetPassword(data: {username: string}) {
  //   return axiosNotAuth({
  //     url: `api/students/auth/send-mail-forgot-password`,
  //     method: 'post',
  //     data,
  //   });
  // }
}

const authService = new AuthService();
export default authService;
