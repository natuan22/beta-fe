import React, { useEffect, useState } from 'react'
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataChartOperatingProfitGrowth } from '../../../thunk'

const ChartOperatingProfitGrowth = (props) => {
    const dispatch = useDispatch()
    const { exchange, industryQuery, order, timeFrame } = props
    const { dataChartOperatingProfitGrowth } = useSelector(state => state.market)
    const [data, setData] = useState()
    const [timeLine, setTimeLine] = useState()
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        dispatch(fetchDataChartOperatingProfitGrowth(exchange, industryQuery, timeFrame, order))
        setColorText(color);
    }, [props, color])

    // console.log('dataChartOperatingProfitGrowth', dataChartOperatingProfitGrowth);

    return (
        <>
            <div>ChartOperatingProfitGrowth</div>
        </>
    )
}

export default ChartOperatingProfitGrowth