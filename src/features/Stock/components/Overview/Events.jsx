import { Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../Chart/utils/Loading';
import { fetchDataEvents } from '../../thunk';
import '../../utils/style/antDesignTableStock.css'

const Events = ({ codeSearch }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([])
    const { dataEvents } = useSelector(state => state.stock)

    useEffect(() => {
        dispatch(fetchDataEvents(codeSearch));
    }, [dispatch, codeSearch]);

    useEffect(() => {
        if (dataEvents) {
            const dataWithKey = Array.isArray(dataEvents) && dataEvents?.map((item, index) => ({
                ...item,
                key: index
            }));
            setData(dataWithKey)
        }
    }, [dataEvents]);
    const columns = [
        {
            title: 'Ngày',
            dataIndex: 'date',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-center font-semibold whitespace-nowrap`}>{moment(record.date).format('DD/MM/YYYY')}</p>;
            },
            sorter: (a, b) => Date.parse(a.date) - Date.parse(b.date),
            defaultSortOrder: 'descend',
        },
        {
            title: 'Nội dung sự kiện',
            dataIndex: 'content',
            align: 'center',
            render: (_, record) => {
                return <p className={`dark:text-white text-black text-left text-sm font-semibold whitespace-nowrap`}>{record.content}</p>;
            },
        },
    ]

    return (
        <div>
            {Array.isArray(data) ? (
                <div className='mt-4 md:h-[620px] sm:h-[615px] xs:h-[615px] xxs:h-[615px]'>
                    <Table
                        scroll={{ x: 400 }}
                        rowClassName="pointer-events-none"
                        bordered={false}
                        columns={columns}
                        dataSource={data}
                        pagination={{ defaultPageSize: 9, showSizeChanger: false }}
                        className='table-stock-detail table-stock-event '
                    />
                </div>
            ) : (
                <div className="h-[613px] flex items-center justify-center"><Loading /></div>
            )}
        </div>
    )
}

export default Events