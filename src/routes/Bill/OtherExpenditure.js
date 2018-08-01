import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, DatePicker, Select, Button, Card, Table, Col, Row, InputNumber } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';
// import TableForm from './TableForm';

const FormItem = Form.Item;
const { Option } = Select;
// const { RangePicker } = DatePicker;
// const { TextArea } = Input;

const fieldLabels = {
  name2: '教师',
  url2: '任务描述',
  owner2: '执行人',
  approver2: '责任人',
  dateRange2: '生效日期',
  type2: '任务类型',
};

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '日期',
    dataIndex: 'expenditure',
    key: 'expenditure',
  },
  {
    title: '描述',
    dataIndex: 'disc',
    key: 'disc',
  },
  {
    title: '多少钱',
    dataIndex: 'fee',
    key: 'fee',
  },
];

@connect(({ loading, bill }) => ({
  submitting: loading.effects['form/submitRegularForm'],
  otherExpenditure: bill.otherExpenditure,
}))
@Form.create()
export default class OtherExpenditure extends PureComponent {
  handleSubmitExpenditure(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  }

  handleSearch(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  }

  handleFormReset() {
    console.log(this.props);
    // const { form } = this.props;
    // form.resetFields();
  }

  renderExpenditureForm() {
    const { submitting } = this.props;
    const { getFieldDecorator } = this.props.form;

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    return (
      <Card title="加入额外支出" className={styles.card} bordered={false}>
        <Form onSubmit={this.handleSubmitExpenditure} hideRequiredMark style={{ marginTop: 8 }}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label="名称">
                {getFieldDecorator('name2', {
                  rules: [{ required: true, message: '请输入' }],
                })(<Input placeholder="请输入" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label="描述">
                {getFieldDecorator('url2', {
                  rules: [{ required: true, message: '请选择' }],
                })(<Input placeholder="请输入" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item label="支出">
                {getFieldDecorator('url2', {
                  rules: [{ required: true, message: '请选择' }],
                })(<InputNumber placeholder="请输入" style={{ width: '100%' }} />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label={fieldLabels.approver2}>
                {getFieldDecorator('approver2', {
                  rules: [{ required: true, message: '请选择审批员' }],
                })(
                  <Select placeholder="请选择审批员">
                    <Option value="xiao">付晓晓</Option>
                    <Option value="mao">周毛毛</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label={fieldLabels.dateRange2}>
                {getFieldDecorator('dateRange2', {
                  rules: [{ required: true, message: '请输入' }],
                })(
                  <DatePicker
                    placeholder="提醒时间"
                    style={{ width: '100%' }}
                    getPopupContainer={trigger => trigger.parentNode}
                  />
                )}
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item label={fieldLabels.type2}>
                {getFieldDecorator('type2', {
                  rules: [{ required: true, message: '请选择仓库类型' }],
                })(
                  <Select placeholder="请选择仓库类型">
                    <Option value="private">私密</Option>
                    <Option value="public">公开</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              提交
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }

  renderSearchForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="规则编号">
              {getFieldDecorator('no')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
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
    const { otherExpenditure } = this.props;
    return (
      <PageHeaderLayout title="其他支出" content="详细介绍其他支出数据">
        <Card bordered={false}>
          <div>{this.renderExpenditureForm()}</div>
          <Card title="开销列表" bordered={false}>
            <div>{this.renderSearchForm()}</div>
            <Table
              styles={{ marginTop: 20 }}
              columns={columns}
              dataSource={otherExpenditure.tableData}
            />
          </Card>
        </Card>
      </PageHeaderLayout>
    );
  }
}