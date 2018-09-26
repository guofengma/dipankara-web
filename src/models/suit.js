// import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { queryTeacherList } from '../services/api';
// import { stat } from 'fs';

export default {
  namespace: 'suit',

  state: {
    suits: [],
  },

  effects: {
    *fetchSuits({ payload }, { call, put }) {
      const res = yield call(queryTeacherList, payload);
      if (res.errorcode === 0) {
        yield put({
          type: 'save',
          payload: {
            teachers: res.teacherList,
          },
        });
      } else {
        message.success('失败');
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    saveTeacherList(state, { payload }) {
      return {
        ...state,
        queryCount: {
          ...state.queryCount,
          classList: payload,
        },
      };
    },
    saveClassStudents(state, { payload }) {
      return {
        ...state,
        queryCount: {
          ...state.queryCount,
          tableData: payload,
        },
      };
    },
  },
};
