import { Table } from 'antd';
import { useSelector } from 'react-redux';

const RateDetail = () => {
  const dataRateDetail = useSelector(state => state.chart.dataRateDetail)
  console.log(dataRateDetail)

  const dataSource = dataRateDetail || [];

  const columns = [
    {
      title: 'Tỷ giá',
      dataIndex: 'name',
    },
    {
      title: 'Giá trị',
      dataIndex: 'price',
    },
    {
      title: 'Thay đổi',
      dataIndex: 'MTD',
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  )
}

export default RateDetail;