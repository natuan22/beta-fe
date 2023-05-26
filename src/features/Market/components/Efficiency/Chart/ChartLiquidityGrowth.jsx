import React, { useEffect } from 'react'
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import { useDispatch } from 'react-redux';
import { fetchDataChartLiquidityGrowth } from '../../../thunk';

const ChartLiquidityGrowth = (props) => {
    const { exchange, industryQuery, order, timeFrame } = props
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchDataChartLiquidityGrowth(exchange, industryQuery, timeFrame, order))
    }, [])

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
            text: null,
        },
        legend: {
            enabled: true,
            itemStyle: {
                color: localStorage.getItem('color'),
                fontWeight: 'bold'
            }
        },
        xAxis: [{
            title: {
                text: null,
                style: {
                    color: localStorage.getItem('color'),
                },
            },
            labels: {
                style: {
                    color: localStorage.getItem('color'),
                    fontSize: '9px',
                },
            },
        }],
        yAxis: {
            title: {
                text: null
            },
            labels: {
                style: {
                    color: localStorage.getItem('color'),
                },
            },
        },
        plotOptions: {
            series: {
                marker: {
                    radius: 2, // Giá trị bán kính marker
                },
            }
        },
    }
    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
        </div>
    )
}

export default ChartLiquidityGrowth


