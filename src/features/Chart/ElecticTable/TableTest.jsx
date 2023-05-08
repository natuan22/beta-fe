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
        })
    }, [])
    const columns = [

        {
            title: 'Chỉ số',
            dataIndex: 'comGroupCode',
        },
        {
            title: 'Điểm',
            dataIndex: 'indexValue',
            render: (text, item) => {

                return <p className=''>{item.indexValue}</p>

            },
            sorter: {
                compare: (a, b) => a.chinese - b.chinese,
                multiple: 3,
            },
        },
        {
            title: 'Thay đổi (điểm)',
            dataIndex: 'indexChange',
            sorter: {
                compare: (a, b) => a.math - b.math,
                multiple: 2,
            },
        },
        {
            title: 'Thay đổi (%)',
            dataIndex: 'percentIndexChange',
            sorter: {
                compare: (a, b) => a.english - b.english,
                multiple: 1,
            },
        },
    ];
    const data = dataTableDetail.data
    return (
        <div>
            <Table
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                columns={columns} 
                dataSource={data} 
                pagination={false} 
                bordered={true} />
        </div>
    )
}

export default TableTest