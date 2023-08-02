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
    const [volumeTrade, setVolumeTrade] = useState()
    useEffect(() => {
        dispatch(fetchDataCandleChart(code))
    }, [dispatch, code])

    useEffect(() => {
        if (dataCandleChart?.length > 0) {
            const priceArray = dataCandleChart.map(item => {
                return [item.time, item.closePrice]
            })
            const volumeArray = dataCandleChart.map(item => {
                return [item.time, item.totalVol]
            })
            setPrice(priceArray)
            setVolumeTrade(volumeArray)
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
            text: '',
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
            {
                type: 'column',
                name: 'Khối lượng giao dịch',
                data: volumeTrade,
                yAxis: 1, // Đặt dữ liệu này trên trục thứ hai
            },
        ],
        yAxis: [
            {
                // Cấu hình trục giá cổ phiếu
                title: {
                    text: 'Giá cổ phiếu',
                    style: {
                        color: 'white',
                        fontWeight: 'semibold',
                        align: 'high',
                        x: 10,
                    }
                },
                height: '70%',
                gridLineWidth: 0,
                crosshair: false,
                labels: {
                    style: {
                        color: 'white',
                    },
                },
            },
            {
                // Cấu hình trục khối lượng giao dịch
                title: {
                    text: 'KLGD',
                    style: {
                        color: 'white',
                        fontWeight: 'semibold'
                    }
                },
                labels: {
                    style: {
                        color: 'white',
                    },
                },
                gridLineWidth: 0,
                top: '75%', // Vị trí bắt đầu của cửa sổ biểu đồ khối lượng
                height: '25%', // Chiều cao của cửa sổ biểu đồ khối lượng
                offset: 0, // Làm cho cửa sổ khối lượng không bị lệch khi kéo biểu đồ nến
            },
        ],
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
    };

    return (
        <div>
            {dataCandleChart?.length > 0 ? <HighchartsReact highcharts={Highcharts} options={options} /> : <div><Loading /></div>}
        </div>
    )
};

export default CandleChart;
