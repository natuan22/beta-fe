import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from "react-redux";
import socket from "../../Chart/utils/socket";
import Loading from "../../Chart/utils/Loading";

function ThanhKhoan() {
    const dataToday = useSelector((state) => state.chart.dataChart1);
    const dataPreviousDay = useSelector((state) => state.chart.dataChart2);
    const [dataSocket, setDataSocket] = useState([]);
    useEffect(() => {
        if (dataToday) {
            setDataSocket(dataToday)
        }
        if (dataToday) {
            socket.on("listen-thanh-khoan-phien-hien-tai", (newData) => {
                setDataSocket((prevData) => [...prevData, ...newData]);
            });
        }
    }, [dataToday]);

    if (!dataPreviousDay.length && !dataToday.length)
        return (
            <div>
                <Loading />
            </div>
        );
    // Thiết lập cấu hình cho biểu đồ
    const options = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {
            type: "area",
            backgroundColor: "transparent",
        },
        title: {
            text: "",
        },
        xAxis: {
            type: "datetime",
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
        },
        yAxis: {
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
        },

        legend: {
            itemStyle: {
                color: "#fff",
            },
        },
        series: [
            {
                name: "Phiên trước",
                data:
                    dataPreviousDay &&
                    dataPreviousDay.length &&
                    dataPreviousDay.map((item) => [item.time, item.value]),
                color: "#ff0000",
                opacity: "0.9",
                lineColor: "#ff0000",
                lineWidth: 2,
                marker: {
                    enabled: false,
                },
            },
            {
                name: "Hôm nay",
                data:
                    dataSocket &&
                    dataSocket.length &&
                    dataSocket.map((item) => [item.time, item.value]),
                color: "#2AF371",
                opacity: "0.7",
                lineColor: "#2AF371",
                lineWidth: 2,
                marker: {
                    enabled: false,
                },
            },
        ],
    };

    return (
        <>
            {dataPreviousDay?.length && dataToday?.length ? (
                <div className="">
                    <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default ThanhKhoan;