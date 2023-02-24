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
    data: last10.map(item => item.value),
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
        barHeight: '60%',
        borderRadius: 0
      }
    },
    fill: {
      colors: '#fe0001'
    },
    dataLabels: {
      enabled: false,
      offsetX: 30,
      style: {
        colors: ['#212529']
      },
    },
    xaxis: {
      categories: last10.map(item => item.ticker),
      labels: {
        formatter: function (y) {
          return y.toFixed(2);
        },
        //     style: {
        //         colors: '#fff',
        //     }

          // style: {
          //     colors: '#fff',
          // }
          formatter: function (y) {
            return y.toFixed(1);
          },

      }
    },
    yaxis: {
      opposite: true,
      labels: {
        //     style: {
        //         colors: '#fff',
        //     }
      }
    }
  };

  return (
    <>
      <div className="chart">
        <ReactApexChart options={options} series={series} type="bar" height={450} />
      </div>
    </>
  )
}

export default Top10Decr