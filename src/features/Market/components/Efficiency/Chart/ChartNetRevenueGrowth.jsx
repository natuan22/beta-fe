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
    const [category, setCategory] = useState()
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        dispatch(fetchDataChartNetRevenueGrowth(exchange, industryQuery, timeFrame, order))
        setColorText(color);
    }, [props, color])
    useEffect(() => {
        if (dataChartNetRevenueGrowth?.length > 0) {
            const transformedData = dataChartNetRevenueGrowth?.map(item => {
                const year = item.date.slice(0, 4);
                const quarter = item.date.slice(4);
                const transformedDate = `Q${quarter} ${year}`;
                return { ...item, date: transformedDate };
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
    }, [dataChartNetRevenueGrowth])
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
                color: localStorage.getItem('color')
            }
        },

        series: data,
    };
    return (
        <>
            <div>
                <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
            </div>
        </>
    )
}

export default ChartNetRevenueGrowth