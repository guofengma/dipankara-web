// import { routerRedux } from 'dva/router';
import { submitRegister } from '@/services/api';
// import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(submitRegister, payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
      // yield put(routerRedux.push('/user/register-result'));
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      // setAuthority('user');
      reloadAuthorized();
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
