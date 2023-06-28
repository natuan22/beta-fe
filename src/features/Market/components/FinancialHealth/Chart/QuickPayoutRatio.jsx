import moment from 'moment';
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { hashTb } from './utils/hashTb';
import Loading from '../../../../Chart/utils/Loading';

const QuickPayoutRatio = (props) => {
    const { dataChartPayoutRatio } = useSelector(state => state.market)
    const { industryQuery } = props
    const [data, setData] = useState()
    const [category, setCategory] = useState()

    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    const checkIndustry = industryQuery.split(',')
    const mappedKeys = checkIndustry.map((query) => Object.keys(hashTb).find((key) => hashTb[key] === query));

    useEffect(() => {
        setColorText(color);
    }, [color])

    useEffect(() => {
        if (dataChartPayoutRatio?.length > 0) {
            const transformedData = dataChartPayoutRatio?.map(item => {
                return { ...item, date: moment(item.date).format('DD/MM/YYYY') };
            });

            const uniqueIndustry = [...new Set(transformedData.filter(item => mappedKeys.includes(item.industry)).map(item => item.industry))];
            const mappedData = [];

            transformedData?.forEach(item => {
                if (mappedKeys.includes(item.industry)) {
                    const colorArr = ['#147DF5', '#E7C64F'];
                    const existingItem = mappedData.find(mappedItem => mappedItem.name === item.date);

                    if (existingItem) {
                        existingItem.data.push(+(item.quickRatio).toFixed(2));
                    } else {
                        const uniqueColorIndex = mappedData.length % colorArr.length; // Lấy chỉ mục màu duy nhất
                        mappedData.push({
                            name: item.date,
                            data: [+(item.quickRatio).toFixed(2)],
                            color: colorArr[uniqueColorIndex] // Lấy màu từ mảng colorArr bằng chỉ mục màu duy nhất
                        });
                    }
                }
            })
            setCategory(uniqueIndustry)
            setData(mappedData)
        }
    }, [dataChartPayoutRatio, industryQuery])
    // config chart
    const options = {
        chart: {
            backgroundColor: "transparent", // màu nền của biểu đồ
            type: 'bar'
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
            {dataChartPayoutRatio.length ? (
                <div id="chart-container">
                    <div className="h-[500px] mt-3">
                        <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                    </div>
                </div>
            ) : (
                <div id="chart-container">
                    <div className="mt-14 mb-[428px]  grid place-items-center"><Loading /></div>
                </div>
            )}
        </div>
    )
}

export default QuickPayoutRatio