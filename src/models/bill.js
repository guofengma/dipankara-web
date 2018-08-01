// import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {
  fakeSubmitForm,
  queryTeacherList,
  queryTuitionIncome,
  queryInvestIncome,
  queryWageExpenditure,
  submitStudentEnroll,
  submitTeacherBill,
} from '../services/api';

export default {
  namespace: 'bill',

  state: {
    teacherList: [],
    tuitionIncome: {
      sum: 0,
      cm: 0,
    },
    investIncome: {
      sum: 0,
      cm: 0,
    },
    otherIncome: {
      data: [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
      ],
    },
    wageExpenditure: {
      outline: {
        sum: 0,
        cm: 0,
      },
      data: [
        {
          key: '1',
          name: 'John Brown',
          expenditure: 32,
        },
        {
          key: '2',
          name: 'Jim Green',
          expenditure: 42,
        },
        {
          key: '3',
          name: 'Joe Black',
          expenditure: 32,
        },
      ],
    },
    otherExpenditure: {
      tableData: [
        {
          key: '1',
          workId: '00001',
          name: 'John Brown',
          department: 'New York No. 1 Lake Park',
        },
        {
          key: '2',
          workId: '00002',
          name: 'Jim Green',
          department: 'London No. 1 Lake Park',
        },
        {
          key: '3',
          workId: '00003',
          name: 'Joe Black',
          department: 'Sidney No. 1 Lake Park',
        },
      ],
    },
  },

  effects: {
    *fetchTeacherList({ payload }, { call, put }) {
      const res = yield call(queryTeacherList, payload);
      if (res.errorcode === 0) {
        yield put({
          type: 'save',
          payload: {
            tuitionIncome: {
              sum: res.sum,
              cm: res.cm,
            },
          },
        });
      }
    },
    *fetchTuitionIncome({ payload }, { call, put }) {
      const res = yield call(queryTuitionIncome, payload);
      if (res.errorcode === 0) {
        yield put({
          type: 'save',
          payload: {
            tuitionIncome: {
              sum: res.sum,
              cm: res.cm,
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
              sum: res.sum,
              cm: res.cm,
            },
          },
        });
      }
    },
    *fetchOtherIncome({ payload }, { call, put }) {
      const res = yield call(queryInvestIncome, payload);
      if (res.errorcode === 0) {
        yield put({
          type: 'save',
          payload: {
            investIncome: {
              sum: res.sum,
              cm: res.cm,
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
            investIncome: {
              sum: res.sum,
              cm: res.cm,
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
