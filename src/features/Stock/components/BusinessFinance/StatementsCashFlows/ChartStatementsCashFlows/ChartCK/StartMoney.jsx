import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loading from "../../../../../../Chart/utils/Loading";

const StartMoney = ({ queryApiBusinessFinance }) => {
    const { dataChartStatementsCashFlows } = useSelector(state => state.stock)
    const [timeLine, setTimeLine] = useState()
    const [data, setData] = useState()

    useEffect(() => {
        if (dataChartStatementsCashFlows?.length > 0) {
            let modifiedArray;

            if (queryApiBusinessFinance.order === '0') {
                modifiedArray = dataChartStatementsCashFlows.map(item => {
                    const modifiedName = `${item.name.toLowerCase().replace('tiền và các khoản tương đương tiền đầu kỳ', 'Đầu kỳ')}`;
                    const year = item.date.slice(0, 4);
                    const quarter = item.date.slice(4);

                    return { ...item, name: modifiedName, date: `Quý ${quarter}/${year}` };
                });
            } else {
                modifiedArray = dataChartStatementsCashFlows.map(item => {
                    const modifiedName = `${item.name.toLowerCase().replace('tiền và các khoản tương đương tiền đầu kỳ', 'Đầu kỳ')}`;
                    return { ...item, name: modifiedName, date: `Năm ${item.date}` };
                });
            }

            const uniqueDates = [...new Set(modifiedArray?.map(item => item.date))];
            setTimeLine(uniqueDates)

            const result = [];

            modifiedArray?.forEach(item => {
                const name = item.name;
                const value = +(item.value / queryApiBusinessFinance.unit).toFixed(2);
                const color = item.color;

                const existingObj = result.find(obj => obj.name === name);

                if (existingObj) {
                    existingObj.data.push(value);
                } else {
                    result.push({
                        name: name,
                        data: [value],
                        color
                    });
                }
            })
            setData(result)
        }
    }, [dataChartStatementsCashFlows, queryApiBusinessFinance])

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
            categories: timeLine,
            labels: {
                style: {
                    color: localStorage.getItem('color'), // màu cho các nhãn trục x
                    fontSize: '9px',
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
            enabled: false,
            align: 'center',
            itemStyle: {
                fontSize: '10px',
                color: localStorage.getItem('color')
            }
        },

        series: Array.isArray(data) && data.slice(3, 4),
    };
    return (
        <div>
            {dataChartStatementsCashFlows?.length > 0 ? (
                <div className='h-[321px]'>
                    <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                </div>
            ) : (
                <div className="h-[321px] flex items-center justify-center"><Loading /></div>
            )}
        </div>
    )
}

export default StartMoney