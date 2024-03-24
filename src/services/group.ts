import { axiosAuth } from '../utils/axiosConfig';

class GroupService {
  getMyGroup(termId: number) {
    return axiosAuth({
      url: `api/v1/group-students/me?termId=${termId}`,
      method: 'get',
    });
  }
  getGroupById(id: number) {
    return axiosAuth({
      url: 'api/student/groups/' + id,
      method: 'get',
    });
  }
  getListGroup(termId: number) {
    return axiosAuth({
      url: `api/student/groups?termId=${termId}`,
      method: 'get',
    });
  }
  createGroup(data: { termId: number; name: string }) {
    return axiosAuth({
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

  sendRequestGroup(groupId: number, message: string) {
    return axiosAuth({
      url: `api/student/groups/${groupId}/my-requests`,
      method: 'post',
      data: { message },
    });
  }
  inviteStudentJoinMyGroup(termId: number, studentId: string, message: string) {
    return axiosAuth({
      url: `api/student/groups/group-requests`,
      method: 'post',
      data: { termId, studentId, message },
    });
  }
  getMyrequestJoinGroup(termId: number, type: string) {
    return axiosAuth({
      url: `api/student/groups/group-requests?termId=${termId}&type=${type}`,
      method: 'get',
    });
  }
  getRequestJoinGroupOrder(termId: number, type: string) {
    return axiosAuth({
      url: `api/student/groups/my-requests?termId=${termId}&type=${type}`,
      method: 'get',
    });
  }
  deleteRequest(id: number) {
    return axiosAuth({
      url: `api/student/groups/refuse-request/${id}`,
      method: 'delete',
    });
  }
  acceptRequest(id: number) {
    return axiosAuth({
      url: `api/student/groups/accep-request/${id}`,
      method: 'post',
    });
  }
}

const groupService = new GroupService();
export default groupService;
