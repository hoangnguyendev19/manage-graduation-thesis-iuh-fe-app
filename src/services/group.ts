import { axiosAuth } from '../utils/axiosConfig';

class GroupService {
  async getMyGroup(termId: string) {
    return await axiosAuth({
      url: `api/v1/group-students/me?termId=${termId}`,
      method: 'get',
    });
  }

  async getListGroup(termId: string, majorId: string) {
    return await axiosAuth({
      url: `api/v1/group-students/major?termId=${termId}&majorId=${majorId}`,
      method: 'get',
    });
  }

  // async createGroup(data: { termId: string; name: string }) {
  //   return await axiosAuth({
  //     url: 'api/v1/group-students',
  //     method: 'post',
  //     data,
  //   });
  // }

  async assignAdmin(groupId: string, studentId: string) {
    return await axiosAuth({
      url: `api/v1/group-students/${groupId}/assign-admin`,
      method: 'put',
      data: { studentId },
    });
  }

  async removeMember(groupId: string, studentId: string) {
    return await axiosAuth({
      url: `api/v1/group-students/${groupId}/remove-member`,
      method: 'put',
      data: { studentId },
    });
  }

  async leaveGroup(groupId: string) {
    return await axiosAuth({
      url: `api/v1/group-students/${groupId}/leave-group`,
      method: 'put',
    });
  }

  async joinGroup(groupId: string) {
    return await axiosAuth({
      url: `api/v1/group-students/${groupId}/join-group`,
      method: 'put',
    });
  }

  async chooseTopic(groupId: string, topicId: string) {
    return await axiosAuth({
      url: `api/v1/group-students/${groupId}/choose-topic`,
      method: 'put',
      data: { topicId },
    });
  }

  async cancelTopic(groupId: string) {
    return await axiosAuth({
      url: `api/v1/group-students/${groupId}/cancel-topic`,
      method: 'put',
    });
  }
}

const groupService = new GroupService();
export default groupService;
