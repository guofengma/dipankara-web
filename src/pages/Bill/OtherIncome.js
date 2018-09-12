import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Card,
  Table,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import styles from './style.less';
// import TableForm from './TableForm';

@connect(({ bill, loading }) => ({
  otherIncome: bill.otherIncome,
  loading: loading.effects['bill/fetchOtherIncome'],
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
    const { otherIncome, loading } = this.props;
    const dataSource = otherIncome.months;
    const columns = [{
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '额度',
        dataIndex: 'fee',
        key: 'fee',
      }, {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
      }];

    return (
      <PageHeaderLayout title="其他收入" content="其他收入概览">
        <Card bordered={false}>
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            loading={loading}
            dataSource={dataSource}
            columns={columns}
            rowKey="name"
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}
