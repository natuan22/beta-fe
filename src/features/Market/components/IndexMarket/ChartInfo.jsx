import React, { useEffect, useState } from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useDispatch, useSelector } from 'react-redux'
import socket from '../../../Chart/utils/socket'
import moment from 'moment';
import { fetchDataLineChartMarket } from '../../thunk';
import Loading from '../../../Chart/utils/Loading';

const ChartInfo = () => {
    const dispatch = useDispatch()
    const { lineChartMarketData } = useSelector(state => state.market)
    const [dataChart, setDataChart] = useState()
    useEffect(() => {
        if (lineChartMarketData?.lineChartData?.length > 0)
            setDataChart(lineChartMarketData.lineChartData)
    }, [lineChartMarketData.lineChartData])
    useEffect(() => {
        socket.on(`listen-chi-so-${localStorage.getItem('exchange')}`, (newData) => {
            console.log(newData)
            setDataChart((preData) => [...preData, ...newData])
        });
    }, [lineChartMarketData.lineChartData])

    
    const options = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {
            type: "line",
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
                    color: "#fff",
                },
            },
            labels: {
                style: {
                    color: "#fff",
                },
            },
        },
        xAxis: {
            title: {
                text: null,
                style: {
                    color: "#fff",
                },
            },
            labels: {
                style: {
                    color: "#fff",
                },
            },
            categories: dataChart?.map(item => moment(item.tradingDate).utc().format(localStorage.getItem('typeTime'))),
        },
        legend: {
            enabled: false // Tắt chú thích
        }
    };
    return (
        <>
            <div>
                <div className='flex border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                    <div className='w-[345px]'>
                        <span className='dark:text-white text-black xs:text-[1.2rem] sm:text-[1.4rem] md:text-[1.6rem] pl-[10px]'>{localStorage.getItem('exchange')}</span>
                        <span className={` text-white xs:text-[0.7rem] sm:text-[0.8rem] md:text-[1rem] md:pl-[30px] xs:pl-[20px]`}>{dataChart && dataChart[dataChart?.length -1].indexValue}</span>
                        <span className={` xs:text-[0.7rem] sm:text-[0.8rem] md:text-[1rem] md:pl-[30px] xs:pl-[20px]`}>%</span>
                    </div>
                    <select className={`bg-[#1B496D] md:ml-[200px] lg:ml-3 xl:ml-3 2xl:ml-3 p-1 text-[1rem] text-white border-0`}
                        onChange={(event) => {
                            localStorage.setItem('typeApi', event.target.value)
                            if (event.target.value === '0') {
                                localStorage.setItem('typeTime', 'HH:mm')
                                socket.on(`listen-chi-so-${localStorage.getItem('exchange')}`, (newData) => {
                                    console.log(newData)
                                    setDataChart((preData) => [...preData, ...newData])
                                });
                            } else {
                                localStorage.setItem('typeTime', "DD/MM")
                            }
                            dispatch(fetchDataLineChartMarket(localStorage.getItem('exchange'), event.target.value))
                        }}>
                        <option value='0'>Trong ngày</option>
                        <option value='1'>5 phiên</option>
                        <option value='2'>1 tháng</option>
                        <option value='3'>YtD</option>
                    </select>
                </div>
                <div className='md:mt-2 lg:mt-[28px] xl:mt-2'>
                    {dataChart?.length > 0 ? <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} /> : <div className='text-center'><Loading /></div>}

                </div>
            </div>
            <hr />
            <div className='flex justify-around dark:text-white text-black text-xs mt-2'>
                <span className='xs:text-[10px] sm:text-[12px]'>Tham chiếu: <span className='text-yellow-500'></span></span>
                <span className='xs:text-[10px] sm:text-[12px]'>Mở cửa: <span ></span></span>
                <span className='xs:text-[10px] sm:text-[12px]'>Thấp nhất: <span ></span></span>
                <span className='xs:text-[10px] sm:text-[12px]'>Cao nhất: <span ></span></span>
            </div>
            <div className='flex justify-around text-xs mt-1'>
                <span className='text-[#5CE1E6] xs:text-[11px] sm:text-[12px]'>Sàn: <span className='dark:text-white text-black'></span></span>
                <span className='text-red-500 xs:text-[11px] sm:text-[12px]'>Giảm: <span className='dark:text-white text-black'></span></span>
                <span className='text-yellow-500 xs:text-[11px] sm:text-[12px]'>Tham chiếu: <span className='dark:text-white text-black'></span></span>
                <span className='text-green-500 xs:text-[11px] sm:text-[12px]'>Tăng: <span className='dark:text-white text-black'></span></span>
                <span className='text-[#CB6CE6] xs:text-[11px] sm:text-[12px]'>Trần: <span className='dark:text-white text-black'></span></span>
            </div>
        </>
    )
}

export default ChartInfo

function getColor(item) {
    let color = "";
    if (item === 0) color = "text-yellow-500";
    else if (item < 0) color = "text-red-500";
    else color = "text-green-500";

    return color;
}

function getColor2(referenceIndex, item) {
    let color = "";
    if (item === referenceIndex) color = "text-yellow-500";
    else if (item < referenceIndex) color = "text-red-500";
    else color = "text-green-500";

    return color;
}