import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, DatePicker, Select, Button, Card, Icon, Tooltip } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
// const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading, student }) => ({
  submitting: loading.effects['student/submitEnrollForm'],
  student,
}))
@Form.create()
export default class Enroll extends PureComponent {
  handleSubmit = e => {
    const { dispatch } = this.props;
    const { validateFieldsAndScroll } = this.props.form;

    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'student/submitEnrollForm',
          payload: values,
        });
      }
    });
  };

  render() {
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
      <PageHeaderLayout title="学生报名" content="加入学生报名信息">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="姓名">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入学生姓名',
                  },
                ],
              })(<Input placeholder="学生姓名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="联系方式">
              {getFieldDecorator('mobile', {
                rules: [
                  {
                    required: true,
                    message: '请填写联系方式',
                  },
                ],
              })(<Input placeholder="联系方式" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="生日">
              {getFieldDecorator('birthday', {
                rules: [
                  {
                    required: true,
                    message: '请选择出生日期',
                  },
                ],
              })(<DatePicker style={{ width: '100%' }} placeholder="生日" />)}
            </FormItem>
            {/* 选择校区 */}
            <FormItem {...formItemLayout} label="校区">
              {getFieldDecorator('campusid')(
                <Select mode="multiple" placeholder="校区">
                  <Option value="1">茂业</Option>
                  <Option value="2">西科大</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="兴趣描述">
              {getFieldDecorator('goal', {
                rules: [
                  {
                    required: false,
                    message: '请输入兴趣描述',
                  },
                ],
              })(<TextArea style={{ minHeight: 32 }} placeholder="请输入兴趣描述" rows={4} />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  备注
                  <em className={styles.optional}>
                    （选填）
                    <Tooltip title="备注信息">
                      <Icon type="info-circle-o" style={{ marginRight: 4 }} />
                    </Tooltip>
                  </em>
                </span>
              }
            >
              {getFieldDecorator('remark')(<Input placeholder="备注一些事情" />)}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
