import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import Loading from '../../../../Chart/utils/Loading';
import FilterIndusty from '../../../utils/components/FilterIndusty';
import TableAverageDebtRatio from '../Table/TableAverageDebtRatio';
const ChartAverageDebtRatio = () => {
    const { dataChartAverageDebitIndustry, dataQuery } = useSelector(state => state.market)
    const { exchange } = dataQuery
    const [industryQuery, setIndustryQuery] = useState([])
    const [data, setData] = useState()
    const [timeLine, setTimeLine] = useState()

    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        if (dataChartAverageDebitIndustry?.length > 0) {
            const transformedData = dataChartAverageDebitIndustry?.map(item => {
                const year = item.date.slice(0, 4);
                const quarter = item.date.slice(4);
                const transformedDate = `Q${quarter} ${year}`;
                return { ...item, date: transformedDate };
            });
            const uniqueDates = [...new Set(transformedData?.map(item => item.date))];
            setTimeLine(uniqueDates)
            // Khởi tạo một Map để lưu trữ kết quả
            const resultMap = new Map();

            // Duyệt qua mảng transformedData
            transformedData?.forEach(item => {
                if (industryQuery.includes(item.industry)) {
                    // Nếu đã tồn tại key trong Map, thêm giá trị mới vào mảng data
                    if (resultMap.has(item.industry)) {
                        const foundItem = resultMap.get(item.industry);
                        foundItem.data.push(+item.value.toFixed(2));
                    } else {
                        // Nếu chưa tồn tại key trong Map, thêm key và giá trị vào Map
                        resultMap.set(item.industry, {
                            name: item.industry,
                            color: item.color,
                            data: [+item.value.toFixed(2)]
                        });
                    }
                }
            });

            // console.log(resultMap)
            // Chuyển đổi dữ liệu từ Map về mảng kết quả
            const result = [...resultMap.values()];
            // Kết quả đã được tối ưu hóa và lưu trong mảng result


            setData(result)
        }
    }, [dataChartAverageDebitIndustry, industryQuery])
    useEffect(() => {
        setColorText(color);
    }, [color])

    const options = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {

            type: "spline",
            backgroundColor: "transparent",
        },
        title: {
            text: null,
        },
        legend: {
            enabled: false,
            itemStyle: {
                color: localStorage.getItem('color'),
                fontWeight: 'bold'
            }
        },
        xAxis: [{
            categories: timeLine,
            title: {
                text: null,
                style: {
                    color: localStorage.getItem('color'),
                },
            },
            labels: {
                style: {
                    color: localStorage.getItem('color'),
                    fontSize: '9px',
                },
            },
        }],
        yAxis: {
            title: {
                text: null
            },
            labels: {
                style: {
                    color: localStorage.getItem('color'),
                },
            },
            gridLineWidth: 0.5,
        },
        plotOptions: {
            series: {
                marker: {
                    radius: 2, // Giá trị bán kính marker
                },
            }
        },
        series: data
    }
    const handleSelectedNamesChange = (selectedNames) => {
        setIndustryQuery(selectedNames)
    };
    return (
        <div>
            <div className='xs:flex xxs:block items-center justify-between border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold md:text-base sm:text-[15px] xs:text-[12.5px] xxs:text-[14px]'>Lãi suất vay nợ bình quân của các ngành (%)</span>
                <div className='flex items-center justify-center'>
                    <FilterIndusty onSelectedNamesChange={handleSelectedNamesChange} />
                </div>
            </div>
            {dataChartAverageDebitIndustry?.length > 0 ? (
                <div className="h-[450px] mt-3">
                    <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                </div>
            ) : (
                <div className="h-[450px] flex items-center justify-center"><Loading /></div>
            )}
            <div>
                <TableAverageDebtRatio />
            </div>
        </div>
    )
}

export default ChartAverageDebtRatio