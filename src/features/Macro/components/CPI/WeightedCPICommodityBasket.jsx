import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Highcharts from "highcharts/highstock";
import variablePie from "highcharts/modules/variable-pie.js";
import HighchartsReact from "highcharts-react-official";
import Loading from "../../../Chart/utils/Loading";
import { fetchDataWeightedCPICommodityBasket } from "../../thunk";

variablePie(Highcharts);

const WeightedCPICommodityBasket = () => {
  const dispatch = useDispatch();
  const { dataWeightedCPICommodityBasket } = useSelector(
    (state) => state.macro
  );
  const [data, setData] = useState();
  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  useEffect(() => {
    setColorText(color);
  }, [color]);

  useEffect(() => {
    dispatch(fetchDataWeightedCPICommodityBasket);
  }, [dispatch]);

  useEffect(() => {
    if (dataWeightedCPICommodityBasket?.length > 0) {
      const danhSachMoi = [
        {
          name: "Quyền số CPI",
          data: dataWeightedCPICommodityBasket.map((item) => ({
            name: item.name,
            y: item.value,
          })),
        },
      ];
      setData(danhSachMoi);
    }
  }, [dataWeightedCPICommodityBasket]);

  const options = {
    accessibility: {
      enabled: false,
      point: {
        valueSuffix: "%",
      },
    },
    credits: false,
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      backgroundColor: "transparent",
    },
    title: {
      text: null,
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },

    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f}%",
        },
      },
    },
    series: data,
  };

  return (
    <>
      {dataWeightedCPICommodityBasket.length ? (
        <div className="">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { height: "100%", width: "100%" } }}
          />
        </div>
      ) : (
        <div className="">
          <div className="h-[300px] flex items-center justify-center">
            <Loading />
          </div>
        </div>
      )}
    </>
  );
};

export default WeightedCPICommodityBasket;
