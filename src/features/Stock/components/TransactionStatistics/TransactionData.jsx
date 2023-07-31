import { Table } from 'antd';
import dayjs from 'dayjs'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../Chart/utils/Loading';
import { getColor } from '../../../Chart/utils/utils';
import { fetchDataTransactionData } from '../../thunk';
import '../../utils/style/antDesigntableTransactionData.css'

const TransactionData = ({ stock, from, to }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([])
    const { dataTransactionData } = useSelector(state => state.stock)

    useEffect(() => {
        dispatch(fetchDataTransactionData(stock, dayjs(from).format('YYYY-MM-DD'), dayjs(to).format('YYYY-MM-DD')));
    }, [dispatch, stock, from, to]);

    useEffect(() => {
        if (dataTransactionData) {
            const dataWithKey = Array.isArray(dataTransactionData) && dataTransactionData?.map((item, index) => ({
                ...item,
                key: index
            }));
            setData(dataWithKey)
        }
    }, [dataTransactionData]);

    const columns = [
        {
            title: 'Ngày',
            dataIndex: 'date',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-center font-semibold`}>{moment(record.date).format('DD/MM/YYYY')}</p>;
            },
        },
        {
            title: 'Thay đổi',
            children: [
                {
                    title: '%',
                    dataIndex: 'perChange',
                    align: 'center',
                    render: (_, record) => {
                        return <p className={`${getColor(record.perChange)} text-center font-semibold`}>{record.perChange.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>;
                    },
                },
                {
                    title: 'Điểm',
                    dataIndex: 'change',
                    align: 'center',
                    render: (_, record) => {
                        return <p className={`${getColor(record.change)} text-center font-semibold`}>{record.change}</p>;
                    },
                },
            ],
        },
        {
            title: 'Giá đóng cửa',
            dataIndex: 'closePrice',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-center font-semibold`}>{record.closePrice}</p>;
            },
        },
        {
            title: 'Tổng KLGD',
            dataIndex: 'totalVol',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-center font-semibold`}>{record.totalVol.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>;
            },
        },
        {
            title: 'Tổng GTGD',
            dataIndex: 'totalVal',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-center font-semibold`}>{(record.totalVal / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>;
            },
        },
        {
            title: 'Vốn hoá',
            dataIndex: 'vh',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-center font-semibold`}>{(record.vh / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>;
            },
        },
        {
            title: 'Khớp lệnh',
            children: [
                {
                    title: 'Khối lượng',
                    dataIndex: 'omVol',
                    align: 'center',
                    render: (_, record) => {
                        return <p className={`dark:text-white text-black text-center font-semibold`}>{record.omVol.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>;
                    },
                },
                {
                    title: 'Giá trị',
                    dataIndex: 'omVal',
                    align: 'center',
                    render: (_, record) => {
                        return <p className={`dark:text-white text-black text-center font-semibold`}>{(record.omVal / 1000000000).toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>;
                    },
                },
            ],
        },
        {
            title: 'Giá cao nhất',
            dataIndex: 'highPrice',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-center font-semibold`}>{record.highPrice}</p>;
            },
        },
        {
            title: 'Giá thấp nhất',
            dataIndex: 'lowPrice',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-center font-semibold`}>{record.lowPrice}</p>;
            },
        },
    ]
    return (
        <div>
            {Array.isArray(data) ? (
                <div className='mt-4'>
                    <Table
                        scroll={{ x: 400 }}
                        rowClassName="pointer-events-none "
                        bordered={false}
                        columns={columns}
                        dataSource={data}
                        pagination={{ defaultPageSize: 6, showSizeChanger: false }}
                        className='table-transaction-data'
                    />
                </div>
            ) : (
                <div className="h-[300px] flex items-center justify-center"><Loading /></div>
            )}
        </div>
    )
}

export default TransactionData