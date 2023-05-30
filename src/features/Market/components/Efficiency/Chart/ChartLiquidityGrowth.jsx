import React, { useEffect, useState } from 'react'
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataChartLiquidityGrowth } from '../../../thunk';
import moment from 'moment';
import Loading from '../../../../Chart/utils/Loading';
import { memo } from 'react';

const ChartLiquidityGrowth = (props) => {
    const dispatch = useDispatch()
    const { exchange, industryQuery, order, timeFrame } = props
    const { dataChartLiquidityGrowth } = useSelector(state => state.market)
    const [data, setData] = useState()
    const [timeLine, setTimeLine] = useState()
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        dispatch(fetchDataChartLiquidityGrowth(exchange, industryQuery, timeFrame, order))
        setColorText(color);
    }, [props, color])

    useEffect(() => {
        if (dataChartLiquidityGrowth?.length > 0) {
            const mappedData = [];
            const uniqueDates = [...new Set(dataChartLiquidityGrowth?.map(item => moment(item.date).format('DD/MM/YYYY')))];
            setTimeLine(uniqueDates)
            dataChartLiquidityGrowth.forEach(item => {
                const existingItem = mappedData.find(mappedItem => mappedItem.name === item.industry);
                if (existingItem) {
                    existingItem.data.push(+(item.perChange).toFixed(2));
                } else {
                    mappedData.push({
                        name: item.industry,
                        color: item.color,
                        data: [item.perChange]
                    });
                }
            });
            setData(mappedData)
        }
    }, [dataChartLiquidityGrowth])

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
            enabled: false,
            itemStyle: {
                color: localStorage.getItem('color'),
                fontWeight: 'bold'
            }
        },
        xAxis: [{
            categories: timeLine,
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
        series: data
    }
    return (
        <div>
            {dataChartLiquidityGrowth.length ? (
                <div id="chart-container">
                    <div className="h-[450px] mt-3">
                        <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                    </div>
                </div>
            ) : (
                <div id="chart-container">
                    <div className="mt-14 mb-24"><Loading /></div>
                </div>
            )}
        </div>
    )
}

export default memo(ChartLiquidityGrowth)


