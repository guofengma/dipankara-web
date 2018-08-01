import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Table,
  Card,
  Divider,
  Icon,
  Input,
  Button,
  InputNumber,
  DatePicker,
  Row,
  Col,
  Select,
} from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const { Description } = DescriptionList;
const { Option } = Select;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: 'Expenditure',
    dataIndex: 'expenditure',
    key: 'expenditure',
  },
  {
    title: 'Remark',
    dataIndex: 'remark',
    key: 'remark',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="">Action 一 {record.name}</a>
        <Divider type="vertical" />
        <a href="">Delete</a>
        <Divider type="vertical" />
        <a href="" className="ant-dropdown-link">
          More actions <Icon type="down" />
        </a>
      </span>
    ),
  },
];

@connect(({ bill, loading }) => ({
  loading: loading.effects['bill/fetchWageExpenditure'],
  submitting: loading.effects['bill/submitTeacherBillForm'],
  wageExpenditure: bill.wageExpenditure,
}))
@Form.create()
export default class WageExpenditure extends PureComponent {
  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'bill/fetchWageExpenditure',
    // });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'bill/submitTeacherBillForm',
          payload: values,
        });
      }
    });
  };

  handleSearch(e) {
    console.log(e, this);
  }

  renderTeacherBillForm() {
    const { submitting } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
        <FormItem {...formItemLayout} label="老师姓名">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入老师姓名',
              },
            ],
          })(<Input placeholder="老师姓名" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="日期">
          {getFieldDecorator('date', {
            rules: [
              {
                required: true,
                message: '选择日期',
              },
            ],
          })(<DatePicker style={{ width: '100%' }} placeholder="日期" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="工资">
          {getFieldDecorator('fee', {
            rules: [
              {
                required: true,
                message: '请输入工资',
              },
            ],
          })(<InputNumber style={{ width: '100%' }} placeholder="工资" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="备注">
          {getFieldDecorator('remark', {
            rules: [
              {
                required: true,
                message: '请输入备注',
              },
            ],
          })(<Input placeholder="备注" />)}
        </FormItem>
        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
          <Button type="primary" htmlType="submit" loading={submitting}>
            提交
          </Button>
        </FormItem>
      </Form>
    );
  }

  renderSimpleForm() {
    // const { wageExpenditure } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="日期">
              {getFieldDecorator('duration')(<RangePicker placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="教师">
              {getFieldDecorator('teacherid')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { wageExpenditure, loading } = this.props;
    return (
      <PageHeaderLayout title="教师支出" content="加入把所有报名的信息参加到。">
        <Card bordered={false}>
          <Card title="添加工资支出" className={styles.card} bordered={false}>
            <div>{this.renderTeacherBillForm()}</div>
          </Card>
          <Card title="查询工资支出" className={styles.card} bordered={false}>
            <div style={{ margin: 8 }}>{this.renderSimpleForm()}</div>
            <DescriptionList size="large" title="工资支出概览" style={{ marginBottom: 32 }}>
              <Description term="总支出">{wageExpenditure.outline.sum}</Description>
              <Description term="此月支出">{wageExpenditure.outline.cm}</Description>
            </DescriptionList>
            <Table columns={columns} dataSource={wageExpenditure.data} loading={loading} />
          </Card>
        </Card>
      </PageHeaderLayout>
    );
  }
}
