import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from "highcharts";
import Loading from '../../../Chart/utils/Loading';
import { fetchDataIndexIndustrialProduction, fetchDataTableIndexIndustrialProduction } from '../../thunk';
const hashtb = {
    'Toàn ngành công nghiệp': 0,
    'Sản xuất và Phân phối điện': 1,
    'Khai khoáng': 2,
    'Cung cấp nước, hoạt động quản lý và xử lý rác thải, nước thải': 3,
    'Công nghiệp chế biến, chế tạo': 4
}

const IndexIndustrialProduction = () => {
    const dispatch = useDispatch();
    const { dataIndexIndustrialProduction } = useSelector(state => state.macro)
    const { dataTableIndexIndustrialProduction } = useSelector(state => state.macro)
    const [loading, setLoading] = useState(true);
    const [timeLine, setTimeLine] = useState()
    const [data, setData] = useState()
    const [dates, setDates] = useState()
    const [dataTb, setDataTb] = useState()

    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        setColorText(color);
    }, [color])

    useEffect(() => {
        dispatch(fetchDataIndexIndustrialProduction(0))
        dispatch(fetchDataTableIndexIndustrialProduction)
    }, [dispatch]);

    useEffect(() => {
        if (dataIndexIndustrialProduction?.length > 0) {
            setLoading(false);
            const modifiedArray = dataIndexIndustrialProduction.map(item => {
                const modifiedName = item.name.replace('Tăng trưởng: ', '').replace(' (%)', '');
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

                const existingObj = result.find(obj => obj.name === name);

                if (existingObj) {
                    existingObj.data.push(value);
                } else {
                    result.push({
                        name: name,
                        data: [value],
                    });
                }
            })
            setData(result)
        }
    }, [dataIndexIndustrialProduction])

    useEffect(() => {
        if (dataTableIndexIndustrialProduction?.length > 0) {
            setLoading(false);
            const modifiedArray = dataTableIndexIndustrialProduction.map(item => {
                const modifiedName = item.name.replace('Tăng trưởng: ', '').replace(' (%)', '');
                const month = moment(item.date, 'YYYY/MM/DD').month() + 1 // Lấy tên tháng từ ngày
                const year = moment(item.date, 'YYYY/MM/DD').year(); // Lấy năm từ ngày

                return { ...item, name: modifiedName, date: `Tháng ${month}/${year}` };
            });

            const uniqueDates = [...new Set(modifiedArray?.map(item => item.date))];
            setDates(uniqueDates);
            const newData = {};
            modifiedArray.forEach(item => {
                if (!newData[item.name]) {
                    newData[item.name] = [];
                }
                newData[item.name].push(item.value);
            });
            setDataTb(Object.entries(newData).map(([name, values]) => ({ name, values })));
        }
    }, [dataTableIndexIndustrialProduction])

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
        <>
            {dataIndexIndustrialProduction?.length > 0 ? (
                <div className='h-[350px] mt-2'>
                    <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                </div>
            ) : (
                <div className="h-[350px] flex items-center justify-center"><Loading /></div>
            )}
            <section className="bg-blueGray-50 pt-1.5">
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
                        <div className="block xxs:w-[295px] xs:w-[350px] sm:w-[400px] md:w-[670px] lg:w-[897px] xl:w-full scrollbar-thin scrollbar-thumb-[#436FB5] dark:scrollbar-track-[#151924] scrollbar-track-transparent overflow-x-scroll bg-transparent h-[300px]">
                            <table className="items-center w-full border-collapse bg-transparent">
                                <thead className="bg-[#1E5D8B] z-10" style={{ position: 'sticky', top: 0 }}>
                                    <tr>
                                        <th className="sticky left-0 bg-[#1E5D8B] text-center align-middle px-3 py-[19px] whitespace-nowrap font-semibold text-xs text-white">
                                            Lĩnh vực
                                        </th>
                                        {Array.isArray(dates) && dates?.map(item => (
                                            <th key={item} className="text-center align-middle px-3 py-[19px] text-xs font-semibold text-white">
                                                {item}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {!loading ? (Array.isArray(dataTb) && dataTb.map(item => {
                                        return (
                                            <tr key={item.name} className="dark:hover:bg-gray-800 hover:bg-gray-300 duration-500">
                                                <th className={`sticky left-0 dark:bg-[#151924] bg-gray-100 text-left align-middle whitespace-nowrap px-1 py-[18px] cursor-pointer text-sm dark:text-white text-black dark:hover:bg-gray-800 hover:bg-gray-300 duration-500`}
                                                    onClick={() => {
                                                        dispatch(fetchDataIndexIndustrialProduction(hashtb[item.name]))
                                                    }}>
                                                    {item.name}
                                                </th>
                                                {item.values.map((value, index) => (
                                                    <td key={index} className={`text-sm text-center align-middle whitespace-nowrap px-1 py-[18px] font-semibold dark:text-white text-black`}>
                                                        {value.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                                                    </td>
                                                ))}
                                            </tr>
                                        )
                                    })) : (<tr><td><div><Loading /></div></td></tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default IndexIndustrialProduction