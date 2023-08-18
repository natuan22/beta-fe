import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataTransactionData } from '../../thunk';
import Loading from '../../../Chart/utils/Loading';
import HighchartsReact from 'highcharts-react-official'
import Highcharts from "highcharts";
import moment from 'moment';

const TotalMatchingVolume = ({ stock, from, to }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([])
    const [timeLine, setTimeLine] = useState()
    const { dataTransactionData } = useSelector(state => state.stock)

    const processData = (data) => {
        const omVolData = [];
        const closePriceData = [];

        data.forEach(item => {
            omVolData.push(item.omVol);
            closePriceData.push(item.closePrice);
        });

        return [
            {
                type: 'column',
                data: omVolData.reverse(),
                name: 'KLGD khớp lệnh',
                yAxis: 0,
                color: { // Thêm thuộc tính color ở đây
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1,
                    },
                    stops: [
                        [0, 'rgba(57,234,202,1)'],
                        [0.2, 'rgba(44,185,185,1)'],
                        [0.4, 'rgba(48,153,198,1)'],
                        [0.61, 'rgba(54,90,185,1)'],
                        [0.78, 'rgba(49,23,201,1)'],
                    ],
                },


            },
            {
                type: 'spline',
                data: closePriceData.reverse(),
                name: 'Giá',
                yAxis: 1,
                color: '#37FF05'
            }
        ];
    };

    useEffect(() => {
        dispatch(fetchDataTransactionData(stock, dayjs(from).format('YYYY-MM-DD'), dayjs(to).format('YYYY-MM-DD')));
    }, [dispatch, stock, from, to]);

    useEffect(() => {
        if (dataTransactionData?.length > 0) {
            const uniqueDates = [...new Set(dataTransactionData?.map(item => moment(item.date).format('DD/MM/YYYY')))];
            setTimeLine(uniqueDates.reverse())
            setData(processData(dataTransactionData))
        }
    }, [dataTransactionData, stock, from, to])

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
            },
            gridLineWidth: 0,
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
        plotOptions: {
            series: {
                marker: {
                    radius: 2, // Giá trị bán kính marker
                },
            },
        },
        legend: {
            enabled: true,
            align: 'center',
            itemStyle: {
                color: localStorage.getItem('color')
            }
        },
        tooltip: {
            split: true
        },
        series: data,
    };

    return (
        <div>
            {dataTransactionData?.length > 0 ? (
                <>
                    <div className='h-[460px] mt-4'>
                        <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                    </div>
                </>
            ) : (
                <div className="h-[460px] flex items-center justify-center"><Loading /></div>
            )}
        </div>
    )
}

export default TotalMatchingVolume