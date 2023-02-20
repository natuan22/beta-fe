import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';

const Top10Decr = () => {
  const dataDiemAnhHuong5PhienGiam = useSelector(state => state.chart.dataDiemAnhHuong5PhienGiam);
  const [data, setData] = useState(dataDiemAnhHuong5PhienGiam)

  useEffect(() => {
    setData(dataDiemAnhHuong5PhienGiam)
  }, [dataDiemAnhHuong5PhienGiam])

  const sortedData = data && data.data ? [...data.data].sort((a, b) => a.value - b.value) : []
  const last10 = sortedData.slice(0, 10)

  const series = [{
    name: 'Giảm',
    data: last10.map(item => item.value.toFixed(2)),
  }]

  const options = {
    chart: {
      // background: '#020203',
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
        borderRadius: 4,
        horizontal: true,
      }
    },
    fill: {
      colors: '#fe0001'
    },
    dataLabels: {
      enabled: true,
      offsetX: 30,
      style: {
        colors: ['#212529']
      },
    },
    xaxis: {
      categories: last10.map(item => item.ticker),
      // labels: {
      //     style: {
      //         colors: '#fff',
      //     }
      // }
    },
    yaxis: {
      opposite: true,
      // labels: {
      //     style: {
      //         colors: '#fff',
      //     }
      // }
    }
  };

  return (
    <>
      <div className="chart">
        <ReactApexChart options={options} series={series} type="bar" height={350} />
      </div>
    </>
  )
}

export default Top10Decr