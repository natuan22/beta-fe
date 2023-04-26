import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from "react-redux";
import moment from "moment";
import Loading from "../../../Chart/utils/Loading";
import socket from "../../../Chart/utils/socket";

const MarketBreadth = () => {
    const dataStackingChart = useSelector((state) => state.chart.dataStackingArea);
    const [data, setData] = useState([]);
    const [activeButton, setActiveButton] = useState('HOSE')
    const handleClick = (button) => { setActiveButton(button) }
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        setColorText(color);
    }, [color]);

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
        return <>
            <div className="border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0 pt-[11px]">
                <span className="dark:text-white text-black text-[0.9rem]">
                    Diễn biến độ rộng thị trường
                </span>
                <select
                    className={`bg-[#1B496D] 2xl:ml-[114px] xl:ml-[114px] lg:ml-[135px] md:ml-[115px] sm:ml-[99px] xs:ml-[49px] p-1 text-[0.9rem] text-white border-0`}
                >
                    <option value="1">Phiên gần nhất</option>
                    <option value="2">01 tháng</option>
                    <option value="3">01 quý</option>
                    <option value="4">01 năm</option>
                </select>
            </div>
            <div className="mt-1 mb-3 dark:text-white text-black">
                <span>
                    <button
                        onClick={() => {
                            handleClick('HOSE')
                        }}
                        className={activeButton === 'HOSE'
                            ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>HSX
                    </button>
                </span>
                <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10">
                    <button
                        onClick={() => {
                            handleClick('HNX')
                        }}
                        className={activeButton === 'HNX'
                            ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>HNX
                    </button>
                </span>
                <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10">
                    <button
                        onClick={() => {
                            handleClick('UPCOM')
                        }}
                        className={activeButton === 'UPCOM'
                            ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>UPCOM
                    </button>
                </span>
            </div>
            <div className="mt-12"><Loading /></div>
        </>;
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
                    color: colorText,
                },
            },
        },
        yAxis: {
            title: {
                text: "",
                style: {
                    color: colorText,
                },
            },
            labels: {
                style: {
                    color: colorText,
                },
                formatter: function () {
                    return this.value + "%";
                },
            },
        },
        legend: {
            itemStyle: {
                color: colorText,
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
        <>
            <div className="border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0 pt-[11px]">
                <span className="dark:text-white text-black text-[0.9rem]">
                    Diễn biến độ rộng thị trường
                </span>
                <select
                    className={`bg-[#1B496D] 2xl:ml-[100px] xl:ml-[100px] lg:ml-[135px] md:ml-[115px] sm:ml-[99px] xs:ml-[49px] p-1 text-[0.9rem] text-white border-0`}
                >
                    <option value="1">Phiên gần nhất</option>
                    <option value="2">01 tháng</option>
                    <option value="3">01 quý</option>
                    <option value="4">01 năm</option>
                </select>
            </div>
            <div className="mt-1 mb-3 dark:text-white text-black">
                <span>
                    <button
                        onClick={() => {
                            handleClick('HOSE')
                        }}
                        className={activeButton === 'HOSE'
                            ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>HSX
                    </button>
                </span>
                <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10">
                    <button
                        onClick={() => {
                            handleClick('HNX')
                        }}
                        className={activeButton === 'HNX'
                            ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>HNX
                    </button>
                </span>
                <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10">
                    <button
                        onClick={() => {
                            handleClick('UPCOM')
                        }}
                        className={activeButton === 'UPCOM'
                            ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>UPCOM
                    </button>
                </span>
            </div>
            <div className="xl:h-[375px] 2xl:h-[375px]">
                <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
            </div>
        </>
    );
};

export default MarketBreadth;
