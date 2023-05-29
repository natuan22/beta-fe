import React, { useEffect, useState } from 'react'
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataChartGrossProfitGrowth } from '../../../thunk';

const ChartGrossProfitGrowth = (props) => {
    const dispatch = useDispatch()
    const { exchange, industryQuery, order, timeFrame } = props
    const { dataChartGrossProfitGrowth } = useSelector(state => state.market)
    const [data, setData] = useState()
    const [timeLine, setTimeLine] = useState()
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        dispatch(fetchDataChartGrossProfitGrowth(exchange, industryQuery, timeFrame, order))
        setColorText(color);
    }, [props, color])

    console.log('dataChartGrossProfitGrowth', dataChartGrossProfitGrowth);

    return (
        <>
            <div>ChartGrossProfitGrowth</div>
        </>
    )
}

export default ChartGrossProfitGrowth