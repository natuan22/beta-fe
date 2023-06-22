import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from "highcharts";
import Loading from '../../../Chart/utils/Loading';

const GDPByPrice = () => {
    const { dataGDPByPrice } = useSelector(state => state.marco)
    const [timeLine, setTimeLine] = useState()
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true);
    const [nameTb, setNameTb] = useState([])
    const [price1, setprice1] = useState()
    const [price2, setprice2] = useState()
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        setColorText(color);
    }, [color])

    useEffect(() => {
        if (dataGDPByPrice?.length > 0) {
            setLoading(false);
            const modifiedArray = dataGDPByPrice.map(item => {
                const modifiedName = item.name.replace(' (2010) (Tỷ VNĐ)', '').replace(' (Tỷ VNĐ)', '');
                const quarter = moment(item.date, 'YYYY/MM/DD').quarter(); // Lấy quý từ ngày
                const year = moment(item.date, 'YYYY/MM/DD').year(); // Lấy năm từ ngày

                return { ...item, name: modifiedName, date: `Quý ${quarter}/${year}` };
            });
            const uniqueDates = [...new Set(modifiedArray?.map(item => item.date))];
            setTimeLine(uniqueDates)

            const result = [];

            modifiedArray?.forEach(item => {
                const colorArr = ['#2D8BBA', '#41B8D5'];
                const name = item.name;
                const value = item.value;

                const existingObj = result.find(obj => obj.name === name);

                if (existingObj) {
                    existingObj.data.push(value);
                } else {
                    const uniqueColorIndex = result.length % colorArr.length;
                    result.push({
                        name: name,
                        data: [value],
                        color: colorArr[uniqueColorIndex]
                    });
                }
            })
            setData(result)
            const uniqueNames = [...new Set(modifiedArray?.map(item => item.name))];
            setNameTb(uniqueNames)

            // Cắt thành 3 mảng giá trị dựa trên từng "name"
            const priceSt = modifiedArray.filter(item => item.name === uniqueNames[0]).map(item => item.value);
            const priceNd = modifiedArray.filter(item => item.name === uniqueNames[1]).map(item => item.value);
            setprice1(priceSt)
            setprice2(priceNd)
        }
    }, [dataGDPByPrice])

    const options = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {
            type: 'line',
            backgroundColor: 'transparent',
        },
        title: {
            text: '',
        },
        xAxis: {
            categories: timeLine,
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
        },
        legend: {
            enabled: false,
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
        series: data,
    };

    return (
        <div>
            {dataGDPByPrice?.length > 0 ? (
                <div className='h-[298px] mt-2'>
                    <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                </div>
            ) : (
                <div className="mt-16 mb-52"><Loading /></div>
            )}
            <section className="bg-blueGray-50 pt-1.5">
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
                        <div className="block xxs:w-[295px] xs:w-[350px] sm:w-[400px] md:w-[670px] lg:w-[897px] xl:w-full scrollbar-thin scrollbar-thumb-[#436FB5] dark:scrollbar-track-[#151924] scrollbar-track-transparent overflow-x-scroll bg-transparent h-[225px]">
                            <table className="items-center w-full border-collapse bg-transparent">
                                <thead className="sticky top-0 bg-[#1E5D8B] z-10">
                                    <tr>
                                        <th className="sticky left-0 bg-[#1E5D8B] text-center align-middle px-3 py-[19px] whitespace-nowrap font-semibold text-xs text-white">
                                            Kỳ
                                        </th>
                                        {!loading ? (Array.isArray(timeLine) && timeLine?.map(item => {
                                            return (
                                                <th key={item} className="text-center align-middle px-3 py-[19px] text-xs font-semibold text-white">
                                                    {item}
                                                </th>
                                            )
                                        })) : (<th><Loading /></th>)}
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr className="dark:hover:bg-gray-800 hover:bg-gray-300 duration-500">
                                        <th className={`sticky left-0 dark:bg-[#151924] bg-gray-100 text-left align-middle whitespace-nowrap px-1 py-6 text-sm dark:text-white text-black`}>
                                            {nameTb[0]}
                                        </th>
                                        {price1?.map(item => {
                                            return (
                                                <td key={item} className={`text-sm text-center align-middle whitespace-nowrap px-1 py-6 font-semibold dark:text-white text-black`}>
                                                    {item.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                    <tr className="dark:hover:bg-gray-800 hover:bg-gray-300 duration-500">
                                        <th className={`sticky left-0 dark:bg-[#151924] bg-gray-100 text-left align-middle whitespace-nowrap px-1 py-6 text-sm dark:text-white text-black`}>
                                            {nameTb[1]}
                                        </th>
                                        {price2?.map(item => {
                                            return (
                                                <td key={item} className={`text-sm text-center align-middle whitespace-nowrap px-1 py-6 font-semibold dark:text-white text-black`}>
                                                    {item.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    )
}

export default GDPByPrice