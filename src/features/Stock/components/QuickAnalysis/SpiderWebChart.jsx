import React, { useEffect } from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../Chart/utils/Loading';
import { gatherTotalStars } from '../../thunk';

const SpiderWebChart = ({ queryApi }) => {
    const dispatch = useDispatch()
    const { dataTotalStar } = useSelector(state => state.stock)

    useEffect(() => {
        dispatch(gatherTotalStars())
    }, [dispatch])

    const options = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {
            polar: true,
            type: 'area',
            backgroundColor: "transparent", // màu nền của biểu đồ
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: dataTotalStar?.map(item => item.name),
            tickmarkPlacement: 'on',
            lineWidth: 0,
            labels: {
                style: {
                    color: localStorage.getItem('color'), // màu cho các nhãn trục x
                    fontFamily: 'Roboto', // Sử dụng font chữ "Roboto"
                }
            },
        },
        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0,
            labels: {
                enabled: false
            },
        },
        legend: {
            enabled: false,
            align: 'right',
            verticalAlign: 'middle',
            layout: 'vertical'
        },
        series: [{
            name: queryApi.stock,
            data: dataTotalStar?.map(item => item.value),
            pointPlacement: 'on',
            fillColor: 'rgba(255, 211, 54, 0.3)', // Màu với độ mờ
            lineWidth: 2, // Độ dày của dòng
            color: '#FFD336', // Màu của dòng
        }],
    }

    return (
        <div>
            <div>
                {dataTotalStar?.length ? (
                    <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                ) : (
                    <div className='h-[300px] flex items-center justify-center'><Loading /></div>
                )}
            </div>
        </div>
    )
}

export default SpiderWebChart