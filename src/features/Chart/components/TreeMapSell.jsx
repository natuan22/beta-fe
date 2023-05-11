import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import treemap from "highcharts/modules/treemap";
import { useDispatch, useSelector } from "react-redux";
import '../utils/treemapStyleDrillBtn.css'
import Loading from "../utils/Loading";
import socket from "../utils/socket";
import { fetchDataTreeMapSell } from "../thunk";

// Khởi tạo module treemap
treemap(Highcharts);

const TreeMapSell = () => {
  const dispatch = useDispatch()
  const { dataTreemapSell } = useSelector(state => state.chart);
  console.log(dataTreemapSell)
  const [dataTreeMap, setDataTreeMap] = useState();
  const [dataSocket, setDataSocket] = useState([]);
  const [socketChanel, setSocketChanel] = useState('hose');
  const [socketOld, setSocketOld] = useState('');
  useEffect(() => {
    if (dataTreemapSell?.length > 0)
      setDataSocket(dataTreemapSell);

  }, [dataTreemapSell]);

  useEffect(() => {
    socket.on(`listen-foreign-sell-${socketChanel}`, (newData) => {
      console.log('newData', newData);
      setDataSocket(newData);
    });
    setSocketOld(socketChanel)
    const resultMap = {};
    dataSocket?.forEach(item => {
      const { LV2, ticker, total_value_sell, color } = item;

      if (!resultMap.hasOwnProperty(LV2)) {
        resultMap[LV2] = { color: color, data: {} };
      }

      resultMap[LV2].data[ticker] = (total_value_sell / 1000000000).toFixed(2);
    });

    console.log('resultMap', resultMap);
    setDataTreeMap(resultMap);



  }, [dataSocket]);

  const disconnectSocket = (socketOld) => {
    if (socket.active) {
      socket.off(`listen-foreign-sell-${socketOld}`);
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
  console.log('points', points)
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

  return (
    <div>
      <div>
        <div className="text-center py-2">
          <span className="dark:text-white text-black uppercase sm:text-base xs:text-xs">
            Khối ngoại bán ròng sàn
            <select
              className={`dark:bg-[#151924] bg-gray-100 dark:hover:bg-gray-900 hover:bg-gray-300 ml-2 rounded-lg p-1 text-base text-[#0097B2]`}
              onChange={(event) => {
                disconnectSocket(socketOld);
                setSocketChanel(event.target.value);
                dispatch(fetchDataTreeMapSell(event.target.value))
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
        {
          dataTreemapSell.length > 0 ? <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '690px', width: '100%' } }} /> : <div><Loading /></div>
        }
      </div>
    </div>
  );
};

export default TreeMapSell;

