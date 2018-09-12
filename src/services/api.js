import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

// 登录请求
export async function submitAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

// 老师模块
export async function queryTeacherList() {
  return request('/api/teacher/fetch');
}

// 学生模块
export async function queryStudents() {
  return request('/api/student/fetch');
}

export async function queryClassList() {
  return request('/api/student/fetch_class_list');
}

export async function queryClassStudents(params) {
  return request(`/api/student/fetch_class_students?${stringify(params)}`);
}

// 创建一个新学生
export async function submitStudentEnroll(params) {
  return request('/api/student/enroll', {
    method: 'POST',
    body: params,
  });
}

export async function submitTeacherBill(params) {
  return request('/api/bill/create_wage_expenditure', {
    method: 'POST',
    body: params,
  });
}

// 账单模块
export async function queryTuitionIncome() {
  return request('/api/bill/fetch_tuition_income');
}

export async function queryInvestIncome() {
  return request('/api/bill/fetch_invest_income');
}

export async function queryOtherIncome() {
  return request('/api/bill/fetch_other_income');
}

export async function queryWageExpenditure() {
  return request('/api/bill/fetch_wage_expenditure');
}

export async function querySuitExpenditure() {
  return request('/api/bill/fetch_suit_expenditure');
}

export async function queryOtherExpenditure() {
  return request('/api/bill/fetch_other_expenditure');
}

export async function queryRevenue() {
  return request('/api/bill/fetch_revenue');
}