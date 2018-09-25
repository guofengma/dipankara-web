// import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { queryHome } from '../services/api';
// import { stat } from 'fs';

export default {
  namespace: 'home',

  state: {
    cm: 0,
  },

  effects: {
    *fetch({ payload }, { call }) {
      const res = yield call(queryHome, payload);
      if (res.errorcode !== 0) {
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
  },
};
