import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataLineChart } from '../../../Chart/thunk'
import socket from '../../../Chart/utils/socket'
import LineChartMarket from './LineChartMarket'

const ChartInfo = () => {
    const dispatch = useDispatch()
    const dataLineChart = useSelector((state) => state.chart.dataLineChart)
    const [data, setData] = useState([])
    const [dataInfo, setDataInfo] = useState([])
    const [dataChart, setDataChart] = useState([])
    const [query, setQuery] = useState('0')
    const [fmtDay, setFmtDay] = useState('HH:mm')

    useEffect(() => {
        if (dataLineChart) {
            setData(dataLineChart)
            setDataInfo(dataLineChart.vnindexData)
            setDataChart(dataLineChart.vnindexData)
        }
    }, [dataLineChart])

    useEffect(() => {
        if (query === '0') {
            conSocket()
            setFmtDay('HH:mm')
        } else {
            disconnectSocket()
            conSocket2()
            setFmtDay('DD/MM')
        }
    }, [query])

    const disconnectSocket = () => {
        if (socket.active) {
            socket.off("listen-chi-so-vnindex")
        }
    }

    const conSocket = () => {
        socket.on("listen-chi-so-vnindex", (newData) => {
            setDataInfo((prevData) => [...prevData, ...newData]);
            setDataChart((prevData) => [...prevData, ...newData]);
        });
    }

    const conSocket2 = () => {
        socket.on("listen-chi-so-vnindex", (newData) => {
            setDataInfo((prevData) => [...prevData, ...newData]);
        });
    }

    const vnindexData = dataInfo && dataInfo[dataInfo.length - 1]
    const colorChange = vnindexData && getColor(vnindexData.percentIndexChange)
    const openColor = vnindexData && getColor2(vnindexData.referenceIndex, vnindexData.openIndex)
    const lowestColor = vnindexData && getColor2(vnindexData.referenceIndex, vnindexData.lowestIndex)
    const highestColor = vnindexData && getColor2(vnindexData.referenceIndex, vnindexData.highestIndex)

    return (
        <>
            <div>
                <div className='flex border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                    <div className='w-[345px]'>
                        <span className='text-white xs:text-[1.2rem] sm:text-[1.4rem] md:text-[1.6rem] pl-[10px]'>{vnindexData && vnindexData.comGroupCode}</span>
                        <span className={`${colorChange} xs:text-[0.7rem] sm:text-[0.8rem] md:text-[1rem] md:pl-[30px] xs:pl-[20px]`}>{vnindexData && vnindexData.indexValue}</span>
                        <span className={`${colorChange} xs:text-[0.7rem] sm:text-[0.8rem] md:text-[1rem] md:pl-[30px] xs:pl-[20px]`}>{vnindexData && vnindexData.indexChange}/ {vnindexData && (vnindexData.percentIndexChange * 100).toFixed(2)}%</span>
                    </div>
                    <select className={`bg-[#1B496D] md:ml-[200px] lg:ml-3 xl:ml-3 2xl:ml-3 p-1 text-[1rem] text-white border-0`}
                        onChange={(event) => {
                            setQuery(event.target.value)
                            dispatch(dispatch(fetchDataLineChart(`${event.target.value}`)))
                        }}>
                        <option value='0'>Trong ngày</option>
                        <option value='1'>5 phiên</option>
                        <option value='2'>1 tháng</option>
                        <option value='3'>YtD</option>
                    </select>
                </div>
                <div className='md:mt-2 lg:mt-[28px] xl:mt-2'>
                    <LineChartMarket data={dataChart} fmtDay={fmtDay} />
                </div>
            </div>
            <hr />
            <div className='flex justify-around text-white text-xs mt-2'>
                <span className='xs:text-[10px] sm:text-[12px]'>Tham chiếu: <span className='text-yellow-500'>{vnindexData && vnindexData.referenceIndex}</span></span>
                <span className='xs:text-[10px] sm:text-[12px]'>Mở cửa: <span className={`${openColor}`}>{vnindexData && vnindexData.openIndex}</span></span>
                <span className='xs:text-[10px] sm:text-[12px]'>Thấp nhất: <span className={`${lowestColor}`}>{vnindexData && vnindexData.lowestIndex}</span></span>
                <span className='xs:text-[10px] sm:text-[12px]'>Cao nhất: <span className={`${highestColor}`}>{vnindexData && vnindexData.highestIndex}</span></span>
            </div>
            <div className='flex justify-around text-xs mt-1'>
                <span className='text-[#5CE1E6] xs:text-[11px] sm:text-[12px]'>Sàn: <span className='text-white'>{data.industryFull && data.industryFull.low}</span></span>
                <span className='text-red-500 xs:text-[11px] sm:text-[12px]'>Giảm: <span className='text-white'>{data.industryFull && data.industryFull.decrease}</span></span>
                <span className='text-yellow-500 xs:text-[11px] sm:text-[12px]'>Tham chiếu: <span className='text-white'>{data.industryFull && data.industryFull.equal}</span></span>
                <span className='text-green-500 xs:text-[11px] sm:text-[12px]'>Tăng: <span className='text-white'>{data.industryFull && data.industryFull.increase}</span></span>
                <span className='text-[#CB6CE6] xs:text-[11px] sm:text-[12px]'>Trần: <span className='text-white'>{data.industryFull && data.industryFull.high}</span></span>
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