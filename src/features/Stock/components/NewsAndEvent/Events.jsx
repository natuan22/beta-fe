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

    const uniqueDates = Array.isArray(dataNewsAndEvents) && [...new Set(dataNewsAndEvents?.map(item => item.type))];

    const mappedData = Array.isArray(uniqueDates) && uniqueDates?.map(item => ({ text: item, value: item }));

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
                return <p className={`dark:text-white text-black text-center font-semibold whitespace-nowrap`}>{record.date_gdkhq}</p>;
            },
            sorter: (a, b) => Date.parse(a.date_gdkhq) - Date.parse(b.date_gdkhq),
        },
        {
            title: 'Ngày ĐKCC',
            dataIndex: 'date_dkcc',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-center font-semibold whitespace-nowrap`}>{record.date_dkcc}</p>;
            },
            sorter: (a, b) => Date.parse(a.date_dkcc) - Date.parse(b.date_dkcc),
        },
        {
            title: 'Ngày thực hiện',
            dataIndex: 'date',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-center font-semibold whitespace-nowrap`}>{record.date}</p>;
            },
        },
        {
            title: 'Nội dung sự kiện',
            dataIndex: 'content',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-left font-semibold whitespace-nowrap`}>{record.content}</p>;
            },
        },
        {
            title: 'Loại sự kiện',
            dataIndex: 'type',
            align: 'center',
            filters: mappedData,
            filterSearch: true,
            onFilter: (value, record) => record.type.includes(value),
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-center font-semibold whitespace-nowrap`}>{record.type}</p>;
            },
        },
    ]

    return (
        <div>
            {Array.isArray(data) ? (
                <div className='mt-4 xl:h-[670px] lg:h-[715px] md:h-[715px] sm:h-[715px] xs:h-[715px] xxs:h-[715px]'>
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