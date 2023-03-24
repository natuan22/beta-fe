import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';

const Top10Sell = () => {
    const dataTopNetForeignChange = useSelector(state => state.chart.dataTopNetForeignChange);
    const [data, setData] = useState([])

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
            backgroundColor: "black",
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
            color: 'red'
        }],
        xAxis: [{
            categories: netSell.map(item => item.ticker),
            reversed: true,
            opposite: true,
            title: {
                text: null,
                style: {
                    color: "#fff",
                },
            },
            labels: {
                style: {
                    color: "#fff",
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
                    color: "#fff",
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
                <HighchartsReact highcharts={Highcharts} options={optionsSell} containerProps={{ style: { height: '673px', width: '100%' } }} />
            </div>
        </>
    )
}

export default Top10Sell