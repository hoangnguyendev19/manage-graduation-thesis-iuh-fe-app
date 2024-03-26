import { axiosAuth } from '../utils/axiosConfig';

class NotificationService {
  async getAllNotify() {
    return await axiosAuth({
      url: 'api/v1/notification-students',
      method: 'get',
    });
  }

  async readNotify(id: number) {
    return await axiosAuth({
      url: `api/v1/notification-students/${id}/read`,
      method: 'put',
    });
  }

  async deleteNotify(id: number) {
    return await axiosAuth({
      url: `api/v1/notification-students/${id}`,
      method: 'delete',
    });
  }
}

const notificationService = new NotificationService();
export default notificationService;
