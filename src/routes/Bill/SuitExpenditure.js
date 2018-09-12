import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Table,
  Card,
  Input,
  Button,
  InputNumber,
  DatePicker,
  Row,
  Col,
  Select,
} from 'antd';
// import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

// const { Description } = DescriptionList;
const { Option } = Select;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

@connect(({ bill, loading }) => ({
  loading: loading.effects['bill/fetchSuitExpenditure'],
  suitExpenditure: bill.suitExpenditure,
}))
@Form.create()
export default class SuitExpenditure extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'bill/fetchSuitExpenditure',
    });
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
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'bill/submitTeacherForm',
          payload: values,
        });
      }
    });
  }

  handleFormReset(e) {
  }

  renderSuitBillForm() {
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
        <FormItem {...formItemLayout} label="套件">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入老师姓名',
              },
            ],
          })(
            <Select placeholder="请选择" style={{ width: '100%' }}>
              <Option key="1">5岁套件</Option>
              <Option key="1">7岁套件</Option>
              <Option key="1">9岁套件</Option>
              <Option key="1">11岁套件</Option>
            </Select>
          )}
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

  renderSearchForm() {
    const { wageExpenditure, teachers } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="教师">
              {getFieldDecorator('teacherid')(
                <Select placeholder="请选择" style={{ width: 200 }}>
                  {
                    teachers.map((e) => {
                      return (<Option key={e.value} value={e.value}>{e.name}</Option>);
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="日期">
              {getFieldDecorator('duration')(<RangePicker placeholder="请输入" />)}
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
    const { suitExpenditure, loading } = this.props;
    const dataSource = suitExpenditure.months;
    const columns = [{
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '额度',
        dataIndex: 'fee',
        key: 'fee',
    }];
    return (
      <PageHeaderLayout title="套件支出" content="所有套件支出列表。">
        <Card bordered={false}>
          <Card title="添加套件支出" className={styles.card} bordered={false}>
            <div>{this.renderSuitBillForm()}</div>
          </Card>
          <Card title="查询套件支出" className={styles.card} bordered={false}>
            <Table
              style={{ marginBottom: 24 }}
              loading={loading}
              dataSource={dataSource}
              columns={columns}
              rowKey="name"
            />
          </Card>
        </Card>
      </PageHeaderLayout>
    );
  }
}
