import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, DatePicker, Select, Button, Card, Table, Col, Row, InputNumber } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
// const { RangePicker } = DatePicker;
// const { TextArea } = Input;

@connect(({ loading, bill }) => ({
  loading: loading.effects['bill/fetchOtherExpenditure'],
  submittingOther: loading.effects['bill/submitOtherExpenditureForm'],
  submittingSearch: loading.effects['bill/submitOtherExpenditureSearchForm'],
  otherExpenditure: bill.otherExpenditure,
}))
@Form.create()
class OtherExpenditure extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'bill/fetchOtherExpenditure',
    });
  }

  handleSubmitExpenditure = e => {
    const { form, dispatch } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'bill/submitOtherExpenditureForm',
          payload: values,
        });
      }
    });
  };

  handleSearch = e => {
    const { form, dispatch } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'bill/submitOtherExpenditureSearchForm',
          payload: values,
        });
      }
    });
  };

  // handleFormReset() {
  //   console.log(this.props);
  //   // const { form } = this.props;
  //   // form.resetFields();
  // }

  renderExpenditureForm() {
    const { submittingOther, form } = this.props;
    const { getFieldDecorator } = form;

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
              <Form.Item label="日期">
                {getFieldDecorator('date', {
                  rules: [{ required: true, message: '请选择日期' }],
                })(<DatePicker style={{ width: '100%' }} placeholder="日期" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label="费用">
                {getFieldDecorator('fee', {
                  rules: [{ required: true, message: '请输入金额' }],
                })(<InputNumber placeholder="请输入" style={{ width: '100%' }} />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item label="备注">
                {getFieldDecorator('remark', {
                  rules: [{ required: true, message: '请输入备注' }],
                })(<Input placeholder="请输入" style={{ width: '100%' }} />)}
              </Form.Item>
            </Col>
          </Row>
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={submittingOther}>
              提交
            </Button>
            {/* <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button> */}
          </FormItem>
        </Form>
      </Card>
    );
  }

  renderSearchForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="月份">
              {getFieldDecorator('month')(
                <Select placeholder="请选择" style={{ width: 200 }}>
                  <Option value="1">1月份</Option>
                  <Option value="2">2月份</Option>
                  <Option value="3">3月份</Option>
                  <Option value="4">4月份</Option>
                  <Option value="5">5月份</Option>
                  <Option value="6">6月份</Option>
                  <Option value="7">7月份</Option>
                  <Option value="8">8月份</Option>
                  <Option value="9">9月份</Option>
                  <Option value="10">10月份</Option>
                  <Option value="11">11月份</Option>
                  <Option value="12">12月份</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            {/* <FormItem label="月份">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: 200 }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem> */}
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
    const { otherExpenditure, loading } = this.props;
    const dataSource = otherExpenditure.months;
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '额度',
        dataIndex: 'fee',
        key: 'fee',
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
      },
    ];

    return (
      <PageHeaderWrapper title="其他支出" content="详细介绍其他支出数据">
        <Card bordered={false}>
          <div>{this.renderExpenditureForm()}</div>
          <Card title="开销列表" bordered={false}>
            <div>{this.renderSearchForm()}</div>
            <Table
              styles={{ marginTop: 20 }}
              loading={loading}
              columns={columns}
              dataSource={dataSource}
            />
          </Card>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default OtherExpenditure;
