import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Top10Buy = () => {
    const dataTop10Buy = useSelector(state => state.chart.dataTop10Buy);
    const [data, setData] = useState(dataTop10Buy)

    useEffect(() => {
        setData(dataTop10Buy)
    }, [dataTop10Buy])

    const sortedData = data && data.data ? [...data.data].sort((a, b) => a.value- b.value) : []
    const top10 = sortedData.slice(-10).sort(function () {
        return -1;
    })

    const series = [{
        name: 'Mua',
        data: top10.map(item => item.value.toFixed(2)),
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
            colors: '#19d216'
        },
        dataLabels: {
            enabled: false,
            offsetX: 43,
            style: {
                colors: ['#212529']
            },
        },
        xaxis: {
            categories: top10.map(item => item.ticker),

            // labels: {
            //     style: {
            //         colors: '#fff',
            //     }
            // }
        },
        yaxis: {
            // labels: {
            //     style: {
            //         colors: '#fff',
            //     }
            // }

            labels: {
                // style: {
                //     colors: '#fff',
                // }
            }
        },
        yaxis: {
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

export default Top10Buy