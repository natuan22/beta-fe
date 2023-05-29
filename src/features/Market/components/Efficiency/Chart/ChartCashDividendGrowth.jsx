import React, { useEffect, useState } from 'react'
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataChartCashDividendGrowth } from '../../../thunk'

const ChartCashDividendGrowth = (props) => {
    const dispatch = useDispatch()
    const { exchange, industryQuery, order, timeFrame } = props
    const { dataChartCashDividendGrowth } = useSelector(state => state.market)
    const [data, setData] = useState()
    const [timeLine, setTimeLine] = useState()
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        dispatch(fetchDataChartCashDividendGrowth(exchange, industryQuery, timeFrame, order))
        setColorText(color);
    }, [props, color])

    console.log('dataChartCashDividendGrowth', dataChartCashDividendGrowth);

    return (
        <>
            <div>ChartCashDividendGrowth</div>
        </>
    )
}

export default ChartCashDividendGrowth