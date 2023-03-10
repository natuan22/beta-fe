import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

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

    const series = [{
        name: 'Bán',
        data: netSell.map(item => item.net_value.toFixed(2)),
    }]

    const options = {
        grid: {
            show: false,      // you can either change hear to disable all grids
            xaxis: {
                lines: {
                    show: false  //or just here to disable only x axis grids
                }
            },
            yaxis: {
                lines: {
                    show: true  //or just here to disable only y axis
                }
            },
        },
        chart: {
            background: '#020203',
            toolbar: {
                show: false,
            },
            type: 'bar',
            fontFamily: 'Segoe UI',
        },
        title: {
            text: '',
            align: 'center',
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    position: 'top'
                },
                horizontal: true,
                barHeight: '50%',
                borderRadius: 0
            }
        },
        fill: {
            colors: '#fe0001'
        },
        dataLabels: {
            enabled: false,
            offsetX: 43,
            style: {
                colors: ['#212529']
            },
        },
        xaxis: {
            categories: netSell.map(item => item.ticker),
            labels: {
                show: true,
                formatter: function (y) {
                    return y.toFixed(2);
                },
                style: {
                    colors: '#fff',
                }
            },
            axisTicks: {
                show: false,
            }
        },
        yaxis: {
            opposite: true,
            labels: {
                style: {
                    colors: '#fff',
                }
            }
        }
    };

    return (
        <>
            <div className="chart">
                <ReactApexChart options={options} series={series} type="bar" height={630} />
            </div>
        </>
    )
}

export default Top10Sell