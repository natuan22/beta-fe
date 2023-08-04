import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts'; // Import highstock module
import HighchartsReact from 'highcharts-react-official';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataCandleChart } from '../thunk';
import Loading from '../../Chart/utils/Loading';
import { timeLineChart9h00, timeLineChart15h00, timeCandleChart9h, timeCandleChart15h } from '../../../helper/dateTime.helper'
const CandleChart = ({ code, dataChart }) => {
    const dispatch = useDispatch()
    const { dataCandleChart } = useSelector(state => state.stock)
    const [data, setData] = useState([])
    useEffect(() => {
        dispatch(fetchDataCandleChart(code))
    }, [dispatch, code])

    useEffect(() => {
        if (dataCandleChart?.length > 0) {
            const mappedData = dataCandleChart.map(item => ([item.time, item.closePrice]))
            setData(mappedData)
        }
    }, [dataCandleChart])
    useEffect(() => {
        if (dataChart?.length > 0) {
            setData((preData) => ([...preData, dataChart]))
        }
    }, [dataChart]);
    const options = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {
            backgroundColor: 'transparent'
        },
        title: {
            text: 'Diễn biến giao dịch',
            style: {
                color: 'white',
                fontSize: '13px'
            }
        },
        rangeSelector: {
            selected: 1, // Chọn khoảng thời gian mặc định để hiển thị
        },
        plotOptions: {
            series: {
                marker: {
                    radius: 3
                }
            }
        },
        series: [
            {
                type: 'spline', // Loại biểu đồ nến
                name: 'Giá cổ phiếu',
                data: data,
                color: '#7cb5ec'
            },

        ],
        yAxis: {
            title: {
                text: "",
                style: {
                    color: localStorage.getItem('color'),
                },
            },
            labels: {
                style: {
                    color: localStorage.getItem('color'),
                },

            },
            gridLineWidth: 0.5,
        },
        xAxis: {
            type: "datetime",
            tickInterval: 60 * 60 * 1000,
            min: timeLineChart9h00,
            max: timeLineChart15h00,
            title: {
                text: null,
                style: {
                    color: localStorage.getItem('color'),
                },
            },
            labels: {
                // rotation: -45,
                style: {
                    color: localStorage.getItem('color'),
                },
            },
            crosshair: true,
        },
        tooltip: {
            split: true
        },
        legend: {
            enabled: false, // Tắt chú thích
        },
    };

    return (
        <div>
            {dataCandleChart?.length > 0 ? <HighchartsReact highcharts={Highcharts} options={options} /> : <div><Loading /></div>}
        </div>
    )
};

export default CandleChart;