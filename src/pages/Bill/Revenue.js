import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Card, Divider } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import styles from './style.less';
// import TableForm from './TableForm';

// const FormItem = Form.Item;
// const { Option } = Select;
// const { RangePicker } = DatePicker;
// const { TextArea } = Input;
const { Description } = DescriptionList;

@connect(({ bill, loading }) => ({
  revenue: bill.revenue,
  loading: loading.effects['bill/fetchRevenue'],
}))
@Form.create()
class Revenue extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'bill/fetchRevenue',
    });
  }

  render() {
    const { revenue } = this.props;

    // 数据源
    const data = [
      { genre: 'Sports', sold: 275, income: 2300 },
      { genre: 'Strategy', sold: 115, income: 667 },
      { genre: 'Action', sold: 120, income: 982 },
      { genre: 'Shooter', sold: 350, income: 5271 },
      { genre: 'Other', sold: 150, income: 3710 },
    ];

    // 定义度量
    const cols = {
      sold: { alias: '销售量' },
      genre: { alias: '游戏种类' },
    };

    return (
      <PageHeaderWrapper title="总营收" content="营收效果图">
        <Card bordered={false}>
          <DescriptionList size="large" title="结余" style={{ marginBottom: 32 }}>
            <Description term="剩余资金">{revenue.left}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <Chart width={600} height={400} data={data} scale={cols}>
            <Axis name="genre" />
            <Axis name="sold" />
            <Legend position="top" dy={-20} />
            <Tooltip />
            <Geom type="interval" position="genre*sold" color="genre" />
          </Chart>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Revenue;
