import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'antd';

const GeneralIndustry = () => {
  const dataGeneral = useSelector(state => state.chart.dataGeneral);
  if (!Array.isArray(dataGeneral)) return null;

  const columns = [
    {
      title: 'Phân ngành',
      dataIndex: 'vietnameseName',
      reder: (text) => {
        <span className='font-bold'>{text}</span>
      }
    },
    {
      title: '%D',
      dataIndex: 'PerChange1D',
      sorter: {
        compare: (a, b) => a.PerChange1D - b.PerChange1D,
        multiple: 3,
      },
    },
    {
      title: '%W',
      dataIndex: 'PerChange1M',
      sorter: {
        compare: (a, b) => a.PerChange1M - b.PerChange1M,
        multiple: 2,
      },
    },
    {
      title: '%M',
      dataIndex: 'PerChange1Y',
      sorter: {
        compare: (a, b) => a.PerChange1Y - b.PerChange1Y,
        multiple: 1,
      },
    },
    {
      title: 'Độ rộng ngành',
      dataIndex: 'width',
    },
  ];

  const data = dataGeneral.map((item, index) => {
    return {
      key: index,
      vietnameseName: item.vietnameseName,
      PerChange1D: item.PerChange1D,
      PerChange1M: item.PerChange1M,
      PerChange1Y: item.PerChange1Y,
      width: 'thanh mô tả',
    };
  });

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
};

export default GeneralIndustry;
