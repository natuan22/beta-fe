import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { useSelector } from 'react-redux'

const BarChartLeft = () => {
  const dataBarChartLeft = useSelector(state => state.chart.dataBarChartLeft)
  const [data, setData] = useState(dataBarChartLeft.data)

  useEffect(()=> {
    setData(dataBarChartLeft.data)
  },[dataBarChartLeft])

  const series = [
    {
      name: 'Volume trade',
      data: data?.data?.map(item => item.point.toFixed(2)),
    },
  ];

  const options = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        colors: {
          ranges: [
            {
              from: 0,
              to: 100,
              color: '#19d216',
            },
            {
              from: -45,
              to: 0,
              color: '#f10000',
            },
          ],
        },
        columnWidth: '80%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      labels: {
        formatter: function(y) {
          return (y / 10).toFixed(1);
        },
      },
    },
    xaxis: {
      categories: [1,2,3,4,5,6,7],
      labels: {
        rotate: 0,
        style: {
          fontWeight: 'bold',
        },
      },
    },
  };

  return (
    <div className="chart">
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
}

export default BarChartLeft
