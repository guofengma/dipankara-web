import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Divider, Table } from 'antd';
// import DescriptionList from 'components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({ bill, loading }) => ({
  tuitionIncome: bill.tuitionIncome,
  loading: loading.effects['bill/fetchTuitionIncome'],
}))
class TuitionIncome extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'bill/fetchTuitionIncome',
    });
  }

  render() {
    const { tuitionIncome, loading } = this.props;
    const dataSource = tuitionIncome.months;
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
      <PageHeaderWrapper title="学费收入">
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

export default TuitionIncome;
