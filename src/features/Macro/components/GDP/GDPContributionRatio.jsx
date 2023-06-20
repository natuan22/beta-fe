import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from "highcharts";
import Loading from '../../../Chart/utils/Loading';

const GDPContributionRatio = () => {
    const { dataGDPContributionRatio } = useSelector(state => state.marco)
    const [timeLine, setTimeLine] = useState()
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true);
    const [nameTb, setNameTb] = useState([])
    const [industry1, setIndustry1] = useState()
    const [industry2, setIndustry2] = useState()
    const [industry3, setIndustry3] = useState()

    useEffect(() => {
        if (dataGDPContributionRatio?.length > 0) {
            setLoading(false);
            const modifiedArray = dataGDPContributionRatio.map(item => {
                const modifiedName = item.name.replace('Giá trị GDP (2010) : ', '').replace(' (Tỷ VNĐ)', '');
                return { ...item, name: modifiedName };
            });
            const uniqueDates = [...new Set(modifiedArray?.map(item => moment(item.date).format('DD/MM/YYYY')))];
            setTimeLine(uniqueDates)

            const result = [];

            modifiedArray?.forEach(item => {
                const colorArr = ['#2D8BBA', '#41B8D5', '#6CE5E8'];
                const name = item.name;
                const value = +item.value.toFixed(2);
                const date = item.date

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
            const industrySt = modifiedArray.filter(item => item.name === uniqueNames[0]).map(item => item.value);
            const industryNd = modifiedArray.filter(item => item.name === uniqueNames[1]).map(item => item.value);
            const industryTh = modifiedArray.filter(item => item.name === uniqueNames[2]).map(item => item.value);
            setIndustry1(industrySt)
            setIndustry2(industryNd)
            setIndustry3(industryTh)
        }
    }, [dataGDPContributionRatio])

    const options = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {
            type: 'column',
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
            // min: minValue ,
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
        tooltip: {
            pointFormat: '<span>{series.name}</span>: <b>{point.y}%</b><br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent',
                dataLabels: {
                    enabled: false,
                },
            },
        },
        series: data,
    };

    return (
        <div>
            {dataGDPContributionRatio?.length > 0 ? (
                <div className='h-[218px] mt-2'>
                    <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                </div>
            ) : (
                <div className="mt-16 mb-32"><Loading /></div>
            )}
            <section className="bg-blueGray-50 pt-1.5">
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
                        <div className="block xxs:w-[295px] xs:w-[350px] sm:w-[400px] md:w-[670px] lg:w-[897px] xl:w-full scrollbar-thin scrollbar-thumb-[#436FB5] dark:scrollbar-track-[#151924] scrollbar-track-transparent overflow-x-scroll bg-transparent h-[209px]">
                            <table className="items-center w-full border-collapse bg-transparent">
                                <thead className="sticky top-0 bg-[#1E5D8B] z-10">
                                    <tr>
                                        <th className="text-center align-middle px-3 py-[19px] whitespace-nowrap font-semibold text-xs text-white">
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
                                        <th className={`text-left align-middle whitespace-nowrap px-1 py-[14px] text-sm dark:text-white text-black`}>
                                            {nameTb[0]}
                                        </th>
                                        {industry1?.map(item => {
                                            return (
                                                <td key={item} className={`text-sm text-center align-middle whitespace-nowrap px-1 py-[14px] font-semibold dark:text-white text-black`}>
                                                    {item.toLocaleString('en-US', { maximumFractionDigits: 2 })}%
                                                </td>
                                            )
                                        })}
                                    </tr>
                                    <tr className="dark:hover:bg-gray-800 hover:bg-gray-300 duration-500">
                                        <th className={`text-left align-middle whitespace-nowrap px-1 py-[14px] text-sm dark:text-white text-black`}>
                                            {nameTb[1]}
                                        </th>
                                        {industry2?.map(item => {
                                            return (
                                                <td key={item} className={`text-sm text-center align-middle whitespace-nowrap px-1 py-[14px] font-semibold dark:text-white text-black`}>
                                                    {item.toLocaleString('en-US', { maximumFractionDigits: 2 })}%
                                                </td>
                                            )
                                        })}
                                    </tr>
                                    <tr className="dark:hover:bg-gray-800 hover:bg-gray-300 duration-500">
                                        <th className={`text-left align-middle whitespace-nowrap px-1 py-[14px] text-sm dark:text-white text-black`}>
                                            {nameTb[2]}
                                        </th>
                                        {industry3?.map(item => {
                                            return (
                                                <td key={item} className={`text-sm text-center align-middle whitespace-nowrap px-1 py-[14px] font-semibold dark:text-white text-black`}>
                                                    {item.toLocaleString('en-US', { maximumFractionDigits: 2 })}%
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
        </div>
    )
}

export default GDPContributionRatio