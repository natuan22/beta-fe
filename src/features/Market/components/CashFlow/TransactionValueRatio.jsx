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

    const dataKhoiNgoai = Array.isArray(data) && data.filter(transaction => transaction.type === 0);
    const dataTuDoanh = Array.isArray(data) && data.filter(transaction => transaction.type === 1);
    const dataCaNhan = Array.isArray(data) && data.filter(transaction => transaction.type === 2);

    const options = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            backgroundColor: "transparent",
        },
        title: {
            text: null
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f}%'
                }
            }
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
                '#ff0000',
                '#0056FF',
                '#ffd300'
            ]
        }]
    }

    const colorKhoiNGoai = data && dataKhoiNgoai.length > 0 && getColor(dataKhoiNgoai[0].netVal)
    const colorTuDoanh = data && dataTuDoanh.length > 0 && getColor(dataTuDoanh[0].netVal)
    const colorCaNhan = data && dataCaNhan.length > 0 && getColor(dataCaNhan[0].netVal)

    return (
        <>
            <div className='text-center dark:text-white text-black font-semibold'>Tỷ lệ GTGD theo nhóm NĐT trong phiên</div>
            {dataTransactionValueRatio.length ? (
                <div id="chart-container">
                    <div className="h-[290px]">
                        <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                    </div>
                </div>
            ) : (
                <div id="chart-container">
                    <div className="">
                        <div className="mt-16 mb-[201px]"><Loading /></div>
                    </div>
                </div>
            )}
            <section className="bg-blueGray-50 pt-1.5">
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
                        <div className="block w-full bg-transparent">
                            <table className="items-center w-full border-collapse bg-transparent">
                                <thead className="bg-[#1E5D8B]">
                                    <tr>
                                        <th className="uppercase text-center align-middle px-2.5 py-3 text-xs whitespace-nowrap font-semibold text-white">
                                            Nhóm NĐT
                                        </th>
                                        <th className="uppercase text-center align-middle px-2.5 py-3 text-xs font-semibold text-white">
                                            Trạng thái
                                        </th>
                                        <th className="uppercase text-center align-middle px-2.5 py-3 text-xs font-semibold text-white">
                                            Giá trị ròng (tỷ VNĐ)
                                        </th>
                                        <th className="uppercase text-center align-middle px-2.5 py-3 text-xs font-semibold text-white">
                                            Giá trị mua (tỷ VNĐ)
                                        </th>
                                        <th className="uppercase text-center align-middle px-2.5 py-3 text-xs font-semibold text-white">
                                            Giá trị bán (tỷ VNĐ)
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr className="dark:hover:bg-gray-800 hover:bg-gray-300 duration-500 dark:text-white text-black">
                                        <th className={`text-left align-middle px-1 py-2.5 xxs:text-[10px] lg:text-sm xl:text-sm`}>
                                            Khối ngoại
                                        </th>
                                        <td className={`text-center align-middle whitespace-nowrap px-1 py-2.5 font-semibold xxs:text-[10px] lg:text-sm xl:text-sm`}>
                                            {data && dataKhoiNgoai.length > 0 && getText(dataKhoiNgoai[0].netVal)}
                                        </td>
                                        <td className={`text-center align-middle whitespace-nowrap px-1 py-2.5 font-semibold xxs:text-[10px] lg:text-sm xl:text-sm`}>

                                            <span className={`${colorKhoiNGoai}`}>{data && dataKhoiNgoai.length > 0 && (dataKhoiNgoai[0].netVal / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>

                                        </td>
                                        <td className={`text-center align-middle whitespace-nowrap px-1 py-2.5 font-semibold xxs:text-[10px] lg:text-sm xl:text-sm`}>
                                            {data && dataKhoiNgoai.length > 0 && (dataKhoiNgoai[0].buyVal / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}

                                        </td>
                                        <td className={`text-center align-middle whitespace-nowrap px-1 py-2.5 font-semibold xxs:text-[10px] lg:text-sm xl:text-sm`}>
                                            {data && dataKhoiNgoai.length > 0 && (dataKhoiNgoai[0].sellVal / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </td>
                                    </tr>
                                    <tr className="dark:hover:bg-gray-800 hover:bg-gray-300 duration-500 dark:text-white text-black">
                                        <th className={`text-left align-middle px-1 py-2.5 xxs:text-[10px] lg:text-sm xl:text-sm`}>
                                            Tự doanh
                                        </th>
                                        <td className={`text-center align-middle whitespace-nowrap px-1 py-2.5 font-semibold xxs:text-[10px] lg:text-sm xl:text-sm`}>
                                            {data && dataTuDoanh.length > 0 && getText(dataTuDoanh[0].netVal)}
                                        </td>
                                        <td className={`text-center align-middle whitespace-nowrap px-1 py-2.5 font-semibold xxs:text-[10px] lg:text-sm xl:text-sm`}>

                                            <span className={`${colorTuDoanh}`}>{data && dataTuDoanh.length > 0 && (dataTuDoanh[0].netVal / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>

                                        </td>
                                        <td className={`text-center align-middle whitespace-nowrap px-1 py-2.5 font-semibold xxs:text-[10px] lg:text-sm xl:text-sm`}>
                                            {data && dataTuDoanh.length > 0 && (dataTuDoanh[0].buyVal / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}

                                        </td>
                                        <td className={`text-center align-middle whitespace-nowrap px-1 py-2.5 font-semibold xxs:text-[10px] lg:text-sm xl:text-sm`}>
                                            {data && dataTuDoanh.length > 0 && (dataTuDoanh[0].sellVal / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </td>
                                    </tr>
                                    <tr className="dark:hover:bg-gray-800 hover:bg-gray-300 duration-500 dark:text-white text-black">
                                        <th className={`text-left align-middle px-1 py-2.5 xxs:text-[10px] lg:text-sm xl:text-sm`}>
                                            Cá nhân
                                        </th>
                                        <td className={`text-center align-middle whitespace-nowrap px-1 py-2.5 font-semibold xxs:text-[10px] lg:text-sm xl:text-sm`}>
                                            {data && dataCaNhan.length > 0 && getText(dataCaNhan[0].netVal)}
                                        </td>
                                        <td className={`text-center align-middle whitespace-nowrap px-1 py-2.5 font-semibold xxs:text-[10px] lg:text-sm xl:text-sm`}>

                                            <span className={`${colorCaNhan}`}>{data && dataCaNhan.length > 0 && (dataCaNhan[0].netVal / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>

                                        </td>
                                        <td className={`text-center align-middle whitespace-nowrap px-1 py-2.5 font-semibold xxs:text-[10px] lg:text-sm xl:text-sm`}>
                                            {data && dataCaNhan.length > 0 && (dataCaNhan[0].buyVal / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}

                                        </td>
                                        <td className={`text-center align-middle whitespace-nowrap px-1 py-2.5 font-semibold xxs:text-[10px] lg:text-sm xl:text-sm`}>
                                            {data && dataCaNhan.length > 0 && (dataCaNhan[0].sellVal / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
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
