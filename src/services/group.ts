import { axiosAuth } from '../utils/axiosConfig';

class GroupService {
  async getMyGroup(termId: number) {
    return await axiosAuth({
      url: `api/v1/group-students/me?termId=${termId}`,
      method: 'get',
    });
  }

  async getListGroup(termId: number, majorId: number) {
    return await axiosAuth({
      url: `api/v1/group-students/major?termId=${termId}&majorId=${majorId}`,
      method: 'get',
    });
  }

  // getGroupById(id: number) {
  //   return axiosAuth({
  //     url: 'api/student/groups/' + id,
  //     method: 'get',
  //   });
  // }
  async createGroup(data: { termId: number; name: string }) {
    return await axiosAuth({
      url: 'api/student/groups',
      method: 'post',
      data,
    });
  }
  outGroup(termId: number) {
    return axiosAuth({
      url: 'api/student/groups',
      method: 'delete',
      data: { termId },
    });
  }
}

const groupService = new GroupService();
export default groupService;
