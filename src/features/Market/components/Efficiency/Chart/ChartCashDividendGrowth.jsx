import React, { useEffect, useState } from 'react'
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataChartCashDividendGrowth } from '../../../thunk'
import Loading from '../../../../Chart/utils/Loading';
import moment from 'moment';

const ChartCashDividendGrowth = (props) => {
    const dispatch = useDispatch()
    const { exchange, industryQuery, order, timeFrame } = props
    const { dataChartCashDividendGrowth } = useSelector(state => state.market)
    const [data, setData] = useState()
    const [category, setCategory] = useState()
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        dispatch(fetchDataChartCashDividendGrowth(exchange, industryQuery, timeFrame, order))
        setColorText(color);
    }, [props, color])

    useEffect(() => {
        if (dataChartCashDividendGrowth?.length > 0) {
            const transformedData = dataChartCashDividendGrowth?.map(item => {
                return { ...item, date: moment(item.date).format('DD/MM/YYYY') };
            });

            const uniqueIndustry = [...new Set(transformedData?.map(item => item.industry))];
            const mappedData = [];

            transformedData.forEach(item => {
                const existingItem = mappedData.find(mappedItem => mappedItem.name === item.date);
                if (existingItem) {
                    existingItem.data.push(+(item.perChange).toFixed(2));
                } else {
                    mappedData.push({
                        name: item.date,
                        data: [+(item.perChange).toFixed(2)]
                    });
                }
            });
            setCategory(uniqueIndustry)
            setData(mappedData)
        }
    }, [dataChartCashDividendGrowth])

    // config chart
    const options = {
        chart: {
            backgroundColor: "transparent", // màu nền của biểu đồ
            type: 'column'
        },
        accessibility: {
            enabled: false
        },
        credits: false,
        title: {
            text: "",
            style: {
                color: 'white'
            }
        },
        xAxis: {
            categories: category,
            labels: {
                style: {
                    color: localStorage.getItem('color') // màu cho các nhãn trục x
                }
            },
            title: {
                style: {
                    color: localStorage.getItem('color') // màu cho tiêu đề trục x
                }
            }
        },
        yAxis: [
            {
                title: {
                    text: "",
                    style: {
                        color: localStorage.getItem('color'),
                    },
                },
                labels: {
                    style: {
                        color: localStorage.getItem('color') // màu cho các nhãn trục y
                    },
                    formatter: function () {
                        return this.value + "%";
                    },
                }
            },
            {
                title: {
                    text: "",
                    style: {
                        color: localStorage.getItem('color'),
                    },
                },
                labels: {
                    style: {
                        color: localStorage.getItem('color') // màu cho các nhãn trục y
                    }
                },
                opposite: true,
            },

        ],
        legend: {
            align: 'center',
            itemStyle: {
                fontSize: '10px',
                color: localStorage.getItem('color')
            }
        },

        series: data,
    };

    return (
        <div>
            {dataChartCashDividendGrowth.length ? (
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

export default ChartCashDividendGrowth