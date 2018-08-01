import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Card,
  List,
  // InputNumber,
  // Radio,
  // Icon,
  // Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import styles from './style.less';
// import TableForm from './TableForm';

@connect(({ bill, loading }) => ({
  otherIncome: bill.otherIncome,
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class OtherIncome extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'bill/fetchOtherIncome',
    });
  }

  render() {
    const { otherIncome } = this.props;
    // const { getFieldDecorator, getFieldValue } = this.props.form;

    return (
      <PageHeaderLayout title="其他收入" content="其他收入概览">
        <Card title="收入列表" bordered={false}>
          <List
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={otherIncome.data}
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}
