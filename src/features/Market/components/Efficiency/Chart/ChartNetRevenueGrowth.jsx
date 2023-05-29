import React, { useEffect, useState } from 'react'
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataChartNetRevenueGrowth } from '../../../thunk'

const ChartNetRevenueGrowth = (props) => {
    const dispatch = useDispatch()
    const { exchange, industryQuery, order, timeFrame } = props
    const { dataChartNetRevenueGrowth } = useSelector(state => state.market)
    const [data, setData] = useState()
    const [timeLine, setTimeLine] = useState()
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        dispatch(fetchDataChartNetRevenueGrowth(exchange, industryQuery, timeFrame, order))
        setColorText(color);
    }, [props, color])

    // console.log('dataChartNetRevenueGrowth', dataChartNetRevenueGrowth);

    return (
        <>
            <div>ChartNetRevenueGrowth</div>
        </>
    )
}

export default ChartNetRevenueGrowth