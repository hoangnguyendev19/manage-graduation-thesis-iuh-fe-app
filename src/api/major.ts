import { createAsyncThunk } from '@reduxjs/toolkit';
import majorService from '../services/major';

class MajorAPI {
  getMajorById() {
    return createAsyncThunk('major/get-major-by-id', async (id: number) => {
      const result = await majorService.getMajorById(id);
      if (result.status === 200) return result.data;
    });
  }
}

const majorAPI = new MajorAPI();

export default majorAPI;
