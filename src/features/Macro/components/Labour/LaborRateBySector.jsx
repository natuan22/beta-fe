import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import PieChart from "highcharts-react-official";
import Loading from "../../../Chart/utils/Loading";
import { fetchDataLaborRateBySector } from "../../thunk";
import { useDispatch, useSelector } from "react-redux";

const LaborRateBySector = () => {
  const dispatch = useDispatch();
  const { dataLaborRateBySector } = useSelector((state) => state.macro);
  const [data, setData] = useState();
  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  useEffect(() => {
    setColorText(color);
  }, [color]);

  useEffect(() => {
    dispatch(fetchDataLaborRateBySector);
  }, [dispatch]);

  useEffect(() => {
    if (dataLaborRateBySector?.length > 0) {
      const danhSachMoi = dataLaborRateBySector.map((item) => ({
        name: item.name,
        y: item.value,
        color: item.color,
      }));
      setData(danhSachMoi);
    }
  }, [dataLaborRateBySector]);

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
      {dataLaborRateBySector.length ? (
        <div className="h-[348px]">
          <PieChart
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { height: "100%", width: "100%" } }}
          />
        </div>
      ) : (
        <div className="h-[348px] flex items-center justify-center">
          <Loading />
        </div>
      )}
    </>
  );
};

export default LaborRateBySector;
