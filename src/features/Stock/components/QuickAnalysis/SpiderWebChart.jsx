import React from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from 'react-redux';
import Loading from '../../../Chart/utils/Loading';

const SpiderWebChart = ({ queryApi }) => {
    const { dataFinancialHealthAnalysis, dataBusinessPosition, dataBasicPrice, dataBussinessAnalysis, dataIndividualInvestorBenefits, dataTechnicalAnalysis } = useSelector(state => state.stock)

    const dataTotalStar = [{
        name: 'Sức khoẻ tài chính',
        value: dataFinancialHealthAnalysis.totalStar || 0
    },
    {
        name: 'Vị thế doanh nghiệp',
        value: dataBusinessPosition.totalStar || 0
    },
    {
        name: 'Định giá cơ bản',
        value: dataBasicPrice.totalStar || 0
    },
    {
        name: 'Ngành nghề kinh doanh',
        value: dataBussinessAnalysis.totalStar || 0
    },
    {
        name: 'Quyền lợi NĐT cá nhân',
        value: dataIndividualInvestorBenefits.totalStar || 0
    },
    {
        name: 'Phân tích kỹ thuật',
        value: dataTechnicalAnalysis.totalStar || 0
    }]

    const options = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {
            polar: true,
            type: 'area',
            backgroundColor: "transparent", // màu nền của biểu đồ
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: dataTotalStar?.map(item => item.name),
            tickmarkPlacement: 'on',
            lineWidth: 0,
            labels: {
                style: {
                    color: localStorage.getItem('color'), // màu cho các nhãn trục x
                    fontFamily: 'Roboto', // Sử dụng font chữ "Roboto"
                }
            },
        },
        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0,
            labels: {
                enabled: false
            },
        },
        legend: {
            align: 'left',
            verticalAlign: 'middle',
            layout: 'vertical',
            itemStyle: {
                color: localStorage.getItem('color'),
                fontWeight: 'bold'
            }
        },
        series: [{
            name: queryApi.stock,
            data: dataTotalStar?.map(item => item.value),
            pointPlacement: 'on',
            fillColor: 'rgba(255, 211, 54, 0.3)', // Màu với độ mờ
            lineWidth: 2, // Độ dày của dòng
            color: '#FFD336', // Màu của dòng
        }],
    }

    return (
        <div>
            <div>
                {dataTotalStar?.length > 0 ? (
                    <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                ) : (
                    <div className='h-[300px] flex items-center justify-center'><Loading /></div>
                )}
            </div>
        </div>
    )
}

export default SpiderWebChart