import { Table } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';

const Test = () => {
    const {dataTableDetail} = useSelector(state => state.chart)
    // console.log(dataTableDetail)
    const dataSource = [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
      ];
      
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
      ];
      
  return (
    <div>
        <Table dataSource={dataSource} columns={columns} />;
    </div>
  )
}

export default Test