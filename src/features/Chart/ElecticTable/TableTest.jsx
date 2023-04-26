import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import '../utils/flashAnimate.css'
import socket from '../utils/socket';

const TableTest = () => {
    const {dataTableDetail} = useSelector(state => state.chart )
    console.log(dataTableDetail.data)
    const [oldData, setOldData] = useState()
    const [newData, setNewData] = useState()
    useEffect(()=> {
        socket.on("listen-chi-so-trong-nuoc", (newData) => {
            console.log(newData)
            setNewData(newData)
          });
    })
    const columns = [
        {
            title: 'Chỉ số',
            dataIndex: 'ticker',
        },
        {
            title: 'Điểm',
            dataIndex: 'price',
            render: (text, item) => {
                return (item.price > 0 ? <p className='flashUp'>{item.price}</p>:<p className='flashDown'>{item.price}</p>)
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
            <Table  columns={columns} dataSource={data} pagination={false}   />;
        </div>
    )
}

export default TableTest