import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
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

    const optionsDecr = {
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
            data: decr10.map(item => +item['%5D'].toFixed(2)),
            color: 'red'
        }],
        xAxis: [{
            categories: decr10.map(item => item.ticker),
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
                borderRadius: 5,
            }
        },
    }

    const optionsIncr = {
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
            name: 'Tăng',
            data: incr10.map(item => +item['%5D'].toFixed(2)),
            color: '#50D950',
        }],
        xAxis: [{
            categories: incr10.map(item => item.ticker),
            reversed: true,
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
                            <HighchartsReact highcharts={Highcharts} options={optionsDecr} containerProps={{ style: { height: '717px', width: '100%' } }} />
                        </div>

                        <div className="text-center mx-1">
                            <HighchartsReact highcharts={Highcharts} options={optionsIncr} containerProps={{ style: { height: '717px', width: '100%' } }} />
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default TopROC