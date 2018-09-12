import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Divider, Table } from 'antd';
// import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import styles from './BasicProfile.less';

// const { Description } = DescriptionList;

@connect(({ bill, loading }) => ({
  investIncome: bill.investIncome,
  loading: loading.effects['bill/fetchInvestIncome'],
}))
export default class InvestIncome extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'bill/fetchInvestIncome',
    });
  }

  render() {
    const { investIncome, loading } = this.props;
    const dataSource = investIncome.months;
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
      <PageHeaderLayout title="投资收入">
        <Card bordered={false}>
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            loading={loading}
            dataSource={dataSource}
            columns={columns}
            rowKey="name"
          />
          <Divider style={{ marginBottom: 32 }} />
        </Card>
      </PageHeaderLayout>
    );
  }
}
