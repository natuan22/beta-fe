import Highcharts from "highcharts/highstock";
import variablePie from "highcharts/modules/variable-pie.js";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from "../../../Chart/utils/Loading";
import { fetchDataTransactionValueRatio } from '../../thunk';

variablePie(Highcharts);

const TransactionValueRatio = () => {
    const dispatch = useDispatch();
    const { dataTransactionValueRatio } = useSelector((state) => state.market);
    const [data, setData] = useState([])
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        dispatch(fetchDataTransactionValueRatio());
        setColorText(color);
    }, [dispatch, color]);

    useEffect(() => {
        if (dataTransactionValueRatio) {
            setData(dataTransactionValueRatio)
        }
    }, [dataTransactionValueRatio]);

    const dataTuDoanh = Array.isArray(data) && data.filter(transaction => transaction.type === 0);
    const dataKhoiNgoai = Array.isArray(data) && data.filter(transaction => transaction.type === 1);
    const dataCaNhan = Array.isArray(data) && data.filter(transaction => transaction.type === 2);

    const options = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {
            type: 'pie',
            backgroundColor: "transparent",
        },
        title: {
            text: null
        },
        series: [{
            name: 'GTGD',
            data: [{
                name: 'Khối ngoại',
                y: data && dataKhoiNgoai.length > 0 && +dataKhoiNgoai[0].percent.toFixed(2)
            }, {
                name: 'Tự doanh',
                y: data && dataTuDoanh.length > 0 && +dataTuDoanh[0].percent.toFixed(2)
            }, {
                name: 'Cá nhân',
                y: data && dataCaNhan.length > 0 && +dataCaNhan[0].percent.toFixed(2)
            }],
            colors: [
                '#6CE5E8',
                '#2D8BBA',
                '#41B8D5'
            ]
        }]
    }
    const colorKhoiNGoai = data && dataKhoiNgoai.length > 0 && getColor(dataKhoiNgoai[0].netVal)
    const colorTuDoanh = data && dataTuDoanh.length > 0 && getColor(dataTuDoanh[0].netVal)
    const colorCaNhan = data && dataCaNhan.length > 0 && getColor(dataCaNhan[0].netVal)
    return (
        <>
            <div className='text-center dark:text-white text-black'>Tỷ lệ GTGD theo nhóm NĐT trong phiên</div>
            <div className='flex'>
                <div className='w-[35%]'>
                    <div>
                        <div className='text-[0.97rem] py-1 dark:text-white text-black'>Khối ngoại: {data && dataKhoiNgoai.length > 0 && getText(dataKhoiNgoai[0].netVal)}</div>
                        <div className='text-[0.83rem] pl-3 py-1 dark:text-white text-black'>Giá trị ròng: <span className={`${colorKhoiNGoai}`}>{data && dataKhoiNgoai.length > 0 && (dataKhoiNgoai[0].netVal / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                        <div className='text-[0.83rem] pl-3 py-1 dark:text-white text-black'>Giá trị mua: {data && dataKhoiNgoai.length > 0 && (dataKhoiNgoai[0].buyVal / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='text-[0.83rem] pl-3 py-1 dark:text-white text-black'>Giá trị bán: {data && dataKhoiNgoai.length > 0 && (dataKhoiNgoai[0].sellVal / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>

                    <div>
                        <div className='text-[0.97rem] py-1 dark:text-white text-black'>Tự doanh: {data && dataTuDoanh.length > 0 && getText(dataTuDoanh[0].netVal)}</div>
                        <div className='text-[0.83rem] pl-3 py-1 dark:text-white text-black'>Giá trị ròng: <span className={`${colorTuDoanh}`}>{data && dataTuDoanh.length > 0 && (dataTuDoanh[0].netVal / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                        <div className='text-[0.83rem] pl-3 py-1 dark:text-white text-black'>Giá trị mua: {data && dataTuDoanh.length > 0 && (dataTuDoanh[0].buyVal / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='text-[0.83rem] pl-3 py-1 dark:text-white text-black'>Giá trị bán: {data && dataTuDoanh.length > 0 && (dataTuDoanh[0].sellVal / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>

                    <div>
                        <div className='text-[0.97rem] py-1 dark:text-white text-black'>Cá nhân: {data && dataCaNhan.length > 0 && getText(dataCaNhan[0].netVal)}</div>
                        <div className='text-[0.83rem] pl-3 py-1 dark:text-white text-black'>Giá trị ròng: <span className={`${colorCaNhan}`}>{data && dataCaNhan.length > 0 && (dataCaNhan[0].netVal / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                        <div className='text-[0.83rem] pl-3 py-1 dark:text-white text-black'>Giá trị mua: {data && dataCaNhan.length > 0 && (dataCaNhan[0].buyVal / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='text-[0.83rem] pl-3 py-1 dark:text-white text-black'>Giá trị bán: {data && dataCaNhan.length > 0 && (dataCaNhan[0].sellVal / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                </div>
                <div className='w-[65%]'>
                    {dataTransactionValueRatio.length ? (
                        <div id="chart-container">
                            <div className="h-[300px] w-[285px]">
                                <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                            </div>
                        </div>
                    ) : (
                        <div id="chart-container">
                            <div className="">
                                <div className="mt-14"><Loading /></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default TransactionValueRatio

function getText(item) {
    let text = <span></span>;
    if (item < "0")
        text = <span className='text-red-500'>Bán ròng</span>;
    else
        text = <span className='text-green-500'>Mua ròng</span>;

    return text;
}

function getColor(item) {
    let color = "";
    if (item === 0) color = "text-yellow-500";
    else if (item < "0") color = "text-red-500";
    else color = "text-green-500";

    return color;
}
