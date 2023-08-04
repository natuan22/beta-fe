import React, { useEffect, useState } from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useDispatch, useSelector } from 'react-redux'
import socket from '../../../Chart/utils/socket'
import moment from 'moment';
import { fetchDataBienDongThiTruong, fetchDataLineChartMarket } from '../../thunk';
import Loading from '../../../Chart/utils/Loading';
import { getColor } from '../../../Chart/utils/utils';

const ChartInfo = () => {
    const dispatch = useDispatch()

    const dataTable = useSelector((state) => state.chart.dataTableDetail);
    const [dataTableDomestic, setDataTableDomestic] = useState([]);
    const [loading, setLoading] = useState(true);
    const [exchange, setExchange] = useState('VNINDEX');
    const [query, setQuery] = useState('0')

    const { lineChartMarketData } = useSelector(state => state.market)
    const { dataBienDongThiTruong } = useSelector(state => state.market)
    const [data, setData] = useState([])
    const [dataInfo, setDataInfo] = useState([])
    const [dataChart, setDataChart] = useState()

    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        if (dataBienDongThiTruong)
            setData(dataBienDongThiTruong)
    }, [dataBienDongThiTruong]);

    useEffect(() => {
        setColorText(color);
    }, [color]);

    useEffect(() => {
        if (dataTable.data) {
            setLoading(false);
            setDataTableDomestic(dataTable.data)
        }
    }, [dataTable]);

    useEffect(() => {
        if (dataTable.data) {
            socket.on("listen-domestic-index", (newData) => {
                const sortedData = newData.slice().sort((a, b) => a.code.localeCompare(b.code)).reverse();
                setDataTableDomestic(sortedData)
            });
        }
    }, [dataTableDomestic])

    useEffect(() => {
        if (lineChartMarketData?.length > 0) {
            setDataInfo(lineChartMarketData)
            setDataChart(lineChartMarketData)
        }
    }, [lineChartMarketData])

    useEffect(() => {
        if (lineChartMarketData?.length > 0) {
            if (query === '0') {
                disconnectSocket(localStorage.getItem('exchange'))
                conSocket(exchange)
                localStorage.setItem('typeTime', 'HH:mm')
                localStorage.setItem('exchange', exchange)
            } else {
                disconnectSocket(localStorage.getItem('exchange'))
                conSocket2(exchange)
                localStorage.setItem('exchange', exchange)
                localStorage.setItem('typeTime', "DD/MM")
            }
        }
    }, [query, exchange])

    const disconnectSocket = (key) => {
        if (socket.active) {
            socket.off(`listen-chi-so-${key}`)
        }
    }

    const conSocket = (key) => {
        socket.on(`listen-chi-so-${key}`, (newData) => {
            setDataInfo((prevData) => [...prevData, ...newData]);
            setDataChart((prevData) => [...prevData, ...newData]);
        });
    }

    const conSocket2 = (key) => {
        socket.on(`listen-chi-so-${key}`, (newData) => {
            setDataInfo((prevData) => [...prevData, ...newData]);
        });
    }
    const options = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {
            type: "spline",
            backgroundColor: "transparent",
        },
        title: {
            text: "",
        },
        series: [
            {
                name: "Điểm",
                data: dataChart?.map(item => item.indexValue)
            },
        ],
        yAxis: {
            title: {
                text: "",
                style: {
                    color: localStorage.getItem('color'),
                },
            },
            labels: {
                style: {
                    color: localStorage.getItem('color'),
                },
            },
        },
        xAxis: {
            title: {
                text: null,
                style: {
                    color: localStorage.getItem('color'),
                },
            },
            labels: {
                style: {
                    color: localStorage.getItem('color'),
                },
            },
            categories: dataChart?.map(item => moment(item.tradingDate).utc().subtract(1, 'days').format(localStorage.getItem('typeTime'))),
        },
        legend: {
            enabled: false // Tắt chú thích
        }
    };

    const vnindexData = dataInfo && dataInfo[dataInfo.length - 1]
    const colorChange = vnindexData && getColor(vnindexData.percentIndexChange)

    return (
        <>
            <div>
                <div className='flex items-center justify-between border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                    <div className='w-[345px]'>
                        <span className='dark:text-white text-black xxs:text-[12px] xs:text-[1.2rem] sm:text-[1.4rem] md:text-[1.6rem] pl-[10px]'>{vnindexData && vnindexData.comGroupCode}</span>
                        <span className={`${colorChange} text-white xxs:text-[11px] xs:text-[0.7rem] sm:text-[0.8rem] md:text-[1rem] md:pl-[30px] xs:pl-[20px] xxs:pl-[10px]`}>{vnindexData && vnindexData.indexValue.toFixed(2)}</span>
                        <span className={`${colorChange} xxs:text-[11px] xs:text-[0.7rem] sm:text-[0.8rem] md:text-[1rem] md:pl-[25px] xs:pl-[15px] xxs:pl-[5px]`}>{vnindexData && vnindexData.indexChange.toFixed(2)}/ {vnindexData && (vnindexData.percentIndexChange).toFixed(2)}%</span>
                    </div>
                    <div>
                        <select className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0`}
                            onChange={(event) => {
                                localStorage.setItem('typeApi', event.target.value)
                                setQuery(event.target.value)
                                dispatch(fetchDataLineChartMarket(exchange, event.target.value))
                            }}>
                            <option value='0'>Trong ngày</option>
                            <option value='1'>5 phiên</option>
                            <option value='2'>1 tháng</option>
                            <option value='3'>YtD</option>
                        </select>
                    </div>
                </div>
                <div className='md:mt-2 lg:mt-[28px] xl:mt-2 '>
                    {dataChart?.length > 0 ? (
                        <div className='h-[405px]'><HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} /></div>
                    ) : (
                        <div className='text-center mt-12 h-[365px]'><Loading /></div>
                    )}
                </div>
            </div>
            <hr />
            <div className='flex justify-around dark:text-white text-black text-xs mt-2'>
                <span className='xs:text-[10px] sm:text-[12px]'>Mở cửa: <span >{vnindexData && vnindexData.openIndex}</span></span>
                <span className='xs:text-[10px] sm:text-[12px]'>Thấp nhất: <span>{vnindexData && vnindexData.lowestIndex}</span></span>
                <span className='xs:text-[10px] sm:text-[12px]'>Cao nhất: <span>{vnindexData && vnindexData.highestIndex}</span></span>
            </div>
            <div className='flex justify-around text-xs mt-1'>
                <span className='text-[#5CE1E6] xs:text-[11px] sm:text-[12px]'>Sàn: <span className='dark:text-white text-black'>{data && data.low}</span></span>
                <span className='text-red-500 xs:text-[11px] sm:text-[12px]'>Giảm: <span className='dark:text-white text-black'>{data && data.decrease}</span></span>
                <span className='text-yellow-500 xs:text-[11px] sm:text-[12px]'>Tham chiếu: <span className='dark:text-white text-black'>{data && data.equal}</span></span>
                <span className='text-green-500 xs:text-[11px] sm:text-[12px]'>Tăng: <span className='dark:text-white text-black'>{data && data.increase}</span></span>
                <span className='text-[#CB6CE6] xs:text-[11px] sm:text-[12px]'>Trần: <span className='dark:text-white text-black'>{data && data.high}</span></span>
            </div>

            <div className="mt-2">
                <section>
                    <div className="w-full">
                        <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
                            <div className="block w-full bg-transparent xs:min-h-[300px] md:min-h-[300px] lg:min-h-[300px] xl:min-h-[300px] 2xl:min-h-[300px]">
                                <table className="items-center w-full border-collapse bg-transparent">
                                    <thead>
                                        <tr className='bg-[#1E5D8B]'>
                                            <th className="text-center align-middle xxs:text-[10px] px-1.5 py-2 text-sm font-semibold text-white">
                                                Chỉ số
                                            </th>
                                            <th className="text-center align-middle xxs:text-[10px] px-1.5 py-2 text-sm font-semibold text-white">
                                                Điểm số
                                            </th>
                                            <th className="text-center align-middle xxs:text-[10px] px-1.5 py-2 text-xs font-semibold text-white">
                                                % Thay đổi
                                            </th>
                                            <th className="text-center align-middle xxs:text-[10px] px-1.5 py-2 text-xs font-semibold text-white">
                                                Khối lượng (triệu CP)
                                            </th>
                                            <th className="text-center align-middle xxs:text-[10px] px-1.5 py-2 text-xs font-semibold text-white">
                                                Giá trị (tỷ VNĐ)
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {!loading ? (Array.isArray(dataTableDomestic) &&
                                            dataTableDomestic.map((item, index) => {
                                                let color = getColor(item.change)
                                                return (
                                                    <tr onClick={() => {
                                                        if (!localStorage.getItem('typeApi')) {
                                                            dispatch(fetchDataLineChartMarket(`${item.code}`, '0'))
                                                        } else {
                                                            dispatch(fetchDataLineChartMarket(`${item.code}`, localStorage.getItem('typeApi')))
                                                        }
                                                        setExchange(item.code)
                                                        dispatch(fetchDataBienDongThiTruong(item.code))
                                                    }} key={index} className='dark:hover:bg-gray-800 hover:bg-gray-300 duration-500 cursor-pointer'>
                                                        <th className="text-left px-3 align-middle xxs:text-[10px] xs:text-xs md:text-sm lg:text-sm xl:text-[13px] whitespace-nowrap p-3.5 dark:text-white text-black">
                                                            {item.code}
                                                        </th>
                                                        <td className={`text-center px-1.5 align-middle xxs:text-[10px] xs:text-xs md:text-sm lg:text-sm xl:text-sm whitespace-nowrap p-3.5 font-semibold ${color}`}>
                                                            {item.closePrice && item.closePrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </td>
                                                        <td className={`text-center px-1.5 align-middle xxs:text-[10px] xs:text-xs md:text-sm lg:text-sm xl:text-sm whitespace-nowrap p-3.5 font-semibold ${color}`}>
                                                            {item.perChange && (item.perChange).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                                                        </td>
                                                        <td className={`text-center px-1.5 align-middle xxs:text-[10px] xs:text-xs md:text-sm lg:text-sm xl:text-sm whitespace-nowrap p-3.5 font-semibold ${color}`}>
                                                            {item.totalVol && (item.totalVol / 1000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </td>
                                                        <td className={`text-center px-1.5 align-middle xxs:text-[10px] xs:text-xs md:text-sm lg:text-sm xl:text-sm whitespace-nowrap p-3.5 font-semibold ${color}`}>
                                                            {item.totalVal && (item.totalVal / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </td>

                                                    </tr>
                                                )
                                            })) : (<tr><td colSpan={6}><div className="mt-16"><Loading /></div></td></tr>)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default ChartInfo


