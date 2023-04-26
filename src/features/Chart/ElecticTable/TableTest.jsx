import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import socket from '../utils/socket';
import '../utils/ElectricTable.css'

const TableTest = () => {
    const { dataTableDetail } = useSelector(state => state.chart)
    const [oldData, setOldData] = useState()
    const [newData, setNewData] = useState()

    useEffect(() => {
        socket.on("listen-chi-so-trong-nuoc", (newData) => {
            setNewData(newData)
            console.log(newData)
        })
    },[])
    const columns = [
        {
            title: 'Chỉ số',
            dataIndex: 'ticker',
        },
        {
            title: 'Điểm',
            dataIndex: 'price',
            render: (text, item) => {
                return <p className=''>{item.price}</p>
            },
            sorter: {
                compare: (a, b) => a.chinese - b.chinese,
                multiple: 3,
            },
        },
        {
            title: 'Thay đổi (điểm)',
            dataIndex: 'change_price',
            sorter: {
                compare: (a, b) => a.math - b.math,
                multiple: 2,
            },
        },
        {
            title: 'Thay đổi (%)',
            dataIndex: 'percent_d',
            sorter: {
                compare: (a, b) => a.english - b.english,
                multiple: 1,
            },
        },
    ];
    const data = dataTableDetail.data
    return (
        <div>
            <Table columns={columns} dataSource={data} pagination={false} bordered={true} />
        </div>
    )
}

export default TableTest