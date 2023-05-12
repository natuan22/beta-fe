import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import treemap from "highcharts/modules/treemap";
import { useDispatch, useSelector } from "react-redux";
import '../utils/treemapStyleDrillBtn.css'
import Loading from "../utils/Loading";
import socket from "../utils/socket";
import { fetchDataTreeMapBuy } from "../thunk";
import { calculatePoints } from "../constant";

// Khởi tạo module treemap
treemap(Highcharts);

const TreeMapBuy = () => {
  const dispatch = useDispatch()
  const { dataTreemapBuy } = useSelector(state => state.chart);
  const [dataTreeMap, setDataTreeMap] = useState();
  const [dataSocket, setDataSocket] = useState([]);
  const [socketChanel, setSocketChanel] = useState('hose');
  const [socketOld, setSocketOld] = useState('');

  useEffect(() => {
    if (dataTreemapBuy?.length > 0)
      setDataSocket(dataTreemapBuy);

  }, [dataTreemapBuy]);

  useEffect(() => {
    socket.on(`listen-foreign-buy-${socketChanel}`, (newData) => {
      setDataSocket(newData);
    });
    setSocketOld(socketChanel)
    const resultMap = {};
    dataSocket?.forEach(item => {
      const { LV2, ticker, total_value_buy, color } = item;

      if (!resultMap.hasOwnProperty(LV2)) {
        resultMap[LV2] = { color: color, data: {} };
      }

      resultMap[LV2].data[ticker] = (total_value_buy / 1000000000).toFixed(2);
    });

    // console.log('resultMap', resultMap);
    setDataTreeMap(resultMap);



  }, [dataSocket]);

  const disconnectSocket = (socketOld) => {
    if (socket.active) {
      socket.off(`listen-foreign-buy-${socketOld}`);
    }
  };

  const points = [];
  let sectorIndex = 0;

  for (let sector in dataTreeMap) {
    let sectorValue = 0;
    let sectorPoint = {
      id: `sector_${sectorIndex}`,
      name: `${sector}`,
      color: dataTreeMap[sector].color, // Sử dụng color từ resultMap
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "12px",
          fontWeight: "bold",
          color: "black",
        },
        verticalAlign: "top",
        align: "left",
      },
    };
    let stockIndex = 0;

    for (let stock in dataTreeMap[sector].data) { // Truy cập vào đối tượng data trong dataTreeMap
      let stockPoint = {
        id: `${sectorPoint.id}_${stockIndex}`,
        name: stock,
        parent: sectorPoint.id,
        value: parseFloat(dataTreeMap[sector].data[stock]), // Truy cập vào value trong dataTreeMap
        dataLabels: {
          enabled: true,
          formatter: function () {
            return '<b>' + this.point.name + '</b>: ' + this.point.value;
          },
          style: {
            fontSize: "11px",
            fontWeight: "semibold",
            color: "white",
            style: {
              textOutline: "none",
            },
          },
          align: "center",
        },
      };
      sectorValue += stockPoint.value;
      points.push(stockPoint);
      stockIndex++;
    }

    sectorPoint.value = Math.round(sectorValue);
    points.push(sectorPoint);
    sectorIndex++;
  }
  // console.log('points', points)
  const options = {
    accessibility: {
      enabled: false,
    },
    credits: false,
    tooltip: {
      formatter: function () {
        return `<b>${this.point.name}</b>: ${this.point.value} (tỉ VNĐ)`;
      }
    },
    chart: {
      type: "treemap",
      backgroundColor: "transparent",
    },
    title: {
      text: "",
      align: "center"
    },
    series: [
      {
        type: "treemap",
        name: "Khối ngoại mua ròng",
        layoutAlgorithm: "squarified",
        allowDrillToNode: true,
        dataLabels: {
          enabled: true,
        },
        levelIsConstant: false,
        levels: [
          {
            level: 1,
            dataLabels: {
              enabled: true
            },
            borderWidth: 3
          }
        ],
        data: points,
        drillUpButton: {
          enabled: true,
          relativeTo: 'spacingBox',
          position: {
            y: 10,
            x: 5
          },
          theme: {
            fill: 'red',
            'stroke-width': 1,
            stroke: 'blue',
            r: 0,
            states: {
              hover: {
                fill: 'yellow'
              },
              select: {
                stroke: '#039',
                fill: '#a4edba'
              }
            }
          },
        },
      }
    ]
  };

  const currentTime = new Date();

  // Lấy giờ và phút từ currentTime
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  // Kiểm tra xem thời gian có nằm trong khoảng từ 9h15 đến 23h59 không
  const shouldShowData = currentHour > 9 || (currentHour === 9 && currentMinute >= 15) || currentHour === 0

  // Nếu thời gian nằm ngoài khoảng từ 9h15 đến 23h59, hiển thị dữ liệu
  if (!shouldShowData) {
    return <>
      <div>
        <div className="text-center py-2">
          <span className="dark:text-white text-black uppercase sm:text-base xs:text-xs">
            Khối ngoại mua ròng sàn
            <select
              className={`dark:bg-[#151924] bg-gray-100 dark:hover:bg-gray-900 hover:bg-gray-300 ml-2 rounded-lg p-1 text-base text-[#0097B2]`}
              onChange={(event) => {
                disconnectSocket(socketOld);
                setSocketChanel(event.target.value);
                dispatch(fetchDataTreeMapBuy(event.target.value))
              }}
            >
              <option value="hose">HSX</option>
              <option value="hnx">HNX</option>
              <option value="upcom">UPCOM</option>
            </select>
          </span>
        </div>
      </div>
      <div className="text-center mt-6 dark:text-white text-black">Chưa có dữ liệu</div>
    </>
  }

  return (
    <>
      <div>
        <div className="text-center py-2">
          <span className="dark:text-white text-black uppercase sm:text-base xs:text-xs">
            Khối ngoại mua ròng sàn
            <select
              className={`dark:bg-[#151924] bg-gray-100 dark:hover:bg-gray-900 hover:bg-gray-300 ml-2 rounded-lg p-1 text-base text-[#0097B2]`}
              onChange={(event) => {
                disconnectSocket(socketOld);
                setSocketChanel(event.target.value);
                dispatch(fetchDataTreeMapBuy(event.target.value))
              }}
            >
              <option value="hose">HSX</option>
              <option value="hnx">HNX</option>
              <option value="upcom">UPCOM</option>
            </select>
          </span>
        </div>
      </div>
      <div>
        {dataTreemapBuy.length > 0 ? (
          <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '690px', width: '100%' } }} />
        ) : (
          <div className="mt-6"><Loading /></div>
        )}
      </div>
    </>
  );
};

export default TreeMapBuy;

