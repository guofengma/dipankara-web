// import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {
  // fakeSubmitForm,
  submitStudentEnroll,
  queryStudents,
  queryClassList,
  queryClassStudents,
} from '@/services/api';
// import { stat } from 'fs';

export default {
  namespace: 'student',

  state: {
    queryCount: {
      classList: [{ name: '美术班', value: 1 }, { name: '数学班', value: 2 }],
      tableData: {
        list: [
          {
            key: '1',
            name: 'John Brown',
            class: 1,
            left: 10,
          },
          {
            key: '2',
            name: 'Jim Green',
            class: 1,
            left: 10,
          },
          {
            key: '3',
            name: 'Joe Black',
            class: 1,
            left: 12,
          },
        ],
        pagination: {
          current: 1,
          pageSize: 1,
          total: 3,
        },
      },
    },
    queryCheckin: {
      tableData: {
        list: [
          {
            key: '1',
            name: 'John Brown',
            class: 1,
            left: 10,
          },
          {
            key: '2',
            name: 'Jim Green',
            class: 1,
            left: 10,
          },
          {
            key: '3',
            name: 'Joe Black',
            class: 1,
            left: 12,
          },
        ],
        pagination: {
          current: 1,
          pageSize: 1,
          total: 3,
        },
      },
    },
    query: {
      tableData: [
        {
          key: '1',
          name: 'John Brown',
          age: '10',
          address: 'New York No. 1 Lake Park',
        },
        {
          key: '2',
          name: 'Jim Green',
          age: '11',
          address: 'London No. 1 Lake Park',
        },
        {
          key: '3',
          name: 'Joe Black',
          age: '12',
          address: 'Sidney No. 1 Lake Park',
        },
      ],
    },
  },

  effects: {
    *fetchStudents({ payload }, { call, put }) {
      const res = yield call(queryStudents, payload);
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
    *fetchClassList({ payload }, { call, put }) {
      const res = yield call(queryClassList, payload);
      if (res.errorcode === 0) {
        yield put({
          type: 'saveClassList',
          payload: res.classList,
        });
      } else {
        message.success('失败');
      }
    },
    *fetchClassStudents({ payload }, { call, put }) {
      const res = yield call(queryClassStudents, payload);
      if (res.errorcode === 0) {
        yield put({
          type: 'saveClassStudents',
          payload: res.tableData,
        });
      } else {
        message.success('失败');
      }
    },
    *submitEnrollForm({ payload }, { call }) {
      const res = yield call(submitStudentEnroll, payload);
      if (res.errorcode === 0) {
        message.success('提交成功');
      }
    },
    *submitEnrollKeForm({ payload }, { call }) {
      const res = yield call(submitStudentEnroll, payload);
      if (res.errorcode === 0) {
        message.success('提交成功');
      }
    },
    *submitCheckInForm({ payload }, { call }) {
      const res = yield call(submitStudentEnroll, payload);
      if (res.errorcode === 0) {
        message.success('提交成功');
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
    saveClassList(state, { payload }) {
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

  subscriptions: {
    setup({ dispatch, history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname }) => {
        if (pathname === '/student/query') {
          dispatch({ type: 'fetchStudents', payload: null });
        }
      });
    },
  },
};
