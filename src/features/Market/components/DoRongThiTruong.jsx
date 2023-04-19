import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from "react-redux";
import moment from "moment";
import Loading from "../../Chart/utils/Loading";
import socket from "../../Chart/utils/socket";

const DoRongThiTruong = () => {
    const dataStackingChart = useSelector((state) => state.chart.dataStackingArea);
    const [data, setData] = useState([]);

    useEffect(() => {
        // Lấy dữ liệu ban đầu từ API
        if (dataStackingChart?.data) {
            setData(dataStackingChart.data);
        }
        // Lắng nghe sự kiện từ socket
        socket.on("listen-do-rong-thi-truong", (newData) => {
            setData((prevData) => [...prevData, ...newData]);
        });

        // Hủy bỏ việc lắng nghe sự kiện khi component bị unmount
    }, [dataStackingChart?.data]);

    const [hoveredValue, setHoveredValue] = useState(null);
    if (!dataStackingChart.data || !dataStackingChart.data.length) {
        return <div className="mt-12"><Loading /></div>;
    }

    const timeLine = data?.map((item) =>
        moment.utc(item.time).format("HH:mm")
    );

    const dataAdvance = data?.map((item) => item.advance);
    const dataDecline = data?.map((item) => item.decline);
    const dataNoChange = data?.map((item) => item.noChange);
    const options = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {
            type: "area",
            zoomType: "x",
            backgroundColor: "transparent",
            style: {
                fontFamily: "Roboto",
            },
        },
        title: {
            text: "",
            style: {
                color: "#F1950C",
            },
        },
        xAxis: {
            categories: timeLine,
            tickmarkPlacement: "on",
            title: {
                enabled: true,
            },
            labels: {
                style: {
                    color: "#fff",
                },
            },
        },
        yAxis: {
            title: {
                text: "",
                style: {
                    color: "#fff",
                },
            },
            labels: {
                style: {
                    color: "#fff",
                },
                formatter: function () {
                    return this.value + "%";
                },
            },
        },
        legend: {
            itemStyle: {
                color: "#fff",
            },
            enabled: true,
            labelFormatter: function () {
                const hoveredPoint = hoveredValue?.find(
                    (point) => point.name === this.name
                );
                const valueString = hoveredPoint ? `: ${hoveredPoint.value}` : "";
                return `${this.name}${valueString}`;
            },
        },
        tooltip: {
            shared: true,
            useHTML: true,
            valueSuffix: " ",
            pointFormatter: function () {
                return (
                    '<span style="color:' +
                    this.series.color +
                    '">' +
                    this.series.name +
                    ": <b>" +
                    this.y +
                    "</b></span>  <b>" +
                    "</b><br/>"
                );
            },
        },
        plotOptions: {
            area: {
                stacking: "percent",
                lineColor: "#ffffff",
                lineWidth: 1,
                tooltip: {
                    valueSuffix: " ",
                },
            },
            series: {
                tooltip: {
                    headerFormat: "<span style='font-size: 10px'>{point.key}</span><br/>",
                    pointFormat:
                        "<span style='color:{point.color}'>{series.name}: <b>{point.y}</b></span><br/>",
                    valueDecimals: 2,
                },
                point: {
                    events: {
                        mouseOver: function () {
                            const hoveredValues = [];
                            const xValue = this.x;
                            this.series.chart.series.forEach((series) => {
                                const point = series.data.find((point) => point.x === xValue);
                                if (point) {
                                    hoveredValues.push({
                                        name: series.name,
                                        color: series.color,
                                        value: point.y,
                                    });
                                }
                            });
                            setHoveredValue(hoveredValues);
                        },
                        mouseOut: function () {
                            setHoveredValue(null);
                        },
                    },
                },
            },
        },
        series: [
            {
                name: "Giảm",
                data: dataDecline,
                color: "#ff0000",
                lineColor: "#ff0000",
                lineWidth: 2,
                marker: {
                    enabled: false,
                },
            },
            {
                name: "Không đổi",
                data: dataNoChange,
                color: "#ffd51e",
                lineColor: "#ffd51e",
                lineWidth: 2,
                marker: {
                    enabled: false,
                },
            },
            {
                name: "Tăng",
                data: dataAdvance,
                color: "#19d216",
                lineColor: "#19d216",
                lineWidth: 2,
                marker: {
                    enabled: false,
                },
            },
        ],
    };

    return (
        <div className="xl:h-[375px] 2xl:h-[375px]">
            <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
        </div>
    );
};

export default DoRongThiTruong;
