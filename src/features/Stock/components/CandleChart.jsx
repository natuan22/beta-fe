import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock'; // Import highstock module
import HighchartsReact from 'highcharts-react-official';
import stockModule from 'highcharts/modules/stock'; // Import module "stock"
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataCandleChart } from '../thunk';
import Loading from '../../Chart/utils/Loading';
import { timeLineChart9h00, timeLineChart15h00 } from '../../../helper/dateTime.helper'
stockModule(Highcharts); // Kích hoạt module "stock"
const CandleChart = ({ code }) => {
    const dispatch = useDispatch()
    const { dataCandleChart } = useSelector(state => state.stock)
    const [price, setPrice] = useState()
    console.log({ dataCandleChart })
    console.log(timeLineChart9h00, timeLineChart15h00)
    useEffect(() => {
        dispatch(fetchDataCandleChart(code))
    }, [dispatch, code])

    useEffect(() => {
        if (dataCandleChart?.length > 0) {
            const priceArray = dataCandleChart.map(item => {
                return [item.time, item.closePrice]
            })
            setPrice(priceArray)
        }
    }, [dataCandleChart])


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
                data: price,
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
            tickInterval: 30 * 60 * 1000,
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
