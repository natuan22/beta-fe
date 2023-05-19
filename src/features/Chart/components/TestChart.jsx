import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const TestChart = () => {
  // Dữ liệu mẫu cho biểu đồ
  const data = [
    {
      name: 'Ngành A',
      data: [5, 3, 4, 7, 2],
    },
    {
      name: 'Ngành B',
      data: [2, 2, 3, 2, 1],
    },
    {
      name: 'Ngành C',
      data: [3, 4, 4, 2, 5],
    },
  ];

  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Biểu đồ Stacking Column',
    },
    xAxis: {
      categories: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Giá trị',
      },
      stackLabels: {
        enabled: true,
      },
    },
    legend: {
      enabled: true,
    },
    plotOptions: {
      column: {
        stacking: 'normal',
      },
    },
    series: data,
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default TestChart;
