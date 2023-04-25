import React from 'react'
import { Table } from 'antd';
import { useSelector } from 'react-redux';


const TableTest = () => {
    const {dataTableDetail} = useSelector(state => state.chart )
    // console.log(dataTableDetail.data)
    const columns = [
        {
            title: 'Chỉ số',
            dataIndex: 'ticker',
        },
        {
            title: 'Điểm',
            dataIndex: 'price',
            render: (text, item) => {

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
            <Table  columns={columns} dataSource={data} pagination={false} bordered={true}  />;
        </div>
    )
}

export default TableTest