import dayjs from 'dayjs'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataTransactionData } from '../../thunk';

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
                },
                {
                    title: 'Điểm',
                    dataIndex: 'change',
                },
            ],
        },
        {
            title: 'Giá đóng cửa',
            dataIndex: 'closePrice',
            align: 'center',
        },
        {
            title: 'Tổng KLGD',
            dataIndex: 'totalVol',
            align: 'center',
        },
        {
            title: 'Tổng GTGD',
            dataIndex: 'totalVal',
            align: 'center',
        },
        {
            title: 'Vốn hoá',
            dataIndex: 'vh',
            align: 'center',
        },
        {
            title: 'Khớp lệnh',
            children: [
                {
                    title: 'Khối lượng',
                    dataIndex: 'omVol',
                },
                {
                    title: 'Giá trị',
                    dataIndex: 'omVal',
                },
            ],
        },
        {
            title: 'Giá cao nhất',
            dataIndex: 'highPrice',
            align: 'center',
        },
        {
            title: 'Giá thấp nhất',
            dataIndex: 'lowPrice',
            align: 'center',
        },
    ]
    return (
        <div className='dark:text-white text-dark uppercase'>Transaction_Data</div>
    )
}

export default TransactionData