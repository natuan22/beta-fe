import React, { useEffect, useState } from 'react'
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Loading from '../../../../Chart/utils/Loading';
import { memo } from 'react';
import { hashTb } from '../../FinancialHealth/Chart/utils/hashTb';

const ChartLiquidityGrowth = (props) => {
    const { dataChartLiquidityGrowth } = useSelector(state => state.market)
    console.log(dataChartLiquidityGrowth)
    const { industryQuery } = props
    console.log(industryQuery)
    const checkIndustry = industryQuery.split(',')
    const mappedKeys = checkIndustry.map((query) => Object.keys(hashTb).find((key) => hashTb[key] === query));
    const [data, setData] = useState()
    const [timeLine, setTimeLine] = useState()
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);
    useEffect(() => {
        setColorText(color);
    }, [color])

    useEffect(() => {
        if (dataChartLiquidityGrowth?.length > 0) {
            const result = [];
            const uniqueDates = [...new Set(dataChartLiquidityGrowth?.map(item => moment(item.date).format('DD/MM/YYYY')))];
            setTimeLine(uniqueDates)
            dataChartLiquidityGrowth?.forEach(item => {
                if (mappedKeys.includes(item.industry)) {
                    const foundItem = result.find(x => x.name === item.industry);
                    if (foundItem) {
                        foundItem.data.push(item.perChange);
                    } else {
                        result.push({
                            name: item.industry,
                            color: item.color,
                            data: [item.perChange]
                        });
                    }
                }
            });
            setData(result)
        }
    }, [dataChartLiquidityGrowth, industryQuery])

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


