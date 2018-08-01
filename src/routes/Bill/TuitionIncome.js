import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Divider } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import styles from './BasicProfile.less';

const { Description } = DescriptionList;

// const progressColumns = [
//   {
//     title: '时间',
//     dataIndex: 'time',
//     key: 'time',
//   },
//   {
//     title: '当前进度',
//     dataIndex: 'rate',
//     key: 'rate',
//   },
//   {
//     title: '状态',
//     dataIndex: 'status',
//     key: 'status',
//     render: text =>
//       text === 'success' ? (
//         <Badge status="success" text="成功" />
//       ) : (
//         <Badge status="processing" text="进行中" />
//       ),
//   },
//   {
//     title: '操作员ID',
//     dataIndex: 'operator',
//     key: 'operator',
//   },
//   {
//     title: '耗时',
//     dataIndex: 'cost',
//     key: 'cost',
//   },
// ];

@connect(({ bill, loading }) => ({
  tuitionIncome: bill.tuitionIncome,
  loading: loading.effects['bill/fetchTuitionIncome'],
}))
export default class TuitionIncome extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'bill/fetchTuitionIncome',
    });
  }

  render() {
    const { tuitionIncome } = this.props;
    return (
      <PageHeaderLayout title="学费收入">
        <Card bordered={false}>
          <DescriptionList size="large" title="学费收入概览" style={{ marginBottom: 32 }}>
            <Description term="总收入">{tuitionIncome.sum}</Description>
            <Description term="此月收入">{tuitionIncome.cm}</Description>
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
