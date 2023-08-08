import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataCentralRate } from '../../thunk';
import Loading from '../../../Chart/utils/Loading';
import HighchartsReact from 'highcharts-react-official'
import Highcharts from "highcharts";
import moment from 'moment';

const CentralRate = () => {
  const dispatch = useDispatch();
  const { dataCentralRate } = useSelector(state => state.macro)
  const [timeLine, setTimeLine] = useState()
  const [data, setData] = useState()
  const [colorText, setColorText] = useState(localStorage.getItem('color'));
  const color = useSelector((state) => state.color.colorText);

  useEffect(() => {
    setColorText(color);
  }, [color])

  useEffect(() => {
    dispatch(fetchDataCentralRate)
  }, [dispatch]);

  useEffect(() => {
    if (dataCentralRate?.length > 0) {
      const uniqueDates = [...new Set(dataCentralRate?.map(item => moment(item.date).format('DD/MM/YYYY')))];
      setTimeLine(uniqueDates)
      setData(dataCentralRate.map((item) => [item.value]))
    }
  }, [dataCentralRate])

  const options = {
    accessibility: {
      enabled: false,
    },
    credits: false,
    chart: {
      type: "area",
      backgroundColor: "transparent",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: timeLine,
      title: {
        text: "",
        style: {
          color: localStorage.getItem('color'),
        },
      },
      labels: {
        style: {
          color: localStorage.getItem('color'),
        },
      },
    },
    yAxis: [
      {
        title: {
          text: "",
          style: {
            color: localStorage.getItem('color'),
          },
        },
        labels: {
          style: {
            color: localStorage.getItem('color') // màu cho các nhãn trục y
          },
        },
        gridLineWidth: 0.5,
      }
    ],
    legend: {
      itemStyle: {
        color: localStorage.getItem('color'),
      },
    },
    series: [
      {
        name: "Tỷ giá",
        data: data,
        color: "#0285A1",
        opacity: "0.9",
        lineColor: "#0285A1",
        lineWidth: 2,
        marker: {
          enabled: false,
        },
      },
    ],
    legend: {
      enabled: false,
      align: 'center',
      verticalAlign: 'top',
      itemStyle: {
        fontSize: '10px',
        color: localStorage.getItem('color')
      }
    },
  };

  return (
    <div>
      {dataCentralRate?.length > 0 ? (
        <div className='h-[404px] mt-2'>
          <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
        </div>
      ) : (
        <div className="h-[404px] flex items-center justify-center"><Loading /></div>
      )}
    </div>

  )
}

export default CentralRate