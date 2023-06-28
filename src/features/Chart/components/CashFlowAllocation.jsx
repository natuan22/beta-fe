import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Loading from "../utils/Loading";
import socket from "../utils/socket";

const CashFlowAllocation = () => {
    const dataCashFlowAllocation = useSelector((state) => state.chart.dataCashFlowAllocation);
    const [data, setData] = useState([])
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        setColorText(color);
    }, [color]);

    useEffect(() => {
        if (dataCashFlowAllocation.data) {
            setData(dataCashFlowAllocation.data)
        }
    }, [dataCashFlowAllocation])

    useEffect(() => {
        if (dataCashFlowAllocation.data) {
            socket.on("listen-phan-bo-dong-tien", (newData) => {
                setData(newData)
            });
        }
    }, [data])

    const options = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {
            type: "column",
            backgroundColor: "transparent",
        },
        title: {
            text: "",
        },
        xAxis: {
            type: 'category',
            labels: {
                style: {
                    color: localStorage.getItem('color')
                }
            },
        },
        yAxis: {
            title: {
                text: "",
            },
            labels: {
                style: {
                    color: localStorage.getItem('color')
                }
            },
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            column: {
                colorByPoint: true, // enable per-point coloring
                threshold: 0, // set the threshold at zero
                borderWidth: 0
            },
            series: {
                borderRadius: 2
            }
        },
        tooltip: {
            shared: true,
            useHTML: true,
            valueSuffix: " ",
            pointFormatter: function () {
                return (
                    '<span style="color:' + this.color + '">●</span>' + '<span>' + ' ' + this.name + ": <b>" + this.y + "</b></span>  <b>" + "</b><br/>"
                );
            },
        },
        series: [{
            data: [
                { name: 'Tăng', y: +(data.increase / 1000000000).toFixed(2), color: '#19d216' }, // thiết lập màu cho cột tăng
                { name: 'Giảm', y: +(data.decrease / 1000000000).toFixed(2), color: '#ff0000' }, // thiết lập màu cho cột giảm
                { name: 'Không đổi', y: +(data.equal / 1000000000).toFixed(2), color: '#ffd51e' }, // thiết lập màu cho cột không đổi
            ],
        }]
    };

    return (
        <>
            <div id="chart-container">
                {dataCashFlowAllocation.data ? (
                    <div className="h-[300px]">
                        <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                    </div>
                ) : (
                    <div className="h-[70px] flex flex-col items-center justify-center  "><Loading /></div>
                )}
            </div>
        </>
    );
}

export default CashFlowAllocation;