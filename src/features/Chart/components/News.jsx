import { Table } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';

const News = () => {
    const dataNews = useSelector((state) => state.chart.dataNews.recordset);

    const columns = [
        {
            title: 'Mã chứng khoán',
            dataIndex: 'ticker',
            style: { background: '#000' },
            render: (text) => {
                return <span className='font-bold' >{text}</span>;
            },
        },
        {
            title: 'Loại sự kiện',
            dataIndex: 'LoaiSuKien',
        },
        {
            title: 'Ngày',
            dataIndex: 'NgayDKCC',
            sorter: {
                compare: (a, b) => new Date(a.NgayDKCC) - new Date(b.NgayDKCC),
            },
            render: (text) => {
                return <span>{formatDate(new Date(Date.parse(text)))}</span>;
            },

        },
        {
            title: 'Nội dung sự kiện',
            dataIndex: 'NoiDungSuKien',
        },
    ];

    return (
        <>
            <Table pagination={{ showSizeChanger: false, defaultPageSize: 6, }} columns={columns} dataSource={dataNews} />
        </>
    )
}

export default News

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('/');
}

