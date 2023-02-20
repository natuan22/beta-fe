import { Table } from 'antd';
import { useSelector } from 'react-redux';

const GoodsDetail = () => {
  const dataGoodsDetail = useSelector(state => state.chart.dataGoodsDetail);
  if (!Array.isArray(dataGoodsDetail)) {
    return null; // Return null if dataTable is not an array
  }
  const getCellStyle = (value) => {
    if (value < 0) {
      return { color: 'red' };
    }
    if (value > 0) {
      return { color: 'green' };
    }
    return {};
  }
  

  const columns = [
    {
      title: 'Hàng hóa',
      dataIndex: 'name',
      render: (text, record) => (
        <span className='font-bold '>{text}</span>
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      render: (text, record, index) => {
        const previousDayPrice = index === 0 ? null : dataGoodsDetail[index - 1]?.price;
        const percentChange = previousDayPrice ? ((text - previousDayPrice) / previousDayPrice) * 100 : 0;
        return (
          <span className='font-semibold' style={getCellStyle(percentChange)}>{text}</span>
        );
      },
   
    },
    {
      title: '% thay đổi',
      dataIndex: 'Day',
      render: (text, record, index) => {
        const previousDayPrice = index === 0 ? null : dataGoodsDetail[index - 1]?.price;
        const percentChange = previousDayPrice ? ((record.price - previousDayPrice) / previousDayPrice) * 100 : 0;
        return (
          <span className='font-semibold' style={getCellStyle(percentChange)}>{text}</span>
        );
      },
      
    },
  ];

  return (
    <Table pagination={{ pageSize: 4 }} columns={columns} dataSource={dataGoodsDetail} />
  );
};

export default GoodsDetail;
