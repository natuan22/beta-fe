import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import treemap from "highcharts/modules/treemap";
import { useSelector } from "react-redux";
// Khởi tạo module treemap
treemap(Highcharts);

const TreeMapTest = () => {
  const [data, setData] = useState([]);
  const { dataTreemapSell } = useSelector(state => state.chart)
  console.log(dataTreemapSell.data)
  useEffect(() => {
    if (dataTreemapSell?.data?.length) {
      const dataParent = dataTreemapSell?.data.reduce((uniqueItems, item) => {
        const isItemExist = uniqueItems.some((uniqueItem) => uniqueItem.id === item.LV2);

        if (!isItemExist) {
          const itemsWithSameLV2 = dataTreemapSell?.data.filter((dataItem) => dataItem.LV2 === item.LV2);
          const totalValue = itemsWithSameLV2.reduce((sum, dataItem) => sum + dataItem.total_value_sell, 0);
          uniqueItems.push({
            id: item.LV2,
            name:item.LV2,
            value: +(totalValue / 1000000000).toFixed(2) ,
          });
        }
        return uniqueItems;
      }, []);
      // console.log('dataParent',dataParent)

      const dataChild = dataTreemapSell?.data.map((item) => ({
        id: item.ticker,
        name: item.LV2,
        value: +(item.total_value_sell / 1000000000).toFixed(2),
      }));
      // console.log('dataChild',dataChild)
      const dataRender = [...dataParent].map((item) => {
        return {
          ...item,
          data: dataChild.filter(i => i.name === item.id)  
        } 
      })
      console.log('dataRender',dataRender)
      setData(dataRender);
    }
  }, [dataTreemapSell]);




  const options = {
    chart: {
      type: "treemap",
      backgroundColor: "transparent",
      layoutAlgorithm: "squarified",
      allowDrillToNode: true,
      borderWidth: 2,
      borderColor: "#000",
      borderRadius: 6,
    },
    title: {
      text: "Dữ liệu Treemap",
      align: "center",
    },
    series: [
      {
        type: "treemap",
        layoutAlgorithm: "squarified",
        levels: [
          {
            level: 1,
            layoutAlgorithm: "sliceAndDice",
            dataLabels: {
              enabled: true,
              align: "center",
              verticalAlign: "top",
              style: {
                fontSize: "13px",
                fontWeight: "bold",
              },
            },
            levelSize: {
              unit: "pixels",
              value: 10,
            },
            borderWidth: 0,
            borderColor: null,
          },
        ],
        data: data,
        colorByPoint: true,
        dataLabels: {
          enabled: true,
          style: {
            textOutline: "none",
          },
        },
        events: {
          click: (event) => {
            if (event.point.node.children.length > 0) {
              // Xử lý sự kiện khi click vào parent
              // Hiển thị các giá trị con trong parent
              const childData = event.point.node.children.map((child) => ({
                id: child.id,
                name: child.name,
                value: child.value,
              }));
              setData(childData);
              
            }
          },
        },
      },
    ],
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { height: "800px", width: "40%" } }}
      />
    </div>
  );
};

export default TreeMapTest;
