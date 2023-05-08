import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import socket from '../utils/socket';
import '../utils/ElectricTable.css'

const TableTest = () => {
    const { dataTableDetail } = useSelector(state => state.chart)
    const [oldData, setOldData] = useState()
    const [newData, setNewData] = useState()
    const data = dataTableDetail.data

    useEffect(() => {
        socket.on("listen-chi-so-trong-nuoc", (newData) => {
        })
    },[])
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

            <Table columns={columns} dataSource={data} pagination={false} bordered={true} />

        </div>
    )
}

export default TableTest