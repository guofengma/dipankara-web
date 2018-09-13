import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Divider, Table } from 'antd';
// import DescriptionList from 'components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import styles from './BasicProfile.less';

// const { Description } = DescriptionList;

@connect(({ bill, loading }) => ({
  investIncome: bill.investIncome,
  loading: loading.effects['bill/fetchInvestIncome'],
}))
class InvestIncome extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'bill/fetchInvestIncome',
    });
  }

  render() {
    const { investIncome, loading } = this.props;
    const dataSource = investIncome.months;
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
    ];

    return (
      <PageHeaderWrapper title="投资收入">
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
      </PageHeaderWrapper>
    );
  }
}

export default InvestIncome;
