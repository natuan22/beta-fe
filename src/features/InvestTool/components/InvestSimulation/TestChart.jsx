import React, { useEffect, useState } from 'react'
import Loading from '../../../Chart/utils/Loading';
import HighchartsReact from 'highcharts-react-official'
import Highcharts, { time } from "highcharts";
import moment from 'moment';

const TestChart = ({ data }) => {
    const [dataVnindex, setDataVnindex] = useState()
    const [dataCate1, setDataCate1] = useState()
    const [dataCate2, setDataCate2] = useState()
    const [dataCate3, setDataCate3] = useState()
    useEffect(() => {
        if (data?.length > 0) {
            // Mảng màu theo thứ tự cho các name tương ứng
            const colorArr = ['#fff', '#FFD300', '#0056FF', '#F60101'];



            // Đối tượng sẽ lưu trữ dữ liệu mới
            const transformedData = {};

            // Lặp qua mảng dữ liệu gốc để biến đổi và thêm màu
            data.forEach((item, index) => {
                const { name, value, date } = item;
                // Kiểm tra xem đã có đối tượng với name tương ứng hay chưa
                if (!transformedData[name]) {
                    transformedData[name] = { name, data: [], color: colorArr[index % colorArr.length] };
                }

                // Thêm cặp value và date vào mảng data
                transformedData[name].data.push([value, moment(date, 'YYYY/MM/DD').valueOf()]);
            });

            // Chuyển đổi đối tượng thành mảng
            const finalResult = Object.values(transformedData);
            setDataVnindex(finalResult[0]);
            setDataCate1(finalResult[1]);
            setDataCate2(finalResult[2]);
            setDataCate3(finalResult[3]);
        }

    }, [data])
    // console.log({ dataCate1 })
    // console.log('time1', dataCate1?.data[0][1])
    // console.log('time2', dataCate1?.data[dataCate1.data.length - 1][1])
    const options = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {
            type: 'spline',
            backgroundColor: 'transparent',
        },
        title: {
            text: '',
        },
        // Trong phần tùy chỉnh biểu đồ (options)
        xAxis: {
            type: "datetime",
            tickInterval: 30 * 24 * 3600 * 1000,
            min: dataCate1?.data[0][1],
            max: dataCate1?.data[dataCate1.data.length - 1][1],
            labels: {
                style: {
                    color: localStorage.getItem('color'),
                    fontSize: '9px',
                },
            },
        },
        yAxis: {
            title: {
                text: null,
                style: {
                    color: localStorage.getItem('color'),
                },
            },
            stackLabels: {
                enabled: false,
            },
            labels: {
                style: {
                    color: localStorage.getItem('color'),
                },
            },
            gridLineWidth: 0.5,
        },
        legend: {
            verticalAlign: 'top',
            enabled: true,
            itemStyle: {
                color: localStorage.getItem('color'),
                fontWeight: 'bold'
            },

        },
        plotOptions: {
            series: {
                marker: {
                    radius: 2, // Giá trị bán kính marker
                },
            },
        },

        series: [
            {
                name: "VNINDEX",
                data: dataVnindex,
                color: "#ff0000",
                lineColor: "#ff0000",
                lineWidth: 2,
                marker: {
                    enabled: false,
                },
            },
            {
                name: "Danh mục 1",
                data: dataCate1,
                color: "#ffd51e",
                lineColor: "#ffd51e",
                lineWidth: 2,
                marker: {
                    enabled: false,
                },
            },
            {
                name: "Danh mục 2",
                data: dataCate2,
                color: "#19d216",
                lineColor: "#19d216",
                lineWidth: 2,
                marker: {
                    enabled: false,
                },
            },
            {
                name: "Danh mục 3",
                data: dataCate3,
                color: "#19d216",
                lineColor: "#19d216",
                lineWidth: 2,
                marker: {
                    enabled: false,
                },
            },
        ],
    };

    return (
        <div>
            <div className="border-solid border-[#9E9E9E] border-b-2 border-t-0 border-x-0 w-[405px]">
                <div className="dark:text-white text-black font-semibold flex items-center uppercase">
                    HIỆU QUẢ ĐẦU TƯ THEO DANH MỤC
                </div>
            </div>
            {data?.length > 0 ? (
                <div className='h-[300px] mt-2'>
                    <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                </div>
            ) : (
                <div className="h-[300px] flex items-center justify-center"><Loading /></div>
            )}
        </div>
    )
}

export default TestChart