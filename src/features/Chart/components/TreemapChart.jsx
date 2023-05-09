import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../utils/Loading";
import socket from "../utils/socket";
import { fetchDataTreeMapBuy } from "../thunk";
import { https } from "../../../services/config";

const TreeMapChart = () => {
  const dispatch = useDispatch()
  const dataTreemapBuy = useSelector((state) => state.chart.dataTreemapBuy);
  const [data = dataTreemapBuy.data || [], setData] = useState();
  const [socketChanel, setSocketChanel] = useState('hsx')
  const [oldSocket, setOldSocket] = useState('')
  useEffect(() => {
    if (dataTreemapBuy.data) {
      setData(dataTreemapBuy.data)
    }
    // socket.on(`listen-foreign-buy-${socketChanel}`, (newData) => {
    //   // console.log('dataSocketByt',newData)
    //   setData(newData)
    // })
    // setOldSocket(socketChanel)
  
  }, [dataTreemapBuy])
  
  const arrGlobal = [
    [
      "Location",
      "Parent",
      "Market trade volume (size)",
    ],
    ["Khối ngoại mua ròng", null, 0],
  ];
  // tạo 1 trường AddedLv2Value => chạy vòng lặp xét item.lv2 có trong addedValue chưa nếu chưa thì thực hiện arrGlobal.push([item.lv2, "Global", 0, 0]); và ngược lại
  const addedLv2Values = new Set();
  data.forEach((item) => {
    if (!addedLv2Values.has(item.LV2)) {
      arrGlobal.push([item.LV2, "Khối ngoại mua ròng", 0]);
      addedLv2Values.add(item.LV2);
    }
  });
  const arrTicker = data.map((item) => {
    return [
      `${item.ticker}: ${ Intl.NumberFormat("de-DE").format(item.total_value_buy) } tỉ VNĐ`,
      item.LV2,
      item.total_value_buy,
    ];
  });

  const disconnectSocket = (socketOld) => {
    if (socket.active) {
        socket.off(`listen-foreign-buy-${socketOld}`);
    }
}
  const dataTreeMapRender = arrGlobal.concat(arrTicker)
  const options = {
    highlightOnMouseOver: true,
    maxDepth: 1,
    maxPostDepth: 2,
    minHighlightColor: "green",
    midHighlightColor: "green",
    maxHighlightColor: "#green",
    minColor: "green",
    midColor: "#green",
    maxColor: "#green",
    headerHeight: 0,
    showScale: false,
    height: 680,
    useWeightedAverageForAggregation: true,
    textStyle: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'semibold',
    },
    titleTextStyle: {
      color: '#fff',
      fontSize: 13,
    },
    generateTooltip: (row) => {
      const size = row[2];
      const color = row[3];
      const label = row[0];
      return `
                <div>
                <div style="font-weight: bold;>${label}</div>
                <div className='font-semibold'>Market trade volume: ${size}</div>
                <div>Market increase/decrease: ${color}</div>
                </div>
            `;
    },
    headerTemplate: (props) => {
      const { row, column, value } = props;
      const label = row.getFormattedValue(column);
      return `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 4px; background-color: #333;">
            <span style="color: black; font-size: 14px; margin-right: 8px;">${label}122</span>
            <span style="color: black; font-size: 14px;">${value}</span>
          </div>
        `;
    },

  };

  return (
    <div>
      <div>
        <select
          className={` dark:bg-[#151924] bg-gray-100 dark:hover:bg-gray-900 hover:bg-gray-300 ml-2 rounded-lg p-1 text-base text-[#0097B2]`}
          onChange={(event) => {
            disconnectSocket(oldSocket)
            setSocketChanel(event.target.value)
            dispatch(fetchDataTreeMapBuy(event.target.value))
          }}
        >
          <option value="hsx">HSX</option>
          <option value="hnx">HNX</option>
          <option value="upcom">UPCOM</option>
        </select>
      </div>
      <div>
        <Chart
          width={"100%"}
          height={"500px"}
          chartType="TreeMap"
          loader={<div className="mt-16"><Loading /></div>}
          data={dataTreeMapRender}
          options={options}
        />
      </div>
    </div>
  );
};

export default TreeMapChart;