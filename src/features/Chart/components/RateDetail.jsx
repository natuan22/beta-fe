import { Table } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const RateDetail = () => {
  const dataRateDetail = useSelector(state => state.chart.dataRateDetail)
  console.log(dataRateDetail)

const [data = dataRateDetail || [], setData] = useState()

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
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default RateDetail;
