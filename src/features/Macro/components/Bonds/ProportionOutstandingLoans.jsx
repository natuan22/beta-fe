import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Highcharts from "highcharts/highstock";
import PieChart from "highcharts-react-official";
import Loading from "../../../Chart/utils/Loading";
import { fetchDataProportionOutstandingLoans } from "../../thunk";

const ProportionOutstandingLoans = () => {
  const dispatch = useDispatch();
  const { dataProportionOutstandingLoans } = useSelector(
    (state) => state.macro
  );
  const [data, setData] = useState();
  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  useEffect(() => {
    setColorText(color);
  }, [color]);

  useEffect(() => {
    dispatch(fetchDataProportionOutstandingLoans);
  }, [dispatch]);

  useEffect(() => {
    if (dataProportionOutstandingLoans?.length > 0) {
      const danhSachMoi = dataProportionOutstandingLoans.map((item) => ({
        name: "DN chậm thanh toán",
        y: +item.value.toFixed(2),
        color: "#2CC8DD",
      }));
      const newItem = {
        name: "DN còn lại",
        y: 100 - danhSachMoi[0].y,
        color: "#147DF5",
      };
      danhSachMoi.push(newItem);
      setData(danhSachMoi);
    }
  }, [dataProportionOutstandingLoans]);

  // Create the chart
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
      {dataProportionOutstandingLoans.length ? (
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

export default ProportionOutstandingLoans;
