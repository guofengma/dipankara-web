import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, TimePicker, Select, Button, Card, Table, Col, Row } from 'antd';
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

@connect(({ loading, student }) => ({
  submitting: loading.effects['student/submitEnrollForm'],
  query: student.query,
}))
@Form.create()
export default class Query extends PureComponent {
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

  render() {
    const { submitting, query } = this.props;
    const { getFieldDecorator } = this.props.form;

    // const formItemLayout = {
    //   labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 7 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 12 },
    //     md: { span: 10 },
    //   },
    // };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        filters: [
          {
            text: 'Joe',
            value: 'Joe',
          },
          {
            text: 'Jim',
            value: 'Jim',
          },
          {
            text: 'Submenu',
            value: 'Submenu',
            children: [
              {
                text: 'Green',
                value: 'Green',
              },
              {
                text: 'Black',
                value: 'Black',
              },
            ],
          },
        ],
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name.length - b.name.length,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: 'Address',
        dataIndex: 'address',
        filters: [
          {
            text: 'London',
            value: 'London',
          },
          {
            text: 'New York',
            value: 'New York',
          },
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.address.indexOf(value) === 0,
        sorter: (a, b) => a.address.length - b.address.length,
      },
    ];

    return (
      <PageHeaderLayout title="学生查询" content="加入把所有报名的信息参加到。">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <Card title="责任人" className={styles.card} bordered={false}>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.name2}>
                    {getFieldDecorator('name2', {
                      rules: [{ required: true, message: '请输入' }],
                    })(<Input placeholder="请输入" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.url2}>
                    {getFieldDecorator('url2', {
                      rules: [{ required: true, message: '请选择' }],
                    })(<Input placeholder="请输入" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label={fieldLabels.owner2}>
                    {getFieldDecorator('owner2', {
                      rules: [{ required: true, message: '请选择管理员' }],
                    })(
                      <Select placeholder="请选择管理员">
                        <Option value="xiao">付晓晓</Option>
                        <Option value="mao">周毛毛</Option>
                      </Select>
                    )}
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
                      <TimePicker
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
            </Card>
            <Card title="成员管理" bordered={false}>
              <Table columns={columns} dataSource={query.tableData} />
            </Card>
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
