import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Top10Sell = () => {
    const dataTop10Sell = useSelector(state => state.chart.dataTop10Sell);
    const [data, setData] = useState(dataTop10Sell)

    useEffect(() => {
        setData(dataTop10Sell)
    }, [dataTop10Sell])

    const sortedData = data && data.data ? [...data.data].sort((a, b) => a.value - b.value) : []
    const last10 = sortedData.slice(0, 10)

    const series = [{
        name: 'Bán',
        data: last10.map(item => item.value.toFixed(2)),
    }]

    const options = {
        chart: {
            // background: '#020203',
            toolbar: {
                show: false,
            },
            type: 'bar',
            fontFamily: 'Segoe UI',
            width: '50%'
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
                borderRadius: 4,
                horizontal: true,
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
            categories: last10.map(item => item.ticker),

            // labels: {
            //     style: {
            //         colors: '#fff',
            //     }
            // }
        },
        yaxis: {
            opposite: true,
            labels: {
                // style: {
                //     colors: '#fff',
                // }
            }

        }
    };

    return (
        <>
            <div className="chart">
                <ReactApexChart options={options} series={series} type="bar" height={350} />
            </div>
        </>
    )
}

export default Top10Sell