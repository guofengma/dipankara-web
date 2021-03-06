export default {
  '/api/home': {
    target: 'http://127.0.0.1:7001',
    changeOrigin: true,
  },
  '/api/register': {
    target: 'http://127.0.0.1:7001',
    changeOrigin: true,
  },
  '/api/login/callback': {
    target: 'http://127.0.0.1:7001',
    changeOrigin: true,
  },
  '/api/login/account': {
    target: 'http://127.0.0.1:7001',
    changeOrigin: true,
  },
  '/api/currentUser': {
    target: 'http://127.0.0.1:7001',
    changeOrigin: true,
  },
  '/api/student/fetch': {
    target: 'http://127.0.0.1:7001',
    changeOrigin: true,
  },
  '/api/student/enroll': {
    target: 'http://127.0.0.1:7001',
    changeOrigin: true,
  },
  '/api/student/fetch_class_list': {
    target: 'http://127.0.0.1:7001',
    changeOrigin: true,
  },
  '^/api/student/fetch_class_students': {
    target: 'http://127.0.0.1:7001',
    changeOrigin: true,
  },
  '/api/teacher/fetch': {
    target: 'http://127.0.0.1:7001',
    changeOrigin: true,
  },
  '/api/bill/fetch_tuition_income': {
    target: 'http://127.0.0.1:7001',
    changeOrigin: true,
  },
  '/api/bill/fetch_invest_income': {
    target: 'http://127.0.0.1:7001',
    changeOrigin: true,
  },
  '/api/bill/fetch_other_income': {
    target: 'http://127.0.0.1:7001',
    changeOrigin: true,
  },
  '/api/bill/fetch_wage_expenditure': {
    target: 'http://127.0.0.1:7001',
    changeOrigin: true,
  },
  '/api/bill/fetch_suit_expenditure': {
    target: 'http://127.0.0.1:7001',
    changeOrigin: true,
  },
  '/api/bill/fetch_other_expenditure': {
    target: 'http://127.0.0.1:7001',
    changeOrigin: true,
  },
  '/api/bill/fetch_revenue': {
    target: 'http://127.0.0.1:7001',
    changeOrigin: true,
  },
  '/api/bill/create_wage_expenditure': {
    target: 'http://127.0.0.1:7001',
    changeOrigin: true,
  },
  '/api/bill/create_suit_expenditure': {
    target: 'http://127.0.0.1:7001',
    changeOrigin: true,
  },
  '/api/bill/create_other_expenditure': {
    target: 'http://127.0.0.1:7001',
    changeOrigin: true,
  },
  '/api/bill/fetch_company_expenditure': {
    target: 'http://127.0.0.1:7001',
    changeOrigin: true,
  },
};
