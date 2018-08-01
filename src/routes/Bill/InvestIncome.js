import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Divider } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import styles from './BasicProfile.less';

const { Description } = DescriptionList;

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
    const { investIncome } = this.props;
    return (
      <PageHeaderLayout title="投资收入">
        <Card bordered={false}>
          <DescriptionList size="large" title="投资收入概览" style={{ marginBottom: 32 }}>
            <Description term="总收入">{investIncome.sum}</Description>
            <Description term="此月收入">{investIncome.cm}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="用户信息" style={{ marginBottom: 32 }}>
            <Description term="用户姓名">付小小</Description>
            <Description term="联系电话">18100000000</Description>
            <Description term="常用快递">菜鸟仓储</Description>
            <Description term="取货地址">浙江省杭州市西湖区万塘路18号</Description>
            <Description term="备注">无</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          {/* <div className={styles.title}>退货商品</div>
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            loading={loading}
            dataSource={goodsData}
            columns={goodsColumns}
            rowKey="id"
          />
          <div className={styles.title}>退货进度</div>
          <Table
            style={{ marginBottom: 16 }}
            pagination={false}
            loading={loading}
            dataSource={basicProgress}
            columns={progressColumns}
          /> */}
        </Card>
      </PageHeaderLayout>
    );
  }
}
