import { routerRedux } from 'dva/router';
// import { message } from 'antd';
import {
  queryTuitionIncome,
  queryInvestIncome,
  queryOtherIncome,
  queryWageExpenditure,
  querySuitExpenditure,
  queryOtherExpenditure,
  queryCompanyExpenditure,
  queryRevenue,
  submitTeacherBill,
  submitSuitExpenditure,
  submitOtherExpenditure,
} from '@/services/api';

export default {
  namespace: 'bill',

  state: {
    tuitionIncome: {
      months: [
        {
          key: '1',
          name: '7月份',
          fee: 32,
        },
        {
          key: '2',
          name: '8月份',
          fee: 32,
        },
        {
          key: '3',
          name: '总计',
          fee: 42,
        },
      ],
    },
    investIncome: {
      months: [
        {
          key: '1',
          name: '7月份',
          fee: 32,
        },
        {
          key: '2',
          name: '8月份',
          fee: 32,
        },
        {
          key: '3',
          name: '总计',
          fee: 42,
        },
      ],
      sum: 0,
      cm: 0,
    },
    otherIncome: {
      months: [
        {
          key: '1',
          name: '7月份',
          fee: 32,
          remark: '潜在',
        },
        {
          key: '2',
          name: '8月份',
          fee: 32,
          remark: '潜在',
        },
        {
          key: '3',
          name: '总计',
          fee: 42,
          remark: '潜在',
        },
      ],
    },
    wageExpenditure: {
      months: [
        {
          key: '1',
          name: '7月份',
          fee: 32,
          remark: '潜在',
        },
        {
          key: '2',
          name: '8月份',
          fee: 32,
          remark: '潜在',
        },
        {
          key: '3',
          name: '总计',
          fee: 42,
          remark: '潜在',
        },
      ],
    },
    suitExpenditure: {
      months: [
        {
          key: '1',
          name: '7月份',
          fee: 32,
          remark: '潜在',
        },
        {
          key: '2',
          name: '8月份',
          fee: 32,
          remark: '潜在',
        },
        {
          key: '3',
          name: '总计',
          fee: 42,
          remark: '潜在',
        },
      ],
    },
    otherExpenditure: {
      months: [
        {
          key: '1',
          name: '7月份',
          fee: 32,
          remark: '潜在',
        },
        {
          key: '2',
          name: '8月份',
          fee: 32,
          remark: '潜在',
        },
        {
          key: '3',
          name: '总计',
          fee: 42,
          remark: '潜在',
        },
      ],
    },
    companyExpenditure: {
      months: [
        {
          key: '1',
          name: '7月份',
          fee: 32,
          remark: '潜在',
        },
        {
          key: '2',
          name: '8月份',
          fee: 32,
          remark: '潜在',
        },
        {
          key: '3',
          name: '总计',
          fee: 42,
          remark: '潜在',
        },
      ],
    },
    revenue: {
      left: 0,
    },
  },

  effects: {
    *fetchTuitionIncome({ payload }, { call, put }) {
      const res = yield call(queryTuitionIncome, payload);
      if (res.errorcode === 0) {
        yield put({
          type: 'save',
          payload: {
            tuitionIncome: {
              months: res.months,
            },
          },
        });
      }
    },
    *fetchInvestIncome({ payload }, { call, put }) {
      const res = yield call(queryInvestIncome, payload);
      if (res.errorcode === 0) {
        yield put({
          type: 'save',
          payload: {
            investIncome: {
              months: res.months,
            },
          },
        });
      }
    },
    *fetchOtherIncome({ payload }, { call, put }) {
      const res = yield call(queryOtherIncome, payload);
      if (res.errorcode === 0) {
        yield put({
          type: 'save',
          payload: {
            otherIncome: {
              months: res.months,
            },
          },
        });
      }
    },
    *fetchWageExpenditure({ payload }, { call, put }) {
      const res = yield call(queryWageExpenditure, payload);
      if (res.errorcode === 0) {
        yield put({
          type: 'save',
          payload: {
            wageExpenditure: {
              months: res.months,
            },
          },
        });
      }
    },
    *fetchSuitExpenditure({ payload }, { call, put }) {
      const res = yield call(querySuitExpenditure, payload);
      if (res.errorcode === 0) {
        yield put({
          type: 'save',
          payload: {
            suitExpenditure: {
              months: res.months,
            },
          },
        });
      }
    },
    *fetchOtherExpenditure({ payload }, { call, put }) {
      const res = yield call(queryOtherExpenditure, payload);
      if (res.errorcode === 0) {
        yield put({
          type: 'save',
          payload: {
            otherExpenditure: {
              months: res.months,
            },
          },
        });
      }
    },
    *fetchCompanyExpenditure({ payload }, { call, put }) {
      const res = yield call(queryCompanyExpenditure, payload);
      if (res.errorcode === 0) {
        yield put({
          type: 'save',
          payload: {
            companyExpenditure: {
              months: res.months,
            },
          },
        });
      }
    },
    *fetchRevenue({ payload }, { call, put }) {
      const res = yield call(queryRevenue, payload);
      if (res.errorcode === 0) {
        yield put({
          type: 'save',
          payload: {
            revenue: {
              left: res.left,
            },
          },
        });
      }
    },
    *submitTeacherBillForm({ payload }, { call, put }) {
      const params = {
        teacherid: parseInt(payload.teacherid, 10),
        date: payload.date.format('YYYY-MM-DD HH:mm:ss'),
        fee: Math.round(payload.fee * 1000),
        remark: payload.remark,
      };
      const res = yield call(submitTeacherBill, params);
      if (res.errorcode === 0) {
        yield put(routerRedux.push('/result/success'));
      } else {
        yield put(routerRedux.push('/result/fail'));
      }
    },
    *submitSuitExpenditureForm({ payload }, { call, put }) {
      const params = {
        suitid: parseInt(payload.suitid, 10),
        date: payload.date.format('YYYY-MM-DD HH:mm:ss'),
        num: payload.num,
        fee: Math.round(payload.fee * 1000),
        remark: payload.remark,
      };
      const res = yield call(submitSuitExpenditure, params);
      if (res.errorcode === 0) {
        yield put(routerRedux.push('/result/success'));
      } else {
        yield put(routerRedux.push('/result/fail'));
      }
    },
    *submitOtherExpenditureForm({ payload }, { call, put }) {
      const params = {
        date: payload.date.format('YYYY-MM-DD HH:mm:ss'),
        fee: Math.round(payload.fee * 1000),
        remark: payload.remark,
      };
      const res = yield call(submitOtherExpenditure, params);
      if (res.errorcode === 0) {
        yield put(routerRedux.push('/result/success'));
      } else {
        yield put(routerRedux.push('/result/fail'));
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
    saveWageExpenditure(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
