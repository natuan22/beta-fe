import { Table } from 'antd';
import { useSelector } from 'react-redux';

const TableDetail = () => {
  const dataTable = useSelector(state => state.chart.dataTableDetail);

  if (!Array.isArray(dataTable)) {
    return null; // Return null if dataTable is not an array
  }
  const columns = [
    {
      title: 'Chỉ số',
      dataIndex: 'ticker',
      style: { background: '#000' },
      render: (text) => {
        return <span className='font-bold' >{text}</span>;
      },
    },
    {
      title: 'Điểm',
      dataIndex: 'close_price',
      sorter: {
        compare: (a, b) => a.close_price - b.close_price,
        multiple: 2,
      },
    },
    {
      title: 'Thay đổi (điểm)',
      dataIndex: 'change_price',
      sorter: {
        compare: (a, b) => a.change_price - b.change_price,
        multiple: 3,
      },

    },
    {
      title: 'Thay đổi (%)',
      dataIndex: 'percent_d',
      sorter: {
        compare: (a, b) => a.percent_d - b.percent_d,
        multiple: 4,
      },
      render: (text, record) => {
        const color = record.percent_d < 0 ? 'red' : 'green';
        return <span className='font-semibold' style={{ color }}>{text}%</span>;
      },
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div  >
      <Table columns={columns} dataSource={dataTable} onChange={onChange} />
    </div>
  );
};

export default TableDetail;