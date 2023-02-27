import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';

const Top10Incr = () => {
  const dataDiemAnhHuong5PhienTang = useSelector(state => state.chart.dataDiemAnhHuong5PhienTang);
  const [data, setData] = useState(dataDiemAnhHuong5PhienTang)

  useEffect(() => {
    setData(dataDiemAnhHuong5PhienTang)
  }, [dataDiemAnhHuong5PhienTang])

  const sortedData = data && data.data ? [...data.data].sort((a, b) => a.value - b.value) : []
  const top10 = sortedData.slice(-10).sort(function () {
    return -1;
  })

  const series = [{
    name: 'Tăng',
    data: top10.map(item => item.value),
  }]

  const options = {
    grid: {
      show: false,      // you can either change hear to disable all grids
      xaxis: {
        lines: {
          show: false  //or just here to disable only x axis grids
        }
      },
      yaxis: {
        lines: {
          show: true  //or just here to disable only y axis
        }
      },
    },
    chart: {
      background: '#020203',
      toolbar: {
        show: false,
      },
      type: 'bar',
      fontFamily: 'Segoe UI',
    },
    title: {
      text: '',
      align: 'center',
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: 'top'
        },
        horizontal: true,
        barHeight: '50%',
        borderRadius: 0
      }
    },
    fill: {
      colors: '#19d216'
    },
    dataLabels: {
      enabled: false,
      offsetX: 30,
      style: {
        colors: ['#212529']
      },
    },
    xaxis: {
      categories: top10.map(item => item.ticker),
      labels: {
        show: true,
        formatter: function (y) {
          return y.toFixed(2);
        },
        style: {
          colors: '#fff',
        }
      },
      axisTicks: {
        show: false,
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#fff',
        }
      }
    }
  };

  return (
    <>
      <div className="chart">
        <ReactApexChart options={options} series={series} type="bar" height={705} />
      </div>
    </>
  )
}

export default Top10Incr