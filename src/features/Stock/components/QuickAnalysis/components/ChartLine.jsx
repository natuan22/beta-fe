import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import React, { useEffect, useState } from "react";
import "../styles/average-legend.css";

const ChartLine = ({ stock, data, chartKey }) => {
  const [timeLine, setTimeLine] = useState();
  const [dataChart, setDataChart] = useState([]);
  const [dataAverage, setDataAverage] = useState([]);

  useEffect(() => {
    if (data?.data?.length > 0) {
      const uniqueDates = [
        ...new Set(
          data.data.map((item) => moment(item.from).format("DD/MM/YYYY"))
        ),
      ];
      setTimeLine(uniqueDates);

      const keys = [
        "pe",
        "pb",
        "industryPe",
        "industryPb",
        "indexPe",
        "indexPb",
      ];
      const colors = [
        "#009565",
        "#FF2A37",
        "#00F1A0",
        "#FF9BA3",
        "#FBAC20",
        "#FBAC20",
      ];

      const transformedData = keys.map((key, index) => {
        return {
          name: key,
          data: data.data.map((item) => item[key]),
          color: colors[index],
        };
      });

      const peData = transformedData
        .filter((item) => item.name.toLowerCase().includes("pe"))
        .map((item) => {
          let newName;
          let dashStyle = undefined;
          switch (item.name) {
            case "pe":
              newName = stock;
              break;
            case "industryPe":
              newName = `Ngành (${data.industry})`;
              dashStyle = "dash";
              break;
            case "indexPe":
              newName = "VNindex";
              break;
            default:
              newName = item.name;
          }
          return {
            ...item,
            name: newName,
            dashStyle,
            dataLabels: {
              enabled: true,
              formatter: function () {
                const visibleSeries = this.series.chart.series.filter(
                  (s) => s.visible
                );

                // Kiểm tra nếu có bất kỳ series nào chứa "VNIndex" và nó đang hiển thị
                const hasVNIndexInVisibleSeries = visibleSeries.some((s) =>
                  s.name.toLowerCase().includes("vnindex")
                );

                // Nếu "VNIndex" đang được hiển thị, ẩn nhãn
                if (hasVNIndexInVisibleSeries) {
                  return null; // Ẩn nhãn nếu có "VNIndex" trong các series đang hiển thị
                }

                // Kiểm tra xem có series nào chứa " (Trung bình)" không
                const hasAverageSeries = visibleSeries.some((s) =>
                  s.name.includes(" (Trung bình)")
                );

                // Nếu không có series nào là " (Trung bình)", hiển thị giá trị cuối luôn
                if (!hasAverageSeries) {
                  return this.point.index === this.series.data.length - 1
                    ? this.point.y.toFixed(1)
                    : null;
                }

                // Lấy tên cơ bản của các series (bỏ phần " (Trung bình)")
                const baseNames = visibleSeries.map((s) =>
                  s.name.replace(" (Trung bình)", "")
                );

                // Lấy tên cơ bản của series hiện tại
                const currentBaseName = this.series.name.replace(
                  " (Trung bình)",
                  ""
                );

                // Kiểm tra nếu tất cả các series có cùng tên cơ bản
                const isAllBaseNamesSame = baseNames.every(
                  (name) => name === currentBaseName
                );

                // Hiển thị nhãn chỉ khi tất cả các series có cùng tên cơ bản
                if (isAllBaseNamesSame) {
                  return this.point.index === this.series.data.length - 1
                    ? this.point.y.toFixed(1) // Hiển thị giá trị cuối cùng
                    : null;
                }

                return null; // Ẩn nhãn nếu không thỏa mãn điều kiện
              },
              style: {
                color: "#000",
                fontSize: "11px",
                fontWeight: "bold",
                textOutline: "1px contrast",
              },
              y: 20, // Điều chỉnh vị trí dọc của nhãn
            },
          };
        });

      const pbData = transformedData
        .filter((item) => item.name.toLowerCase().includes("pb"))
        .map((item) => {
          let newName;
          let dashStyle = undefined;
          switch (item.name) {
            case "pb":
              newName = stock;
              break;
            case "industryPb":
              newName = `Ngành (${data.industry})`;
              dashStyle = "dash";
              break;
            case "indexPb":
              newName = "VNindex";
              break;
            default:
              newName = item.name;
          }
          return {
            ...item,
            name: newName,
            dashStyle,
            dataLabels: {
              enabled: true,
              formatter: function () {
                const visibleSeries = this.series.chart.series.filter(
                  (s) => s.visible
                );

                // Kiểm tra nếu có bất kỳ series nào chứa "VNIndex" và nó đang hiển thị
                const hasVNIndexInVisibleSeries = visibleSeries.some((s) =>
                  s.name.toLowerCase().includes("vnindex")
                );

                // Nếu "VNIndex" đang được hiển thị, ẩn nhãn
                if (hasVNIndexInVisibleSeries) {
                  return null; // Ẩn nhãn nếu có "VNIndex" trong các series đang hiển thị
                }

                // Kiểm tra xem có series nào chứa " (Trung bình)" không
                const hasAverageSeries = visibleSeries.some((s) =>
                  s.name.includes(" (Trung bình)")
                );

                // Nếu không có series nào là " (Trung bình)", hiển thị giá trị cuối luôn
                if (!hasAverageSeries) {
                  return this.point.index === this.series.data.length - 1
                    ? this.point.y.toFixed(1)
                    : null;
                }

                // Lấy tên cơ bản của các series (bỏ phần " (Trung bình)")
                const baseNames = visibleSeries.map((s) =>
                  s.name.replace(" (Trung bình)", "")
                );

                // Lấy tên cơ bản của series hiện tại
                const currentBaseName = this.series.name.replace(
                  " (Trung bình)",
                  ""
                );

                // Kiểm tra nếu tất cả các series có cùng tên cơ bản
                const isAllBaseNamesSame = baseNames.every(
                  (name) => name === currentBaseName
                );

                // Hiển thị nhãn chỉ khi tất cả các series có cùng tên cơ bản
                if (isAllBaseNamesSame) {
                  return this.point.index === this.series.data.length - 1
                    ? this.point.y.toFixed(1) // Hiển thị giá trị cuối cùng
                    : null;
                }

                return null; // Ẩn nhãn nếu không thỏa mãn điều kiện
              },
              style: {
                color: "#000",
                fontSize: "11px",
                fontWeight: "bold",
                textOutline: "1px contrast",
              },
              y: 20, // Điều chỉnh vị trí dọc của nhãn
            },
          };
        });

      const calculateAverage = (data, shouldFilter = false) => {
        // Nếu shouldFilter là true, lọc các giá trị không hợp lệ
        const filteredData = shouldFilter
          ? data.filter((value) => value >= 0 && value < 100)
          : data;

        // Tính tổng các giá trị hợp lệ
        const sum = filteredData.reduce((acc, value) => acc + value, 0);

        // Trả về trung bình cộng hoặc 0 nếu không có giá trị hợp lệ
        return filteredData.length > 0 ? sum / filteredData.length : 0;
      };

      // Sử dụng hàm cho peData (có lọc)
      const peAverageData = peData.map((series) => ({
        name: `${series.name} (Trung bình)`,
        data: Array(uniqueDates.length).fill(
          +calculateAverage(series.data, true).toFixed(1)
        ),
        color: series.color,
        dashStyle: "dot",
        visible: false,
        dataLabels: {
          enabled: true,
          formatter: function () {
            // Display data labels only for the last point in the series
            return this.point.index === this.series.data.length - 1
              ? this.point.y.toFixed(1)
              : null; // Return null to hide the label
          },
          style: {
            color: "#000",
            fontSize: "11px",
            fontWeight: "bold",
            textOutline: "1px contrast",
          },
        },
      }));

      // Sử dụng hàm cho pbData (không lọc)
      const pbAverageData = pbData.map((series) => ({
        name: `${series.name} (Trung bình)`,
        data: Array(uniqueDates.length).fill(
          +calculateAverage(series.data).toFixed(1)
        ),
        color: series.color,
        dashStyle: "dot",
        visible: false,
        dataLabels: {
          enabled: true,
          formatter: function () {
            // Display data labels only for the last point in the series
            return this.point.index === this.series.data.length - 1
              ? this.point.y.toFixed(1)
              : null; // Return null to hide the label
          },
          style: {
            color: "#000",
            fontSize: "11px",
            fontWeight: "bold",
            textOutline: "1px contrast",
          },
        },
      }));

      if (chartKey === "P/E") {
        setDataChart(peData);
        setDataAverage(peAverageData);
      } else {
        setDataChart(pbData);
        setDataAverage(pbAverageData);
      }
    }
  }, [data]);

  const options = {
    accessibility: {
      enabled: false,
    },
    credits: false,
    chart: {
      type: "spline",
      backgroundColor: "transparent",
    },
    title: {
      text: `${chartKey}`,
      style: {
        color: localStorage.getItem("color"),
        fontWeight: "bold",
      },
    },
    xAxis: {
      categories: timeLine,
      labels: {
        style: {
          color: localStorage.getItem("color"),
          fontSize: "9px",
        },
        rotation: -45,
      },
      tickInterval: Math.ceil(timeLine?.length / 7),
      tickPositioner: function () {
        const tickPositions = [];
        const interval = Math.ceil(timeLine?.length / 7);

        for (let i = 0; i < timeLine.length; i += interval) {
          tickPositions.push(i);
        }
        if (timeLine.length - 1 !== tickPositions[tickPositions.length - 1]) {
          tickPositions.push(timeLine.length - 1);
        }
        return tickPositions;
      },
    },
    yAxis: [
      {
        title: {
          text: "",
          style: {
            color: localStorage.getItem("color"),
          },
        },
        labels: {
          style: {
            color: localStorage.getItem("color"), // màu cho các nhãn trục y
          },
        },
        gridLineWidth: 0.1,
      },
    ],
    legend: {
      layout: "vertical", //horizontal
      align: "center",
      verticalAlign: "top",
      enabled: true,
      itemStyle: {
        color: localStorage.getItem("color"),
        fontWeight: "bold",
      },
      itemHiddenStyle: {
        textDecoration: "none",
      },
      x: -80,
      y: 0,
    },
    plotOptions: {
      series: {
        marker: {
          radius: 2,
        },
        turboThreshold: 100_000_000,
      },
    },
    // boost: {
    //   useGPUTranslations: true,
    //   usePreAllocated: true,
    // },
    tooltip: {
      shared: true,
      useHTML: true,
      valueSuffix: " ",
      backgroundColor: "#fff",
      formatter: function () {
        let tooltip = `<div style="display: flex; margin-bottom: 5px;">
                            <div style="width: 80px">${this.x}</div>
                            <div style="width: 40px">${chartKey}</div>
                            <div>Trung bình</div>
                       </div>`;

        const removeParentheses = (text) => text.replace(/\s*\(.*?\)\s*/g, "");

        this.points.forEach((point) => {
          // Kiểm tra nếu series đang được hiển thị không phải là một dòng trung bình
          if (!point.series.name.includes("Trung bình")) {
            const color = point.series.color;
            const seriesIndex = point.series.index;
            tooltip += `
                <div style="display: flex; align-items: center; margin-bottom: 3px;">
                    <div style="width: 10px; height: 10px; background-color: ${color}; margin-right: 5px;"></div>
                    <span style="color:${color}; width: 65px">${removeParentheses(
                      point.series.name,
                    )}</span>
                    <span style="width: 60px;"><b>${point.y}</b></span>
                    <span><b>${dataAverage[seriesIndex].data[0].toFixed(
                      1,
                    )}</b></span>
                    <br/>
                </div>`;
          }
        });

        return tooltip;
      },
    },
    series: [...dataChart, ...dataAverage],
  };

  return (
    <div className="historical-pe-pb h-[600px]">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { height: "100%", width: "100%" } }}
      />
    </div>
  );
};

export default ChartLine;