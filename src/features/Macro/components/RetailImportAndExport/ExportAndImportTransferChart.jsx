import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import highchartsMap from "highcharts/modules/map";
import React, { useEffect, useState } from "react";
import Loading from "../../../Chart/utils/Loading";
import "./utils/styles/mapStyle.css";

highchartsMap(Highcharts); // Khởi tạo highcharts module map
const data = [
  {
    "hc-key": "vn",
    color: "red",
  },
  {
    "hc-key": "cn",
    color: "#c0ffd5",
  },
  {
    "hc-key": "hk",
    color: "#c0ffd5",
  },
  {
    "hc-key": "in", // ấn độ
    color: "#c0ffd5",
  },
  {
    "hc-key": "jp",
    color: "#c0ffd5",
  },
  {
    "hc-key": "kr",
    color: "#c0ffd5",
  },
  {
    "hc-key": "tw",
    color: "#c0ffd5",
  },
  {
    "hc-key": "us",
    color: "#c0ffd5",
  },
];
const coordinates = [
  { taiwan: [121.5654, 23.6978] },
  { us: [-95.7129, 37.0902] },
  { india: [78, 21] },
  { china: [116.4074, 39.9042] },
  { hongkong: [114.1095, 22.3964] },
  { korea: [127.9785, 36.5388] },
  { jp: [138.2529, 36.2048] },
];
export default function ExportAndImportTransferChart({ dataMapExImport }) {
  const optionsCoordinatesExport = coordinates.map((countryInfo) => {
    const countryName = Object.keys(countryInfo)[0]; // Lấy tên quốc gia từ key
    const coordinatesArray = countryInfo[countryName]; // Lấy mảng tọa độ từ value
    return {
      geometry: {
        type: "LineString",
        coordinates: [
          [105.84117, 21.0245], // Tọa độ của Việt Nam
          coordinatesArray, // Tọa độ của quốc gia khác
        ],
      },
      className: "animated-line",
      color: "#147df5",
    };
  });
  const optionsCoordinatesImport = coordinates.map((countryInfo) => {
    const countryName = Object.keys(countryInfo)[0]; // Lấy tên quốc gia từ key
    const coordinatesArray = countryInfo[countryName]; // Lấy mảng tọa độ từ value
    return {
      geometry: {
        type: "LineString",
        coordinates: [
          coordinatesArray, // Tọa độ của quốc gia khác
          [105.84117, 21.0245], // Tọa độ của Việt Nam
        ],
      },
      className: "animated-line",
      color: "#e7c64f",
    };
  });

  const [mapData, setMapData] = useState(null);
  useEffect(() => {
    // Fetch data
    fetch("https://code.highcharts.com/mapdata/custom/world-highres.topo.json")
      .then((response) => response.json())
      .then((data) => {
        setMapData(data);
      });
  }, []);

  const options = {
    plotOptions: {
      series: {
        turboThreshold: 100_000_000,
      },
    },
    // boost: {
    //   useGPUTranslations: true,
    //   usePreAllocated: true,
    // },
    accessibility: {
      enabled: false,
    },
    credits: false,
    chart: {
      map: mapData,
      backgroundColor: "transparent",
    },
    title: {
      text: "",
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      useHTML: true,
      headerFormat: "<b>{point.key}</b>:<br/>",
      pointFormat: "{point.info}",
      style: {
        color: "black", // Màu chữ của tooltip
        fontSize: "12px", // Cỡ chữ của tooltip
        fontWeight: "bold",
      },
      formatter: function () {
        const country = this.key;
        const exportValue =
          dataMapExImport.find(
            (item) =>
              item.name.includes(country) ||
              item.name.includes("United States"),
          )?.value || "N/A";
        return `
                    <b>${country}</b>:<br/>
                    <span >Giá trị ${
                      localStorage.getItem("typeTransfer") === "0"
                        ? "xuất khẩu"
                        : "nhập khẩu"
                    } : ${(exportValue / 1000000000).toFixed(2)} tỉ USD</span>
                    `;
      },
    },
    mapView: {
      fitToGeometry: {
        type: "MultiPoint",
        coordinates: [
          // Alaska west
          [-164, 54],
          // Greenland north
          [-35, 84],
          // New Zealand east
          [179, -38],
          // Chile south
          [-68, -55],
        ],
      },
    },
    series: [
      {
        data,
        keys: ["hc-key", "color"],
        name: "Xuất khẩu",
      },
      {
        type: "mapline",
        data:
          localStorage.getItem("typeTransfer") === "0"
            ? optionsCoordinatesExport
            : optionsCoordinatesImport,
        lineWidth: 2,
        enableMouseTracking: false,
      },
      {
        type: "mappoint",
        color: "#333",
        dataLabels: {
          format:
            '<b>{point.name}</b><br><span style="font-weight: normal; opacity: 0.5">{point.custom.arrival}</span>',
          align: "left",
          verticalAlign: "middle",
        },
        data: [
          {
            name: "Vietnam",
            geometry: {
              type: "Point",
              coordinates: [105.84117, 21.0245], // Việt Nam
            },
            marker: {
              radius: 4,
              fillColor: "yellow",
              lineColor: "yellow",
            },
            dataLabels: {
              align: "right",
              x: 20,
              y: 10,
              style: {
                color: "yellow",
                fontSize: "10px",
                fontStyle: "italic",
              },
            },
          },

          {
            name: "Nhật Bản",
            geometry: {
              type: "Point",
              coordinates: [138.2529, 36.2048], // Nhật Bản
            },
            marker: {
              radius: 4,
              fillColor: "red",
              lineColor: "red",
            },
            dataLabels: {
              align: "left",
              y: 10,
              style: {
                color: "black",
                fontStyle: "bold",
                fontSize: "8px",
              },
            },
          },
          {
            name: "Taiwan",
            geometry: {
              type: "Point",
              coordinates: [121.5654, 23.6978], // Đài Loan
            },
            marker: {
              radius: 4,
              fillColor: "red",
              lineColor: "red",
            },

            dataLabels: {
              align: "top",
              y: -5,
              x: 0,
              style: {
                color: "black",
                fontStyle: "bold",
                fontSize: "8px",
              },
            },
          },
          {
            name: "Hoa Kỳ",
            color: "black",
            geometry: {
              type: "Point",
              coordinates: [-95.7129, 37.0902], // Hoa Kỳ
            },
            marker: {
              radius: 4,
              fillColor: "red",
              lineColor: "red",
            },
            dataLabels: {
              align: "left",
              style: {
                color: "black",
                fontStyle: "bold",
                fontSize: "8px",
              },
            },
          },

          {
            name: "Trung Quốc",
            geometry: {
              type: "Point",
              coordinates: [116.4074, 39.9042], // Trung Quốc
            },
            marker: {
              radius: 4,
              fillColor: "red",
              lineColor: "red",
            },
            dataLabels: {
              align: "right",
              style: {
                color: "black",
                fontStyle: "bold",
                fontSize: "8px",
              },
            },
          },
          {
            name: "Hong Kong",
            geometry: {
              type: "Point",
              coordinates: [114.1095, 22.3964], // Hong Kong
            },
            marker: {
              radius: 4,
              fillColor: "red",
              lineColor: "red",
            },
            dataLabels: {
              align: "left",
              y: 10,
              style: {
                color: "black",
                fontStyle: "bold",
                fontSize: "8px",
              },
            },
          },
          {
            name: "Ấn Độ",
            geometry: {
              type: "Point",
              coordinates: [78, 21], // India
            },
            marker: {
              radius: 4,
              fillColor: "red",
              lineColor: "red",
            },
            dataLabels: {
              align: "right",
              style: {
                color: "black",
                fontStyle: "bold",
                fontSize: "8px",
              },
            },
          },
          {
            name: "Hàn Quốc",
            geometry: {
              type: "Point",
              coordinates: [127.9785, 36.5388], // Hàn Quốc
            },
            marker: {
              radius: 4,
              fillColor: "red",
              lineColor: "red",
            },
            dataLabels: {
              align: "top",
              x: -30,
              y: 10,
              style: {
                color: "black",
                fontSize: "8px",
              },
            },
          },
        ],
        enableMouseTracking: false,
      },
    ],
  };

  return (
    <div>
      {mapData ? (
        <div className="h-[335px]">
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={"mapChart"}
            options={options}
            containerProps={{ style: { height: "100%", width: "100%" } }}
          />
        </div>
      ) : (
        <div className="h-[335px] flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
}
