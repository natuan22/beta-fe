import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LineChart from '../../Chart/components/LineChart'
import { fetchDataLineChart } from '../../Chart/thunk'

const ChartInfo = () => {
    const dispatch = useDispatch()
    const dataLineChart = useSelector((state) => state.chart.dataLineChart) || {}

    const vnindexData = dataLineChart && dataLineChart.vnindexData && dataLineChart.vnindexData[dataLineChart.vnindexData.length - 1]
    const colorChange = vnindexData && getColor(vnindexData.percentIndexChange)
    const openColor = vnindexData && getColor2(vnindexData.referenceIndex, vnindexData.openIndex)
    const lowestColor = vnindexData && getColor2(vnindexData.referenceIndex, vnindexData.lowestIndex)
    const highestColor = vnindexData && getColor2(vnindexData.referenceIndex, vnindexData.highestIndex)

    return (
        <>
            <div>
                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                    <span className='text-white text-[1.6rem] pl-[10px]'>{vnindexData && vnindexData.comGroupCode}</span>
                    <span className={`${colorChange} text-[1rem] pl-[30px]`}>{vnindexData && vnindexData.indexValue}</span>
                    <span className={`${colorChange} text-[1rem] pl-[30px]`}>{vnindexData && vnindexData.indexChange}/ {vnindexData && vnindexData.percentIndexChange.toFixed(2)}%</span>
                    <select onChange={(event) => {
                        dispatch(fetchDataLineChart(`${event.target.value}`))
                    }} className={`bg-[#1B496D] ml-6 p-1 text-[1rem] text-white border-0`} >
                        <option value="0">Trong ngày</option>
                        <option value="1">5 ngày</option>
                        <option value="2">1 tuần</option>
                    </select>
                </div>
                <div >
                    <LineChart />
                </div>
            </div>
            <hr />
            <div className='flex justify-around text-white text-xs mt-1'>
                <span>Tham chiếu: <span className='text-yellow-500'>{vnindexData && vnindexData.referenceIndex}</span></span>
                <span>Mở cửa: <span className={`${openColor}`}>{vnindexData && vnindexData.openIndex}</span></span>
                <span>Thấp nhất: <span className={`${lowestColor}`}>{vnindexData && vnindexData.lowestIndex}</span></span>
                <span>Cao nhất: <span className={`${highestColor}`}>{vnindexData && vnindexData.highestIndex}</span></span>
            </div>
            <div className='flex justify-around text-xs'>
                <span className='text-[#5CE1E6]'>Sàn: <span className='text-white'>{dataLineChart && dataLineChart.industryFull && dataLineChart.industryFull.low}</span></span>
                <span className='text-red-500'>Giảm: <span className='text-white'>{dataLineChart && dataLineChart.industryFull && dataLineChart.industryFull.decrease}</span></span>
                <span className='text-yellow-500'>Tham chiếu: <span className='text-white'>{dataLineChart && dataLineChart.industryFull && dataLineChart.industryFull.equal}</span></span>
                <span className='text-green-500'>Tăng: <span className='text-white'>{dataLineChart && dataLineChart.industryFull && dataLineChart.industryFull.increase}</span></span>
                <span className='text-[#CB6CE6]'>Trần: <span className='text-white'>{dataLineChart && dataLineChart.industryFull && dataLineChart.industryFull.high}</span></span>
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