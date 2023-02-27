import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';

const StackingChartTest = () => {
  const dataStackChart = useSelector(state => state.chart.dataStackingArea)
  console.log(dataStackChart.data)
  if(!dataStackChart || !dataStackChart.data.length) return null
  const options = {
    chart: {
        type: 'area',
        stacked: true
    },
    title: {
        text: '100% Stacked Area Chart'
    },
    xAxis: {
        categories: ['09:00','09:15','09:30','09:45','10:00','10:15','10:30','10:45','11:00','11:15','11:30','13:00','13:15','13:30','13:45','14:00','14:15','14:30','14:45'],
        minPadding: 0 
    },
    yAxis: {
      startOnTick: false,
      endOnTick: true,
        title: {
            text: 'Percentage'
        },
        labels: {
            formatter: function () {
                return this.value + '%';
            }
        }
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.y}%</b><br/>Total: <b>{point.stackTotal}%</b>'
    },
    plotOptions: {
        area: {
            stacking: 'percent',
            lineColor: '#666666',
            lineWidth: 1,
            marker: {
                lineWidth: 1,
                lineColor: '#666666'
            }
        }
    },
    series: [{
        name: 'No change',
        data: dataStackChart.data?.map(item => item.noChange)
    }, {
        name: 'Decline ',
        data: dataStackChart.data?.map(item => item.decline)
    }, {
        name:  'Advance',
        data: dataStackChart.data?.map(item => item.advance)
    }]
};
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />

    </div>
  )
}

export default StackingChartTest