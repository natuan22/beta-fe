import React, { useEffect, useState } from 'react'
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux'
import Loading from '../../../../Chart/utils/Loading';
import { hashTb } from '../../FinancialHealth/Chart/utils/hashTb';

const ChartGrossProfitGrowth = (props) => {
    const { dataChartGrossProfitGrowth } = useSelector(state => state.market)
    const { industryQuery } = props
    const [data, setData] = useState()
    const [category, setCategory] = useState()

    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    const checkIndustry = industryQuery.split(',')
    const mappedKeys = checkIndustry.map((query) => Object.keys(hashTb).find((key) => hashTb[key] === query));

    useEffect(() => {
        setColorText(color);
    }, [props, color])

    useEffect(() => {
        if (dataChartGrossProfitGrowth?.length > 0) {
            const transformedData = dataChartGrossProfitGrowth?.map(item => {
                const year = item.date.slice(0, 4);
                const quarter = item.date.slice(4);
                const transformedDate = `Q${quarter} ${year}`;
                return { ...item, date: transformedDate };
            });

            const uniqueIndustry = [...new Set(transformedData.filter(item => mappedKeys.includes(item.industry)).map(item => item.industry))];
            const mappedData = [];

            transformedData?.forEach(item => {
                if (mappedKeys.includes(item.industry)) {
                    const colorArr = ['#D0DFFF', '#044DED', '#A8C2FB', '#0F639A', '#6893EF', '#3D78E0', '#1D63DC', '#155AD1', '#0B4DBD', '#0F459F', '#93D2FE', '#78C5FD', '#61BAFE', '#3EADFF', ' #0E97FF', '#005073', '#117DAC', '#189BD3', '#1DBBD6', ' #72C7EC'];
                    const existingItem = mappedData.find(mappedItem => mappedItem.name === item.date);

                    if (existingItem) {
                        existingItem.data.push(+(item.perChange).toFixed(2));
                    } else {
                        const uniqueColorIndex = mappedData.length % colorArr.length; // Lấy chỉ mục màu duy nhất
                        mappedData.push({
                            name: item.date,
                            data: [+(item.perChange).toFixed(2)],
                            color: colorArr[uniqueColorIndex] // Lấy màu từ mảng colorArr bằng chỉ mục màu duy nhất
                        });
                    }
                }
            })
            setCategory(uniqueIndustry)
            setData(mappedData)
        }
    }, [dataChartGrossProfitGrowth, industryQuery])

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
            {dataChartGrossProfitGrowth.length ? (
                <div id="chart-container">
                    <div className="h-[450px] mt-3">
                        <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                    </div>
                </div>
            ) : (
                <div id="chart-container">
                    <div className="mt-14 mb-[379px] flex flex-col justify-center"><Loading /></div>
                </div>
            )}
        </div>
    )
}

export default ChartGrossProfitGrowth