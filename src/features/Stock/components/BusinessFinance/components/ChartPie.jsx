import React from 'react'
import Highcharts from "highcharts/highstock";
import PieChart from "highcharts-react-official";
import Loading from '../../../../Chart/utils/Loading';

const ChartPie = ({ data }) => {

    const options = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {
            type: "pie",
            backgroundColor: 'transparent',
        },
        title: {
            text: ""
        },
        subtitle: {
            text: ""
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: false
                },
                borderRadius: '50%'
            }
        },
        tooltip: {
            valueSuffix: "%"
        },
        legend: {
            align: 'center',
            itemStyle: {
                fontSize: '10px',
                color: localStorage.getItem('color')
            }
        },
        series: [
            {
                name: "Tỷ lệ",
                data: data,
                size: '80%',
                innerSize: '50%',
                showInLegend: true // Hiển thị trong legend
            }
        ],
    };

    return (
        <div>
            {data?.length > 0 ? (
                <div className='h-[400px]'>
                    <PieChart highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                </div>
            ) : (
                <div className="h-[400px] flex items-center justify-center"><Loading /></div>
            )}
        </div>
    )
}

export default ChartPie