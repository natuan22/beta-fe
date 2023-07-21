import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../../Chart/utils/Loading';
import HighchartsReact from 'highcharts-react-official'
import Highcharts from "highcharts";
import { Button, Popover } from 'antd';
import { fetchDataAccumulatedAndTotalInvestment } from '../../thunk';
import './utils/style/buttonExchange.css'

const AccumulatedAndTotalInvestment = () => {
    const dispatch = useDispatch();
    const { dataAccumulatedAndTotalInvestment } = useSelector(state => state.macro)
    const [timeLine, setTimeLine] = useState()
    const [data, setData] = useState()
    const [order, setOrder] = useState('0')
    const [button, setButton] = useState()
    const [open, setOpen] = useState(false);
    const [selectedNames, setSelectedNames] = useState(["Xây dựng", "Công nghiệp chế biến, chế tạo", "Giáo dục và đào tạo"]);

    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        setColorText(color);
    }, [color])

    useEffect(() => {
        dispatch(fetchDataAccumulatedAndTotalInvestment(order));
    }, [dispatch, order]);

    useEffect(() => {
        if (dataAccumulatedAndTotalInvestment?.length > 0) {
            let modifiedArray;
            let uniqueDates;
            let sortIndustry;

            if (order === '0') {
                modifiedArray = dataAccumulatedAndTotalInvestment.map(item => {
                    const quarter = moment(item.date, 'YYYY/MM/DD').quarter(); // Lấy quý từ ngày
                    const year = moment(item.date, 'YYYY/MM/DD').year(); // Lấy năm từ ngày

                    return { ...item, date: `Quý ${quarter}/${year}` };
                });
            } else {
                modifiedArray = dataAccumulatedAndTotalInvestment.map(item => {
                    const month = moment(item.date, 'YYYY/MM/DD').month() + 1 // Lấy tên tháng từ ngày
                    const year = moment(item.date, 'YYYY/MM/DD').year(); // Lấy năm từ ngày
                    return { ...item, date: `Tháng ${month}/${year}` };
                });
            }
            uniqueDates = [...new Set(modifiedArray?.map(item => item.date))];
            sortIndustry = [...new Set(modifiedArray?.map(item => item.name))].map(name => ({ name: name, value: name }));
            setButton(sortIndustry)
            setTimeLine(uniqueDates)

            const result = [];

            modifiedArray?.forEach(item => {
                const name = item.name;
                const luy_ke = +item.luy_ke.toFixed(2);
                const luy_ke_von = +item.luy_ke_von.toFixed(2);
                const color = item.color;

                const existingObj = result.find(obj => obj.name === name);

                if (existingObj) {
                    existingObj.data.push(luy_ke);
                } else {
                    result.push({
                        type: 'column',
                        name: name,
                        data: [luy_ke],
                        yAxis: 0,
                        color: color
                    });
                }
                const existingLineObj = result.find(obj => obj.type === 'spline' && obj.name === name);

                if (existingLineObj) {
                    existingLineObj.data.push(luy_ke_von);
                } else {
                    result.push({
                        type: 'spline',
                        name: name,
                        data: [luy_ke_von],
                        yAxis: 1,
                        color: color
                    });
                }
            })
            const dataFiltered = result.filter(item => selectedNames.includes(item.name))
            setData(dataFiltered)
        }
    }, [dataAccumulatedAndTotalInvestment, order, selectedNames])

    const handleClick = (name) => {
        if (selectedNames.includes(name)) {
            setSelectedNames(selectedNames.filter((selectedName) => selectedName !== name));
        } else {
            setSelectedNames([...selectedNames, name]);
        }
    };

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

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
                }
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
            },

        ],
        plotOptions: {
            series: {
                marker: {
                    radius: 2, // Giá trị bán kính marker
                },
            },
        },
        legend: {
            enabled: false,
            align: 'center',
            verticalAlign: 'top',
            itemStyle: {
                fontSize: '10px',
                color: localStorage.getItem('color')
            }
        },

        series: data,
    };

    return (
        <>
            <div className='md:flex sm:block items-center justify-between border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold md:text-base sm:text-sm xs:text-xs xxs:text-[11px]'>Lũy kế số dự án cấp mới và tổng vốn đầu tư từ năm 1988</span>
                <div className="flex items-center justify-center">
                    <select className={`bg-[#1B496D] py-[6px] px-[6px] text-[1rem] text-white border-0 rounded-[6px]`}
                        onChange={(event) => {
                            setOrder(event.target.value)
                        }}>
                        <option value='0'>Quý</option>
                        <option value='2'>Tháng</option>
                    </select>
                    <Popover
                        content={
                            <div className='h-[200px] overflow-auto'>
                                {button?.map((item, index) => (
                                    <div key={index}>
                                        <label className="material-checkbox py-2 text-black">
                                            <input type="checkbox" name="exchange" value={item.name} id={item.name} checked={selectedNames.includes(item.name)} onChange={() => handleClick(item.name)} />
                                            <span className="checkmark"></span>
                                            <span className='text-sm'>{item.name}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        }
                        placement="bottom"
                        trigger="click"
                        open={open}
                        onOpenChange={handleOpenChange}
                    >
                        <Button className='bg-[#1B496D] text-white border-none ml-2'>Ngành
                            <span role="img" aria-label="filter" className="anticon anticon-filter"><svg viewBox="64 64 896 896" focusable="false" data-icon="filter" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M349 838c0 17.7 14.2 32 31.8 32h262.4c17.6 0 31.8-14.3 31.8-32V642H349v196zm531.1-684H143.9c-24.5 0-39.8 26.7-27.5 48l221.3 376h348.8l221.3-376c12.1-21.3-3.2-48-27.7-48z"></path></svg></span>
                        </Button>
                    </Popover>
                </div>
            </div>

            {dataAccumulatedAndTotalInvestment?.length > 0 ? (
                <>
                    <div className='h-[335px] '>
                        <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                    </div>
                </>
            ) : (
                <div className="h-[335px] flex items-center justify-center"><Loading /></div>
            )}
        </>
    )
}

export default AccumulatedAndTotalInvestment