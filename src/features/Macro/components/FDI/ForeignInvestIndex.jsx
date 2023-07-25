import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../../Chart/utils/Loading';
import { getColor, getColorWithValueReference } from '../../../Chart/utils/utils';
import { fetchDataForeignInvestIndex } from '../../thunk';
import './utils/style/antDesignTable.css'

const ForeignInvestIndex = () => {
    const dispatch = useDispatch();
    const { dataForeignInvestIndex } = useSelector(state => state.macro)
    const [data, setData] = useState([])
    const [queryApi, setQueryApi] = useState({
        order: 2,
        type: 2,
    });


    useEffect(() => {
        dispatch(fetchDataForeignInvestIndex(queryApi.order, queryApi.type));
    }, [dispatch, queryApi]);

    useEffect(() => {
        if (dataForeignInvestIndex) {
            const dataWithKey = Array.isArray(dataForeignInvestIndex) && dataForeignInvestIndex?.map((item, index) => ({
                ...item,
                key: index
            }));
            setData(dataWithKey)
        }
    }, [dataForeignInvestIndex]);

    const handleQueryApiOrder = (order) => {
        setQueryApi((prev) => ({ ...prev, order }));
    };
    const handleQueryApiType = (type) => {
        setQueryApi((prev) => ({ ...prev, type }));
    };

    const mappedData = Array.isArray(dataForeignInvestIndex) && dataForeignInvestIndex?.map(item => ({
        text: item.name,
        value: item.name,
    }));

    const columns = [
        {
            title: 'Chi tiết lĩnh vực',
            dataIndex: 'name',
            filters: mappedData,
            filterSearch: true,
            onFilter: (value, record) => record.name.includes(value),
            render: (_, record) => {
                return <p className={`dark:text-white text-black font-semibold`}>{record.name}</p>;
            },
            width: '150px',

        },
        {
            title: 'Dự án cấp mới',
            dataIndex: 'cm',
            render: (_, record) => {
                const colorcm = getColorWithValueReference(record.cm_pre, record.cm);

                return <p className={`${colorcm} text-center font-semibold`}>{record.cm.toFixed(2)}</p>;
            },
            // width: '100px',
        },
        {
            title: 'Vốn cấp mới',
            dataIndex: 'cm_usd',
            render: (_, record) => {
                const colorcmUsd = getColorWithValueReference(record.cm_usd_pre, record.cm_usd);
                return <p className={`${colorcmUsd} text-center font-semibold`}>{record.cm_usd.toFixed(2)}</p>;
            },
            // width: '100px',
        },
        {
            title: 'Tăng trưởng vốn cấp mới',
            dataIndex: 'custom',
            render: (_, record) => {
                // Thực hiện tính toán dựa trên dữ liệu và trả về giá trị tùy chỉnh
                const calculatedValue = record.cm_usd_pre ? ((record.cm_usd - record.cm_usd_pre) / record.cm_usd_pre) * 100 : 0;
                const colorcmUsdPer = getColor(calculatedValue);
                return <p className={`${colorcmUsdPer} text-center font-semibold`}>{calculatedValue.toFixed(2)}%</p>;
            },
            // width: '100px',
        },
        {
            title: 'Lượt dự án tăng vốn',
            dataIndex: 'tv',
            render: (_, record) => {
                const colortv = getColorWithValueReference(record.tv_pre, record.tv);
                return <p className={`${colortv} text-center font-semibold`}>{record.tv.toFixed(2)}</p>;
            },
            // width: '100px',
        },
        {
            title: 'Vốn tăng vốn',
            dataIndex: 'tv_usd',
            render: (_, record) => {
                const colortvUsd = getColorWithValueReference(record.tv_usd_pre, record.tv_usd);
                return <p className={`${colortvUsd} text-center font-semibold`}>{record.tv_usd.toFixed(2)}</p>;
            },
            // width: '100px',
        },
        {
            title: 'Tăng trưởng vốn tăng vốn',
            dataIndex: 'custom',
            render: (_, record) => {
                // Thực hiện tính toán dựa trên dữ liệu và trả về giá trị tùy chỉnh
                const calculatedValue = record.tv_usd_pre ? ((record.tv_usd - record.tv_usd_pre) / record.tv_usd_pre) * 100 : 0;
                const colortvUsdPer = getColor(calculatedValue);
                return <p className={`${colortvUsdPer} text-center font-semibold`}>{calculatedValue.toFixed(2)}%</p>;
            },
            // width: '100px',
        },
        {
            title: 'Lượt góp vốn, mua cổ phần',
            dataIndex: 'gv',
            render: (_, record) => {
                const colorgv = getColorWithValueReference(record.gv_pre, record.gv);
                return <p className={`${colorgv} text-center font-semibold`}>{record.gv.toFixed(2)}</p>;
            },
            // width: '100px',
        },
        {
            title: 'Vốn góp vốn, mua cổ phần',
            dataIndex: 'gv_usd',
            render: (_, record) => {
                const colorgvUsd = getColorWithValueReference(record.gv_usd_pre, record.gv_usd);
                return <p className={`${colorgvUsd} text-center font-semibold`}>{record.gv_usd.toFixed(2)}</p>;
            },
            // width: '100px',
        },
        {
            title: 'Tăng trưởng vốn góp vốn, mua cổ phần',
            dataIndex: 'custom',
            render: (_, record) => {
                // Thực hiện tính toán dựa trên dữ liệu và trả về giá trị tùy chỉnh
                const calculatedValue = record.gv_usd_pre ? ((record.gv_usd - record.gv_usd_pre) / record.gv_usd_pre) * 100 : 0;
                const colorgvUsdPer = getColor(calculatedValue);
                return <p className={`${colorgvUsdPer} text-center font-semibold`}>{calculatedValue.toFixed(2)}%</p>;
            },
            // width: '100px',
        },
        {
            title: 'TỔNG VỐN',
            dataIndex: 'total',
            render: (_, record) => {
                const colorTotal = getColorWithValueReference(record.total_pre, record.total);
                return <p className={`${colorTotal} text-center font-semibold`}>{record.total.toFixed(2)}</p>;
            },
            sorter: (a, b) => a.total - b.total,
            defaultSortOrder: 'descend',
            sortDirections: ['descend'],
            // width: '100px',
        },
    ];

    return (
        <>
            <div className='flex items-center justify-between border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold xs:text-base xxs:text-[11px]'>Chỉ số đầu tư nước ngoài</span>
                <div>
                    <select className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0`}
                        onChange={(event) => {
                            handleQueryApiOrder(event.target.value)
                        }}>
                        <option value='2'>Tháng</option>
                        <option value='0'>Quý</option>
                    </select>
                    <select className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0 ml-2`}
                        onChange={(event) => {
                            handleQueryApiType(event.target.value)
                        }}>
                        <option value='2'>Đối tác</option>
                        <option value='1'>Ngành</option>
                    </select>
                </div>
            </div>
            {Array.isArray(data) ? (
                <div className='mt-2'>
                    <Table
                        scroll={{ x: 400 }}
                        rowClassName="pointer-events-none "
                        bordered={false}
                        columns={columns}
                        dataSource={data}
                        pagination={{ defaultPageSize: 7, showSizeChanger: false }}
                    />
                </div>
            ) : (
                <div className="h-[300px] flex items-center justify-center"><Loading /></div>
            )}

        </>
    )
}

export default ForeignInvestIndex