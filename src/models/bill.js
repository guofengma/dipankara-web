// import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {
  queryTuitionIncome,
  queryInvestIncome,
  queryOtherIncome,
  queryWageExpenditure,
  querySuitExpenditure,
  queryOtherExpenditure,
  submitStudentEnroll,
  submitTeacherBill,
} from '../services/api';
import { EMLINK } from 'constants';

export default {
  namespace: 'bill',

  state: {
    tuitionIncome: {
      months: [
        {
          key: '1',
          name: '7月份',
          fee: 32,
        }, {
          key: '2',
          name: '8月份',
          fee: 32,
        }, {
          key: '3',
          name: '总计',
          fee: 42,
      }],
    },
    investIncome: {
      months: [
        {
          key: '1',
          name: '7月份',
          fee: 32,
        }, {
          key: '2',
          name: '8月份',
          fee: 32,
        }, {
          key: '3',
          name: '总计',
          fee: 42,
      }],
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
        }, {
          key: '2',
          name: '8月份',
          fee: 32,
          remark: '潜在',
        }, {
          key: '3',
          name: '总计',
          fee: 42,
          remark: '潜在',
      }],
    },
    wageExpenditure: {
      months: [
        {
          key: '1',
          name: '7月份',
          fee: 32,
          remark: '潜在',
        }, {
          key: '2',
          name: '8月份',
          fee: 32,
          remark: '潜在',
        }, {
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
        }, {
          key: '2',
          name: '8月份',
          fee: 32,
          remark: '潜在',
        }, {
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
        }, {
          key: '2',
          name: '8月份',
          fee: 32,
          remark: '潜在',
        }, {
          key: '3',
          name: '总计',
          fee: 42,
          remark: '潜在',
        },
      ],
    },
  },

  effects: {
    *fetchTuitionIncome({ payload }, { call, put }) {
      const res = yield call(queryTuitionIncome, payload);
      if (res.errorcode === 0) {
        let sum = 0;
        const months = [];
        res.months.forEach(element => {
          const e = element;
          e.fee /= 1000;
          sum += element.fee;
          months.push(e);
        });
        const last = {
          key: '13',
          name: '总计',
          fee: sum,
        };
        months.push(last);
        yield put({
          type: 'save',
          payload: {
            tuitionIncome: {
              months,
            },
          },
        });
      }
    },
    *fetchInvestIncome({ payload }, { call, put }) {
      const res = yield call(queryInvestIncome, payload);
      if (res.errorcode === 0) {
        let sum = 0;
        const months = [];
        res.months.forEach(element => {
          const e = element;
          e.fee /= 1000;
          sum += element.fee;
          months.push(e);
        });
        const last = {
          key: '13',
          name: '总计',
          fee: sum,
        };
        months.push(last);
        yield put({
          type: 'save',
          payload: {
            investIncome: {
              months,
            },
          },
        });
      }
    },
    *fetchOtherIncome({ payload }, { call, put }) {
      const res = yield call(queryOtherIncome, payload);
      if (res.errorcode === 0) {
        let sum = 0;
        const months = [];
        res.months.forEach(element => {
          const e = element;
          e.fee /= 1000;
          sum += element.fee;
          months.push(e);
        });
        const last = {
          key: '13',
          name: '总计',
          fee: sum,
        };
        months.push(last);
        yield put({
          type: 'save',
          payload: {
            otherIncome: {
              months,
            },
          },
        });
      }
    },
    *fetchWageExpenditure({ payload }, { call, put }) {
      const res = yield call(queryWageExpenditure, payload);
      if (res.errorcode === 0) {
        let sum = 0;
        const months = [];
        res.months.forEach(element => {
          const e = element;
          e.fee /= 1000;
          sum += element.fee;
          months.push(e);
        });
        const last = {
          key: '13',
          name: '总计',
          fee: sum,
        };
        months.push(last);
        yield put({
          type: 'save',
          payload: {
            wageExpenditure: {
              months,
            },
          },
        });
      }
    },
    *fetchSuitExpenditure({ payload }, { call, put }) {
      const res = yield call(querySuitExpenditure, payload);
      if (res.errorcode === 0) {
        let sum = 0;
        const months = [];
        res.months.forEach(element => {
          const e = element;
          e.fee /= 1000;
          sum += element.fee;
          months.push(e);
        });
        const last = {
          key: '13',
          name: '总计',
          fee: sum,
        };
        months.push(last);
        yield put({
          type: 'save',
          payload: {
            suitExpenditure: {
              months,
            },
          },
        });
      }
    },
    *fetchOtherExpenditure({ payload }, { call, put }) {
      const res = yield call(queryOtherExpenditure, payload);
      if (res.errorcode === 0) {
        let sum = 0;
        const months = [];
        res.months.forEach(element => {
          const e = element;
          e.fee /= 1000;
          sum += element.fee;
          months.push(e);
        });
        const last = {
          key: '13',
          name: '总计',
          fee: sum,
        };
        months.push(last);
        yield put({
          type: 'save',
          payload: {
            otherExpenditure: {
              months,
            },
          },
        });
      }
    },
    *submitEnrollForm({ payload }, { call }) {
      yield call(submitStudentEnroll, payload);
      message.success('提交成功');
    },
    *submitTeacherBillForm({ payload }, { call }) {
      const params = {
        name: payload.name,
        date: payload.date.format('YYYY-MM-DD'),
        fee: payload.fee,
        remark: payload.remark,
      };
      const res = yield call(submitTeacherBill, params);
      if (res.errorcode === 0) {
        message.success('成功');
      } else {
        message.error('失败');
      }
      // yield put({
      //   type: 'saveStepFormData',
      //   payload,
      // });
      // yield put(routerRedux.push('/form/step-form/result'));
    },
    *submitTeacherForm({ payload }, { call }) {
      const params = {
        name: payload.name,
        date: payload.date.format('YYYY-MM-DD'),
        fee: payload.fee,
        remark: payload.remark,
      };
      const res = yield call(submitTeacherBill, params);
      if (res.errorcode === 0) {
        message.success('成功');
      } else {
        message.error('失败');
      }
      // yield put({
      //   type: 'saveStepFormData',
      //   payload,
      // });
      // yield put(routerRedux.push('/form/step-form/result'));
    },
    *submitAdvancedForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
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
