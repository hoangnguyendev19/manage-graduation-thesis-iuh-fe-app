import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Group from '../../utils/types';
import groupAPI from '../../api/group';
import termrAPI from '../../api/term';

interface StateType {
  group: Group;
  error: boolean;
  is_loading: boolean;
  is_outed: boolean;
  loading: boolean;
  listGroup: object;
}

const initialState = {
  group: {
    id: NaN,
    status: '',
    name: '',
    term: {
      id: NaN,
    },
    topic: {},
    members: [
      {
        id: NaN,
        student: {
          id: NaN,
          username: '',
          avatar: '',
          phoneNumber: '',
          email: '',
          name: '',
          gender: '',
          createdAt: '',
          updatedAt: '',
          majors: {
            id: NaN,
          },
          typeTraining: '',
          schoolYear: '',
        },
        group: {
          id: NaN,
        },
      },
    ],
  },
  listGroup: [],
  is_loading: false,
  error: false,
  is_outed: false,
  loading: false,
} as StateType;

export const GroupSlices = createSlice({
  name: 'group',
  initialState,
  reducers: {
    updateOutedGroup: (state, action: PayloadAction<boolean>) => {
      state.is_outed = action.payload;
    },
    setListGroup: (state, action: PayloadAction<Object>) => {
      state.listGroup = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setGroup: (state, action: PayloadAction<Group>) => {
      state.group = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(groupAPI.getMyGroup().pending, (state) => {
      state.is_loading = true;
    });
    builder.addCase(groupAPI.getMyGroup().fulfilled, (state, action) => {
      state.group = action.payload;
      state.is_loading = false;
      state.error = false;
    });

    builder.addCase(groupAPI.getMyGroup().rejected, (state) => {
      state.error = true;
      state.is_loading = false;
    });

    builder.addCase(groupAPI.outMyGroup().pending, (state) => {
      state.is_loading = true;
    });

    builder.addCase(groupAPI.outMyGroup().fulfilled, (state, action) => {
      console.log('GroupSlices outMyGroup action', action);
      state.is_loading = false;
      state.group = action.payload;
      state.error = false;
    });

    builder.addCase(groupAPI.outMyGroup().rejected, (state) => {
      state.error = true;
      state.is_loading = false;
    });

    builder.addCase(groupAPI.createGroup().fulfilled, (state, action) => {
      state.group = action.payload;
      state.is_loading = false;
    });

    builder.addCase(groupAPI.createGroup().rejected, (state, action) => {
      state.is_loading = false;
      state.error = true;
    });

    builder.addCase(groupAPI.accpectJoinGroup().pending, (state, action) => {
      state.is_loading = true;
    });
    builder.addCase(groupAPI.accpectJoinGroup().fulfilled, (state, action) => {
      state.group = action.payload;
      state.is_loading = false;
    });

    builder.addCase(groupAPI.accpectJoinGroup().rejected, (state, action) => {
      state.is_loading = false;
      state.error = true;
    });
  },
});

export const { setLoading, setGroup } = GroupSlices.actions;
