import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../Chart/utils/Loading';
import HighchartsReact from 'highcharts-react-official'
import Highcharts from "highcharts";
import { fetchDataPerCPIBySectors, fetchDataTablePerCPIBySectors } from '../../thunk';

const PerCPIBySectors = () => {
    const dispatch = useDispatch();
    const { dataPerCPIBySectors } = useSelector(state => state.macro)
    const { dataTablePerCPIBySectors } = useSelector(state => state.macro)
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
        dispatch(fetchDataPerCPIBySectors)
        dispatch(fetchDataTablePerCPIBySectors)
    }, [dispatch]);

    useEffect(() => {
        if (dataPerCPIBySectors?.length > 0) {
            setLoading(false);
            const modifiedArray = dataPerCPIBySectors.map(item => {
                const modifiedName = item.name.replace('Tăng trưởng CPI :', '').replace('MoM (%)', '');
                const month = moment(item.date, 'YYYY/MM/DD').month() + 1 // Lấy tên tháng từ ngày
                const year = moment(item.date, 'YYYY/MM/DD').year(); // Lấy năm từ ngày

                return { ...item, name: modifiedName, date: `Tháng ${month}/${year}` };
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
    }, [dataPerCPIBySectors])

    useEffect(() => {
        if (dataTablePerCPIBySectors?.length > 0) {
            const modifiedArray2 = dataTablePerCPIBySectors.map(item => {
                const modifiedName = item.name.replace('Tăng trưởng CPI :', '').replace('MoM (%)', '').replace('Tăng trưởng CPI CPI :', '');
                const month = moment(item.date, 'YYYY/MM/DD').month() + 1 // Lấy tên tháng từ ngày
                const year = moment(item.date, 'YYYY/MM/DD').year(); // Lấy năm từ ngày

                return { ...item, name: modifiedName, date: `Tháng ${month}/${year}` };
            });
            const uniqueDates = [...new Set(modifiedArray2?.map(item => item.date))];
            setDates(uniqueDates);
            const newData = {};
            modifiedArray2.forEach(item => {
                if (!newData[item.name]) {
                    newData[item.name] = [];
                }
                newData[item.name].push(item.value);
            });
            setDataTb(Object.entries(newData).map(([name, values]) => ({ name, values })));
        }
    }, [dataTablePerCPIBySectors])

    const options = {
        chart: {
            backgroundColor: "transparent", // màu nền của biểu đồ
            type: 'column'
        },
        accessibility: {
            enabled: false
        },
        credits: false,
        title: {
            text: "",
            style: {
                color: 'white'
            }
        },
        xAxis: {
            categories: timeLine,
            labels: {
                style: {
                    color: localStorage.getItem('color'), // màu cho các nhãn trục x
                    fontSize: '9px',
                }
            },
            title: {
                style: {
                    color: localStorage.getItem('color') // màu cho tiêu đề trục x
                }
            }
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
            },
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
                    }
                },
                opposite: true,
                gridLineWidth: 0.5,
            },

        ],
        legend: {
            verticalAlign: 'top',
            align: 'center',
            itemStyle: {
                fontSize: '10px',
                color: localStorage.getItem('color')
            }
        },

        series: data,
    };

    return (
        <>
            {dataPerCPIBySectors?.length > 0 ? (
                <div className='h-[300px]'>
                    <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                </div>
            ) : (
                <div className="h-[300px] flex items-center justify-center"><Loading /></div>
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

export default PerCPIBySectors