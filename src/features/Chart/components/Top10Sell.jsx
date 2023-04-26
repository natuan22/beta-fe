import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';

const Top10Sell = () => {
    const dataTopNetForeignChange = useSelector(state => state.chart.dataTopNetForeignChange);
    const [data, setData] = useState([])
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        setColorText(color);
    }, [color]);
    useEffect(() => {
        if (dataTopNetForeignChange.data)
            setData(dataTopNetForeignChange.data)
    }, [dataTopNetForeignChange])

    const netSell = data.slice(-10).sort(function () {
        return -1;
    })

    const optionsSell = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {
            type: "bar",
            backgroundColor: "transparent",
        },
        title: {
            text: null
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Giảm',
            data: netSell.map(item => +item.net_value.toFixed(2)),
            color: '#ff0000'
        }],
        xAxis: [{
            categories: netSell.map(item => item.ticker),
            reversed: true,
            opposite: true,
            title: {
                text: null,
                style: {
                    color: colorText,
                },
            },
            labels: {
                style: {
                    color: colorText,
                },
            },
        }],
        yAxis: {
            gridLineWidth: 0,
            title: {
                text: null
            },
            labels: {
                style: {
                    color: colorText,
                },
            },
        },
        plotOptions: {
            bar: {
                borderWidth: 0
            },
            series: {
                borderRadius: 5
            }
        },
    }

    return (
        <>
            <div className="chart">
                <HighchartsReact highcharts={Highcharts} options={optionsSell} containerProps={{ style: { height: '670px', width: '100%' } }} />
            </div>
        </>
    )
}

export default Top10Sell