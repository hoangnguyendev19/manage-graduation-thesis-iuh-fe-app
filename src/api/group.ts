import { createAsyncThunk } from '@reduxjs/toolkit';
import groupService from '../services/group';

class GroupAPI {
  getMyGroup() {
    return createAsyncThunk('group/get-my-group', async (termId: number) => {
      const result = await groupService.getMyGroup(termId);

      if (result.status === 200) {
        return result.data.group;
      }
    });
  }

  // getGroupById() {
  //   return createAsyncThunk('group/get-group-by-id', async (id: number) => {
  //     const result = await groupService.getGroupById(id);

  //     if (result.status === 200) return result.data;
  //   });
  // }

  // outMyGroup() {
  //   return createAsyncThunk('group/out-group-by-termId', async (termId: number, thunkAP) => {
  //     const result = await groupService.outGroup(termId);

  //     if (result.status === 200) {
  //       console.log('result.data');

  //       return result.data;
  //     }
  //     return thunkAP.rejectWithValue('Xóa nhóm không thành công');
  //   });
  // }

  // createGroup() {
  //   return createAsyncThunk(
  //     'group/create-my-group',
  //     async (data: { termId: number; name: string }, thunkAP) => {
  //       const result = await groupService.createGroup(data);

  //       if (result.status === 200) {
  //         console.log('result.data', result.data);

  //         return result.data;
  //       }
  //       return thunkAP.rejectWithValue('Tạo nhóm không thành công');
  //     },
  //   );
  // }

  // accpectJoinGroup() {
  //   return createAsyncThunk('group/accept-join-group', async (id: number) => {
  //     const result = await groupService.acceptRequest(id);

  //     if (result.status === 200) {
  //       return result.data;
  //     }
  //   });
  // }
}

const groupAPI = new GroupAPI();

export default groupAPI;
