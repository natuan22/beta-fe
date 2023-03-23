import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import { fetchDataROC5Phien } from '../thunk';
import chartStyle from "../utils/Chart.module.css";
import socket from '../utils/socket';

const TopROC = () => {
    const dispatch = useDispatch();
    const dataROC = useSelector(state => state.chart.dataROC5Phien);
    const [data, setData] = useState([])
    const [query, setQuery] = useState('hsx')
    const [socketOld, setSocketOld] = useState('')

    useEffect(() => {
        if (dataROC.data) {
            setData(dataROC.data)
        }
    }, [dataROC])

    useEffect(() => {
        conSocket(query)
        setSocketOld(query)
    }, [query])

    const disconnectSocket = (socketOld) => {
        if (socket.active) {
            socket.off(`listen-top-roc-${socketOld}`);
        }
    }

    const conSocket = (key) => {
        socket.on(`listen-top-roc-${key}`, (newData) => {
            setData(newData.sort((a, b) => b['%5D'] - a['%5D']))
        });
    }

    const incr10 = data.slice(0, 10)

    const decr10 = data.slice(-10).sort(function () {
        return -1;
    })

    const series = [{
        name: 'Tăng',
        data: incr10.map(item => item["%5D"].toFixed(2)),
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
            colors: '#19d216'
        },
        dataLabels: {
            enabled: false,
            offsetX: 30,
            style: {
                colors: ['#212529']
            },
        },
        xaxis: {
            categories: incr10.map(item => item.ticker),
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
            labels: {
                style: {
                    colors: '#fff',
                }
            }
        }
    };



    const series2 = [{
        name: 'Giảm',
        data: decr10.map(item => item["%5D"].toFixed(2)),
    }]

    const options2 = {
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
            offsetX: 30,
            style: {
                colors: ['#212529']
            },
        },
        xaxis: {
            categories: decr10.map(item => item.ticker),
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
                <div className="mx-2 mt-1 px-1.5 py-1.5 bg-[#151924]">

                    <div className="bg-[#020203] text-center px-20 pt-[19px]">
                        <span className="font-semibold text-base uppercase text-white">
                            Top 10 cổ phiếu tăng/giảm mạnh nhất sàn
                        </span>
                        <select className={`${chartStyle.selectStyle} bg-[#020203] hover:bg-gray-900 mx-2 rounded-lg p-1 text-base text-[#0097B2]`}
                            onChange={(event) => {
                                disconnectSocket(socketOld)
                                setQuery(event.target.value)
                                dispatch(fetchDataROC5Phien((event.target.value)))
                            }}>
                            <option value="hsx">HSX</option>
                            <option value="hnx">HNX</option>
                            <option value="upcom">UPCOM</option>
                        </select>
                        <span className="font-semibold uppercase text-white">qua 05 phiên gần nhất</span>
                    </div>

                    <div className="grid grid-cols-2 bg-[#020203]">
                        <div className="text-center mx-1">
                            <ReactApexChart options={options2} series={series2} type="bar" height={705} />
                        </div>

                        <div className="text-center mx-1">
                            <ReactApexChart options={options} series={series} type="bar" height={705} />
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default TopROC