import { Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../Chart/utils/Loading';
import { getColor } from '../../../Chart/utils/utils';
import { fetchDataTableTransactionStatistics } from '../../thunk';

const TableTransactionStatistics = ({ codeSearch }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([])
    const { dataTableTransactionStatistics } = useSelector(state => state.stock)
    console.log({
        dataTableTransactionStatistics
    })
    useEffect(() => {
        dispatch(fetchDataTableTransactionStatistics(codeSearch));
    }, [dispatch, codeSearch]);

    useEffect(() => {
        if (dataTableTransactionStatistics) {
            const dataWithKey = Array.isArray(dataTableTransactionStatistics) && dataTableTransactionStatistics?.map((item, index) => ({
                ...item,
                key: index
            }));
            setData(dataWithKey)
        }
    }, [dataTableTransactionStatistics]);

    const columns = [
        {
            title: 'Ngày',
            dataIndex: 'date',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-center font-semibold whitespace-nowrap`}>{moment(record.date).format('DD/MM/YYYY')}</p>;
            },
        },
        {
            title: 'Giá đóng cửa',
            dataIndex: 'closePrice',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-center font-semibold whitespace-nowrap`}>{record.closePrice === 0 ? '-' : (record.closePrice * 1000).toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>;
            },
        },
        {
            title: 'Thay đổi',
            dataIndex: 'custom',
            align: 'center',
            render: (_, record) => {
                return <p className={`${getColor(record.perChange)} text-center font-semibold whitespace-nowrap`}>{(record.change * 1000).toLocaleString('en-US', { maximumFractionDigits: 2 })} ({record.perChange.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%)</p>;
            },
        },
        {
            title: 'KLGD',
            dataIndex: 'klgd',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-center font-semibold whitespace-nowrap`}>{record.klgd === 0 ? '-' : record.klgd.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>;
            },
        },
        {
            title: 'GTGD',
            dataIndex: 'gtdd',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-center font-semibold whitespace-nowrap`}>{record.gtdd === 0 ? '-' : (record.gtdd / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>;
            },
        },
        {
            title: 'Vốn hoá',
            dataIndex: 'vh',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-center font-semibold whitespace-nowrap`}>{record.vh === 0 ? '-' : (record.vh / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>;
            },
        },
        {
            title: 'NN mua',
            dataIndex: 'nn_mua',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-center font-semibold whitespace-nowrap`}>{record.nn_mua === 0 ? '-' : (record.nn_mua / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>;
            },
        },
        {
            title: 'NN bán',
            dataIndex: 'nn_ban',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-center font-semibold whitespace-nowrap`}>{record.nn_ban === 0 ? '-' : (record.nn_ban / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>;
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
                        pagination={false}
                        className='table-stock-detail'
                    />
                </div>
            ) : (
                <div className="h-[300px] flex items-center justify-center"><Loading /></div>
            )}
        </div>
    )
}

export default TableTransactionStatistics