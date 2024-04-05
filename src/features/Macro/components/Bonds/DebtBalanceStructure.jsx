import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import PieChart from "highcharts-react-official";
import Loading from "../../../Chart/utils/Loading";
import { fetchDataDebtBalanceStructure } from "../../thunk";
import { useDispatch, useSelector } from "react-redux";

const DebtBalanceStructure = () => {
  const dispatch = useDispatch();
  const { dataDebtBalanceStructure } = useSelector((state) => state.macro);
  const [data, setData] = useState();
  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  useEffect(() => {
    setColorText(color);
  }, [color]);

  useEffect(() => {
    dispatch(fetchDataDebtBalanceStructure);
  }, [dispatch]);

  useEffect(() => {
    if (dataDebtBalanceStructure?.length > 0) {
      const danhSachMoi = dataDebtBalanceStructure.map((item) => ({
        name: item.name,
        y: +item.value.toFixed(2),
        color: item.color,
      }));
      setData(danhSachMoi);
    }
  }, [dataDebtBalanceStructure]);

  const options = {
    accessibility: {
      enabled: false,
    },
    credits: false,
    chart: {
      type: "pie",
      backgroundColor: "transparent",
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: false,
        },
        borderRadius: "50%",
      },
    },
    tooltip: {
      valueSuffix: "%",
    },
    legend: {
      align: "center",
      verticalAlign: "top",
      itemStyle: {
        fontSize: "10px",
        color: localStorage.getItem("color"),
      },
    },
    series: [
      {
        name: "Tỷ lệ",
        data: data,
        size: "80%",
        innerSize: "50%",
        showInLegend: true, // Hiển thị trong legend
      },
    ],
  };

  return (
    <>
      {dataDebtBalanceStructure.length ? (
        <div className="h-[300px]">
          <PieChart
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { height: "100%", width: "100%" } }}
          />
        </div>
      ) : (
        <div className="h-[300px] flex items-center justify-center">
          <Loading />
        </div>
      )}
    </>
  );
};

export default DebtBalanceStructure;
