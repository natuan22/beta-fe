import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
import HighchartsReact from 'highcharts-react-official';

Highcharts3D(Highcharts);

const ColumnChart = (props) => {
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartOptions({
      chart: {
        type: 'column',
        options3d: {
          enabled: true,
          alpha: 15,
          beta: 15,
          depth: 50,
          viewDistance: 25,
        },
      },
      xAxis: {
        categories: ['Tổng giá trị tài sản', 'Doanh thu thuần', 'Lợi nhuận từ HĐKD', 'Lợi nhuận khác', 'Lợi nhuận trước thuế', 'Lợi nhuận sau thuế'],
      },
      yAxis: {
        title: {
          enabled: false,
        },
      },
      tooltip: {
        headerFormat: '<b>{point.key}</b><br>',
        pointFormat: 'Cars sold: {point.y}',
      },
      title: {
        text: 'Sold passenger cars in Norway by brand, January 2021',
        align: 'left',
      },
      subtitle: {
        text:
          'Source: ' +
          '<a href="https://ofv.no/registreringsstatistikk"' +
          'target="_blank">OFV</a>',
        align: 'left',
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        column: {
          depth: 25,
        },
      },
      series: props.series,
    });
  }, [props.series]);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default ColumnChart;
