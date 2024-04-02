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

  async createGroup(data: { termId: number; name: string }) {
    return await axiosAuth({
      url: 'api/v1/group-students',
      method: 'post',
      data,
    });
  }

  async assignAdmin(groupId: number, studentId: number) {
    return await axiosAuth({
      url: `api/v1/group-students/${groupId}/assign-admin`,
      method: 'put',
      data: { studentId },
    });
  }

  async deleteMember(groupId: number, studentId: number) {
    return await axiosAuth({
      url: `api/v1/group-students/${groupId}/delete-member`,
      method: 'put',
      data: { studentId },
    });
  }

  async removeGroup(groupId: number) {
    return await axiosAuth({
      url: `api/v1/group-students/${groupId}/remove-group`,
      method: 'put',
    });
  }

  async joinGroup(groupId: number) {
    return await axiosAuth({
      url: `api/v1/group-students/${groupId}/join-group`,
      method: 'put',
    });
  }
}

const groupService = new GroupService();
export default groupService;
