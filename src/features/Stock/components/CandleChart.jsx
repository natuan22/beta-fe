import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock'; // Import highstock module
import HighchartsReact from 'highcharts-react-official';
import stockModule from 'highcharts/modules/stock'; // Import module "stock"

stockModule(Highcharts); // Kích hoạt module "stock"

const CandleChart = () => {
    const options = {
        chart: {
            backgroundColor: 'white'
        },
        title: {
            text: 'Biểu đồ giá cổ phiếu',
        },
        rangeSelector: {
            selected: 1, // Chọn khoảng thời gian mặc định để hiển thị
        },
        series: [
            {
                type: 'candlestick', // Loại biểu đồ nến
                name: 'Giá cổ phiếu',
                data: [
                    // Dữ liệu giá cổ phiếu dạng [thời gian, giá mở, giá cao, giá thấp, giá đóng]
                    [1627808400000, 100, 120, 80, 110],
                    [1627894800000, 110, 130, 100, 125],
                ],
            },
            {
                type: 'column',
                name: 'Khối lượng giao dịch',
                data: [
                    // Dữ liệu khối lượng giao dịch dạng [thời gian, khối lượng]
                    [1627808400000, 2000000],
                    [1627894800000, 1500000],
                ],
                yAxis: 1, // Đặt dữ liệu này trên trục thứ hai
            },
        ],
        yAxis: [
            {
                // Cấu hình trục giá cổ phiếu
                title: {
                    text: 'Giá cổ phiếu',
                },
                height: '70%',
                gridLineWidth: 0, // Tắt lưới trên trục y
                crosshair: false,

            },
            {
                // Cấu hình trục khối lượng giao dịch
                title: {
                    text: 'Khối lượng giao dịch',
                },
                top: '75%', // Vị trí bắt đầu của cửa sổ biểu đồ khối lượng
                height: '25%', // Chiều cao của cửa sổ biểu đồ khối lượng
                offset: 0, // Làm cho cửa sổ khối lượng không bị lệch khi kéo biểu đồ nến
            },

        ],
        xAxis: {
            crosshair: true,
        },
        tooltip: {
            split: true
        },
    };

    return (
        <HighchartsReact highcharts={Highcharts} options={options} />
    )
};

export default CandleChart;
