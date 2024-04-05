import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from "react-redux";
import Loading from "../../../Chart/utils/Loading";

const SpiderWebChart = ({ queryApi }) => {
  const {
    dataInfoHeader,
    dataFinancialHealthAnalysis,
    dataBusinessPosition,
    dataBasicPrice,
    dataBussinessAnalysis,
    dataIndividualInvestorBenefits,
    dataTechnicalAnalysis,
  } = useSelector((state) => state.stock);

  const dataTotalStarStock = [
    {
      name: "Sức khoẻ tài chính",
      value: dataFinancialHealthAnalysis.totalStar || 0,
    },
    {
      name: "Vị thế doanh nghiệp",
      value: dataBusinessPosition.totalStar || 0,
    },
    {
      name: "Định giá cơ bản",
      value: dataBasicPrice.totalStar || 0,
    },
    {
      name: "Ngành nghề kinh doanh",
      value: dataBussinessAnalysis.totalStar || 0,
    },
    {
      name: "Quyền lợi NĐT cá nhân",
      value: dataIndividualInvestorBenefits.totalStar || 0,
    },
    {
      name: "Phân tích kỹ thuật",
      value: dataTechnicalAnalysis.totalStar || 0,
    },
  ];

  const dataTotalStarAll = [
    {
      name: "Sức khoẻ tài chính",
      value: dataFinancialHealthAnalysis.totalStarAll || 0,
    },
    {
      name: "Vị thế doanh nghiệp",
      value: dataBusinessPosition.totalStarAll || 0,
    },
    {
      name: "Định giá cơ bản",
      value: dataBasicPrice.totalStarAll || 0,
    },
    {
      name: "Ngành nghề kinh doanh",
      value: dataBussinessAnalysis.totalStarAll || 0,
    },
    {
      name: "Quyền lợi NĐT cá nhân",
      value: dataIndividualInvestorBenefits.totalStarAll || 0,
    },
    {
      name: "Phân tích kỹ thuật",
      value: dataTechnicalAnalysis.totalStarAll || 0,
    },
  ];

  const dataTotalStarIndustry = [
    {
      name: "Sức khoẻ tài chính",
      value: dataFinancialHealthAnalysis.totalStarIndustry || 0,
    },
    {
      name: "Vị thế doanh nghiệp",
      value: dataBusinessPosition.totalStarIndustry || 0,
    },
    {
      name: "Định giá cơ bản",
      value: dataBasicPrice.totalStarIndustry || 0,
    },
    {
      name: "Ngành nghề kinh doanh",
      value: dataBussinessAnalysis.totalStarIndustry || 0,
    },
    {
      name: "Quyền lợi NĐT cá nhân",
      value: dataIndividualInvestorBenefits.totalStarIndustry || 0,
    },
    {
      name: "Phân tích kỹ thuật",
      value: dataTechnicalAnalysis.totalStarIndustry || 0,
    },
  ];

  const options = {
    accessibility: {
      enabled: false,
    },
    credits: false,
    chart: {
      polar: true,
      type: "area",
      backgroundColor: "transparent", // màu nền của biểu đồ
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: dataTotalStarStock?.map((item) => item.name),
      tickmarkPlacement: "on",
      lineWidth: 0,
      labels: {
        style: {
          color: localStorage.getItem("color"), // màu cho các nhãn trục x
          fontFamily: "Roboto", // Sử dụng font chữ "Roboto"
        },
      },
    },
    yAxis: {
      gridLineInterpolation: "polygon",
      lineWidth: 0,
      min: 0,
      labels: {
        enabled: false,
      },
    },
    legend: {
      align: "left",
      verticalAlign: "middle",
      layout: "vertical",
      itemStyle: {
        color: localStorage.getItem("color"),
        fontWeight: "bold",
        fontFamily: "Roboto", // Sử dụng font chữ "Roboto"
      },
    },
    series: [
      {
        name: queryApi.stock,
        data: dataTotalStarStock?.map((item) => item.value),
        pointPlacement: "on",
        fillColor: "rgba(255, 211, 54, 0.3)", // Màu với độ mờ
        lineWidth: 2, // Độ dày của dòng
        color: "#FFD336", // Màu của dòng
      },
      {
        name: dataInfoHeader.industry,
        data: dataTotalStarIndustry?.map((item) => item.value),
        pointPlacement: "on",
        fillColor: "rgba(255, 0, 0, 0.3)", // Màu với độ mờ
        lineWidth: 2, // Độ dày của dòng
        color: "#FF0000", // Màu của dòng
      },
      {
        name: "Thị trường",
        data: dataTotalStarAll?.map((item) => item.value),
        pointPlacement: "on",
        fillColor: "rgba(185, 71, 255, 0.3)", // Màu với độ mờ
        lineWidth: 2, // Độ dày của dòng
        color: "#6F47FF", // Màu của dòng
      },
    ],
  };

  return (
    <div>
      <div>
        {dataTotalStarStock?.length > 0 ? (
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { height: "100%", width: "100%" } }}
          />
        ) : (
          <div className="h-[300px] flex items-center justify-center">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

export default SpiderWebChart;
