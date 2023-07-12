import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataChartTotalMeansOfPayment, fetchDataTableTotalMeansOfPayment } from '../../thunk';
import HighchartsReact from 'highcharts-react-official'
import Highcharts from "highcharts";
import Loading from '../../../Chart/utils/Loading';

const TotalMeansOfPayment = () => {
    const dispatch = useDispatch();
    const { dataChartTotalMeansOfPayment } = useSelector(state => state.marco)
    const { dataTableTotalMeansOfPayment } = useSelector(state => state.marco)
    const [timeLine, setTimeLine] = useState()
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true);
    const [dates, setDates] = useState()
    const [dataTb, setDataTb] = useState()
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        setColorText(color);
    }, [color])

    useEffect(() => {
        dispatch(fetchDataChartTotalMeansOfPayment)
        dispatch(fetchDataTableTotalMeansOfPayment)
    }, [dispatch]);

    useEffect(() => {
        if (dataChartTotalMeansOfPayment?.length > 0) {
            setLoading(false);
            const modifiedArray = dataChartTotalMeansOfPayment.map(item => {
                const modifiedName = item.name.replace(' (Tỷ đồng)', '');
                const quarter = moment(item.date, 'YYYY/MM/DD').quarter(); // Lấy quý từ ngày
                const year = moment(item.date, 'YYYY/MM/DD').year(); // Lấy năm từ ngày

                return { ...item, name: modifiedName, date: `Quý ${quarter}/${year}` };
            });
            const uniqueDates = [...new Set(modifiedArray?.map(item => item.date))];
            setTimeLine(uniqueDates)

            const result = [];

            modifiedArray?.forEach(item => {
                const name = item.name;
                const value = item.value;
                const color = item.color;

                const existingObj = result.find(obj => obj.name === name);

                if (existingObj) {
                    existingObj.data.push(value);
                } else {
                    result.push({
                        name: name,
                        data: [value],
                        color
                    });
                }
            })
            setData(result)
        }
    }, [dataChartTotalMeansOfPayment])

    useEffect(() => {
        if (dataTableTotalMeansOfPayment?.length > 0) {
            const modifiedArray = dataChartTotalMeansOfPayment.map(item => {
                const quarter = moment(item.date, 'YYYY/MM/DD').quarter(); // Lấy quý từ ngày
                const year = moment(item.date, 'YYYY/MM/DD').year(); // Lấy năm từ ngày

                return { ...item, date: `Quý ${quarter}/${year}` };
            });
            const dates = [...new Set(modifiedArray?.map(item => item.date))];
            setDates(dates);
            const newData = {};
            modifiedArray.forEach(item => {
                if (!newData[item.name]) {
                    newData[item.name] = [];
                }
                newData[item.name].push(item.value);
            });
            setDataTb(Object.entries(newData).map(([name, values]) => ({ name, values })));
        }
    }, [dataTableTotalMeansOfPayment])

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
            align: 'center',
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
        series: data,
    };

    return (
        <>
            {dataChartTotalMeansOfPayment?.length > 0 ? (
                <div className='h-[300px]'>
                    <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                </div>
            ) : (
                <div className="mt-16 mb-52 grid place-content-center"><Loading /></div>
            )}

            <section className="bg-blueGray-50 pt-1.5">
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
                        <div className="block xxs:w-[295px] xs:w-[350px] sm:w-[400px] md:w-[670px] lg:w-[897px] xl:w-full scrollbar-thin scrollbar-thumb-[#436FB5] dark:scrollbar-track-[#151924] scrollbar-track-transparent overflow-x-scroll bg-transparent h-[225px]">
                            <table className="items-center w-full border-collapse bg-transparent">
                                <thead className="bg-[#1E5D8B] z-10" style={{ position: 'sticky', top: 0 }}>
                                    <tr>
                                        <th className="sticky left-0 bg-[#1E5D8B] text-center align-middle px-3 py-[19px] whitespace-nowrap font-semibold text-xs text-white">
                                            Kỳ
                                        </th>
                                        {Array.isArray(dates) && dates?.map(item => (
                                            <th key={item} className="text-center align-middle px-3 py-[19px] text-xs font-semibold text-white">
                                                {item}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {!loading ? (Array.isArray(dataTb) && dataTb.map(item => (
                                        <tr key={item.name} className="dark:hover:bg-gray-800 hover:bg-gray-300 duration-500">
                                            <th className={`sticky left-0 dark:bg-[#151924] bg-gray-100 text-left align-middle whitespace-nowrap px-1 py-[14px] text-sm dark:text-white text-black`}>
                                                {item.name}
                                            </th>
                                            {item.values.map((value, index) => (
                                                <td key={index} className={`text-sm text-center align-middle whitespace-nowrap px-1 py-[14px] font-semibold dark:text-white text-black`}>
                                                    {value.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                                                </td>
                                            ))}
                                        </tr>
                                    ))) : (<tr><td><div><Loading /></div></td></tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TotalMeansOfPayment