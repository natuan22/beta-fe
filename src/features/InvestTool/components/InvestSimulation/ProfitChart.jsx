import React, { useEffect, useState } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from "highcharts";
import Loading from '../../../Chart/utils/Loading';
import moment from 'moment';

const ProfitChart = ({ data }) => {
    const [timeLine, setTimeLine] = useState()
    const [dataFormat, setDataFormat] = useState()

    useEffect(() => {
        if (data?.length > 0) {
            const uniqueDates = [...new Set(data?.map(item => moment(item.date).format('DD/MM/YYYY')))];
            setTimeLine(uniqueDates)

            const result = [];

            data?.forEach(item => {
                const colorArr = ['#FFD300', '#0056FF', '#D90202', '#fff'];
                const name = item.name;
                const value = +item.value.toFixed(2);

                const existingObj = result.find(obj => obj.name === name);

                if (existingObj) {
                    existingObj.data.push(value);
                } else {
                    const uniqueColorIndex = result.length % colorArr.length; // Lấy chỉ mục màu duy nhất
                    result.push({
                        name: name,
                        data: [value],
                        color: colorArr[uniqueColorIndex] // Lấy màu từ mảng colorArr bằng chỉ mục màu duy nhất
                    });
                }
            })
            setDataFormat(result)
        }
    }, [data])
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
                },
                gridLineWidth: 0.5,
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
                gridLineWidth: 0.5,
            },

        ],
        legend: {
            align: 'center',
            itemStyle: {
                fontSize: '10px',
                color: localStorage.getItem('color')
            }
        },


        series: dataFormat,
    };
    return (
        <div>
            <div className="border-solid border-[#9E9E9E] border-b-2 border-t-0 border-x-0 md:w-[405px] sm:w-[265px]">
                <div className="dark:text-white text-black font-semibold flex items-center uppercase">
                    BIỂU ĐỒ LÃI LỖ
                </div>
            </div>
            {data?.length > 0 ? (
                <div className='h-[350px]'>
                    <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                </div>
            ) : (
                <div className="h-[350px] flex items-center justify-center"><Loading /></div>
            )}
        </div>
    )
}

export default ProfitChart