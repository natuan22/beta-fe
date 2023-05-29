import React, { useEffect, useState } from 'react'
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataChartEPSGrowth } from '../../../thunk';

const ChartEPSGrowth = (props) => {
    const dispatch = useDispatch()
    const { exchange, industryQuery, order, timeFrame } = props
    const { dataChartEPSGrowth } = useSelector(state => state.market)
    const [data, setData] = useState()
    const [timeLine, setTimeLine] = useState()
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        dispatch(fetchDataChartEPSGrowth(exchange, industryQuery, timeFrame, order))
        setColorText(color);
    }, [props, color])

    console.log('dataChartEPSGrowth', dataChartEPSGrowth);

    return (
        <>
            <div>ChartEPSGrowth</div>
        </>
    )
}

export default ChartEPSGrowth