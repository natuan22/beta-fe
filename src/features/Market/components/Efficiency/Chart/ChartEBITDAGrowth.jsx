import React, { useEffect, useState } from 'react'
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataChartEBITDAGrowth } from '../../../thunk';

const ChartEBITDAGrowth = (props) => {
    const dispatch = useDispatch()
    const { exchange, industryQuery, order, timeFrame } = props
    const { dataChartEBITDAGrowth } = useSelector(state => state.market)
    const [data, setData] = useState()
    const [timeLine, setTimeLine] = useState()
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        dispatch(fetchDataChartEBITDAGrowth(exchange, industryQuery, timeFrame, order))
        setColorText(color);
    }, [props, color])

    // console.log('dataChartEBITDAGrowth', dataChartEBITDAGrowth);

    return (
        <>
            <div>ChartEBITDAGrowth</div>
        </>
    )
}

export default ChartEBITDAGrowth