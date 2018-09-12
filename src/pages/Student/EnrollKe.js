import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Button,
  Card,
  // Icon,
  // Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
// const { TextArea } = Input;

@connect(({ loading, student }) => ({
  submitting: loading.effects['student/submitRegularForm'],
  student,
}))
@Form.create()
export default class EnrollKe extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'student/submitEnrollForm',
          payload: values,
        });
      }
    });
  };

  renderEnrollKe() {
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
        <FormItem {...formItemLayout} label="姓名">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入标题',
              },
            ],
          })(<Input placeholder="学生姓名" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="日期">
          {getFieldDecorator('date', {
            rules: [
              {
                required: true,
                message: '请选择报课日期',
              },
            ],
          })(<DatePicker style={{ width: '100%' }} placeholder="日期" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="课程">
          {getFieldDecorator('course_kind_id')(
            <Select mode="multiple" placeholder="课程">
              <Option value="1">魔法科学</Option>
              <Option value="2">机器人</Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="节数">
          {getFieldDecorator('num', {
            rules: [
              {
                required: true,
                message: '请输入节数',
              },
            ],
          })(<InputNumber placeholder="节数" defaultValue="10" min="0" max="40" />)}
        </FormItem>
        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
          <Button type="primary" htmlType="submit" loading={submitting}>
            提交
          </Button>
        </FormItem>
      </Form>
    );
  }

  render() {
    return (
      <PageHeaderLayout title="学生报课" content="需要报课程">
        <Card bordered={false}>
          <div>{this.renderEnrollKe()}</div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
