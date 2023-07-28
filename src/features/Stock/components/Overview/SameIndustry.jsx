import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../Chart/utils/Loading';
import { fetchDataSameIndustry } from '../../thunk';
import '../../utils/style/antDesignTableStock.css'

const SameIndustry = ({ queryApi }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([])
    const { dataSameIndustry } = useSelector(state => state.stock)

    useEffect(() => {
        dispatch(fetchDataSameIndustry(queryApi.stock, queryApi.exchange));
    }, [dispatch, queryApi]);

    useEffect(() => {
        if (dataSameIndustry) {
            const dataWithKey = Array.isArray(dataSameIndustry) && dataSameIndustry?.map((item, index) => ({
                ...item,
                key: index
            }));
            setData(dataWithKey)
        }
    }, [dataSameIndustry]);

    const columns = [
        {
            title: 'Mã CK',
            dataIndex: 'code',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-center font-semibold`}>{record.code}</p>;
            },
        },
        {
            title: 'Giá',
            dataIndex: 'closePrice',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-center font-semibold`}>{(record.closePrice * 1000).toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>;
            },
            sorter: (a, b) => a.closePrice - b.closePrice,
        },
        {
            title: 'Khối lượng',
            dataIndex: 'kl',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-center font-semibold`}>{record.kl.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>;
            },
            sorter: (a, b) => a.kl - b.kl,
        },
        {
            title: 'P/E',
            dataIndex: 'pe',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-center font-semibold`}>{record.pe.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>;
            },
            sorter: (a, b) => a.pe - b.pe,
        },
        {
            title: 'P/B',
            dataIndex: 'pb',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-center font-semibold`}>{record.pb.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>;
            },
            sorter: (a, b) => a.pb - b.pb,
        },
        {
            title: 'Vốn hoá',
            dataIndex: 'vh',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-center font-semibold`}>{(record.vh / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>;
            },
            sorter: (a, b) => a.vh - b.vh,
        }
    ]
    return (
        <div>
            {Array.isArray(data) ? (
                <div className='mt-4'>
                    <Table
                        scroll={{ x: 400 }}
                        rowClassName="pointer-events-none"
                        bordered={false}
                        columns={columns}
                        dataSource={data}
                        pagination={{ defaultPageSize: 9, showSizeChanger: false }}
                        className='table-stock-detail'
                    />
                </div>
            ) : (
                <div className="h-[300px] flex items-center justify-center"><Loading /></div>
            )}
        </div>
    )
}

export default SameIndustry