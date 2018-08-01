// import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { queryTeacherList } from '../services/api';
// import { stat } from 'fs';

export default {
  namespace: 'teacher',

  state: {
    teachers: [],
  },

  effects: {
    *fetchTeacherList({ payload }, { call, put }) {
      const res = yield call(queryTeacherList, payload);
      if (res.errorcode === 0) {
        yield put({
          type: 'save',
          payload: {
            query: {
              tableData: res.tableData,
            },
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

  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     // Subscribe history(url) change, trigger `load` action if pathname is `/`
  //     return history.listen(({ pathname }) => {
  //       if (pathname === '/student/query') {
  //         dispatch({ type: 'fetchStudents', payload: null });
  //       }
  //     });
  //   },
  // },
};
