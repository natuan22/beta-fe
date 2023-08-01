import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../Chart/utils/Loading';
import { fetchDataNewsAndEvents } from '../../thunk';

const Events = ({ queryApiEvents }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([])
    const { dataNewsAndEvents } = useSelector(state => state.stock)

    useEffect(() => {
        dispatch(fetchDataNewsAndEvents(queryApiEvents.stock, queryApiEvents.type));
    }, [dispatch, queryApiEvents]);

    useEffect(() => {
        if (dataNewsAndEvents) {
            const dataWithKey = Array.isArray(dataNewsAndEvents) && dataNewsAndEvents?.map((item, index) => ({
                ...item,
                key: index
            }));
            setData(dataWithKey)
        }
    }, [dataNewsAndEvents]);

    const columns = [
        {
            title: 'Mã chứng khoán',
            dataIndex: 'code',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-center font-semibold`}>{record.code}</p>;
            },
        },
        {
            title: 'Ngày GDKHQ',
            dataIndex: 'date_gdkhq',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-center font-semibold`}>{record.date_gdkhq}</p>;
            },
        },
        {
            title: 'Ngày ĐKCC',
            dataIndex: 'date_dkcc',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-center font-semibold`}>{record.date_dkcc}</p>;
            },
        },
        {
            title: 'Ngày thực hiện',
            dataIndex: 'date',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-center font-semibold`}>{record.date}</p>;
            },
        },
        {
            title: 'Nội dung sự kiện',
            dataIndex: 'content',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-left font-semibold`}>{record.content}</p>;
            },
        },
        {
            title: 'Loại sự kiện',
            dataIndex: 'type',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-center font-semibold`}>{record.type}</p>;
            },
        },
    ]

    return (
        <div>
            {Array.isArray(data) ? (
                <div className='mt-4 h-[670px]'>
                    <Table
                        scroll={{ x: 400 }}
                        rowClassName="pointer-events-none "
                        bordered={false}
                        columns={columns}
                        dataSource={data}
                        pagination={{ defaultPageSize: 10, showSizeChanger: false }}
                        className='table-stock-detail'
                    />
                </div>
            ) : (
                <div className="h-[300px] flex items-center justify-center"><Loading /></div>
            )}
        </div>
    )
}

export default Events