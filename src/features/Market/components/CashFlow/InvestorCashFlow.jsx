import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataCashFlowInvestor } from '../../thunk'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
const buttonStyle = {
    backgroundColor: 'transparent',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    padding: '0.375rem 0.5rem'
}

const activeButtonStyle = {
    backgroundColor: '#275F88',
    color: '#fff',
}

const InvestorCashFlow = () => {
    const { dataCashFlowInvestor } = useSelector(state => state.market)
    const [data, setData] = useState()
    const [timeLine, setTimeLine] = useState()
    console.log(dataCashFlowInvestor)
    const dispatch = useDispatch()
    const [activeButton, setActiveButton] = useState('all');
    const [activeButton2, setActiveButton2] = useState(1)
    const [activeButton3, setActiveButton3] = useState(5)
    const [canTouch, setCanTouch] = useState(false)
    const [param , setParam] = useState('buyVal')
    const [queryApi, setQueryApi] = useState({
        type: 2,
        investorType: 0,
        exchange: 'all'
    })

    useEffect(() => {

        dispatch(fetchDataCashFlowInvestor(queryApi.type, queryApi.investorType, queryApi.exchange))
    }, [queryApi, dispatch])

    useEffect(()=> {
        if(dataCashFlowInvestor?.length >0 ){
            const uniqueDates = [...new Set(dataCashFlowInvestor.map(item => item.date))];
            setTimeLine(uniqueDates)
            const result = {};
            if(dataCashFlowInvestor?.length >0 )
            // Lặp qua mảng dữ liệu
            dataCashFlowInvestor.forEach(item => {
              const industry = item.industry;
              const value = (item[param]/1000000000);
          
              // Nếu industry chưa tồn tại trong đối tượng kết quả, khởi tạo mảng rỗng
              if (!result[industry]) {
                result[industry] = [];
              }
          
              // Thêm giá trị vào mảng tương ứng với industry
              result[industry].push(value);
            });
          
            // Tạo mảng các đối tượng với key "name" và value là mảng giá trị của ngành
            const output = Object.entries(result).map(([name, value]) => ({ name, value }));
            setData(output)
        }
    },[param
    ])
    
    console.log('data',data)
    console.log('time',timeLine)
// hàm xử lý nút

const handleClick = (button) => { setActiveButton(button) }
const handleClick2 = (button) => { setActiveButton2(button) }
const handleClick3 = (button) => {
    setActiveButton3(button)
    if (button === 8) {
        setActiveButton2(4)
    }
}
// config chart

const options = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent'
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: timeLine,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Giá trị',
      },
      stackLabels: {
        enabled: true,
      },
    },
    legend: {
      enabled: true,
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: data,
  };
    return (
        <>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black'>Dòng tiền nhà đầu tư theo các nhóm ngành</span>
                <select className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0`}
                    onChange={(event) => {
                        setQueryApi({ ...queryApi, type: event.target.value })
                    }}>
                    <option value='2'>1 tháng</option>
                    <option value='4'>3 tháng</option>
                    <option value='5'>1 năm</option>
                </select>
            </div>
            <div className="pt-3 mb-3 dark:text-white text-black">
                <span>
                    <button
                        onClick={() => {
                            handleClick('all')
                            setQueryApi({ ...queryApi, exchange: "all" })
                        }}
                        className={activeButton === 'all'
                            ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>Toàn thị trường
                    </button>
                </span>
                <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10">
                    <button
                        onClick={() => {
                            handleClick('HSX')
                            setQueryApi({ ...queryApi, exchange: "hsx" })
                        }}
                        className={activeButton === 'HSX'
                            ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>HSX
                    </button>
                </span>
                <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10">
                    <button
                        onClick={() => {
                            handleClick('HNX')
                            setQueryApi({ ...queryApi, exchange: "hnx" })
                        }}
                        className={activeButton === 'HNX'
                            ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>HNX
                    </button>
                </span>
                <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10">
                    <button
                        onClick={() => {
                            handleClick('UPCOM')
                            setQueryApi({ ...queryApi, exchange: "upcom" })
                        }}
                        className={activeButton === 'UPCOM'
                            ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>UPCOM
                    </button>
                </span>
            </div>
            <div className='flex'>
                <div>
                    <div className=" dark:bg-[#2D303A] bg-gray-400 flex justify-around items-center rounded-full mb-2 mr-4">
                        <button

                            disabled={canTouch}
                            style={(activeButton2 === 1 ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle)}
                            onClick={() => {
                                handleClick2(1)
                            }}
                            className='rounded-tl-xl rounded-bl-xl md:text-[0.8rem] lg:text-[0.9rem]'>Giá trị mua</button>
                        <button
                            disabled={canTouch}

                            style={activeButton2 === 2 ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                handleClick2(2)
                            }}
                            className='md:text-[0.8rem] lg:text-[0.9rem]'>Giá trị bán</button>
                        <button
                            disabled={canTouch}

                            style={activeButton2 === 3 ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                handleClick2(3)
                            }}
                            className='md:text-[0.8rem] lg:text-[0.9rem]'>Giá trị ròng</button>
                        <button
                            style={activeButton2 === 4 ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                handleClick2(4)
                            }}
                            className='rounded-tr-xl rounded-br-xl md:text-[0.8rem] lg:text-[0.9rem]'>Tổng giá trị GD</button>
                    </div>
                </div>
                <div>
                    <div className="dark:bg-[#2D303A] bg-gray-400 flex justify-around items-center rounded-full mb-2">
                        <button
                            style={activeButton3 === 5 ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                handleClick3(5)
                                setCanTouch(false)
                                setQueryApi({ ...queryApi, investorType: 0 })
                            }}
                            className='rounded-tl-xl rounded-bl-xl md:text-[0.8rem] lg:text-[0.9rem]'>Khối ngoại</button>
                        <button
                            style={activeButton3 === 6 ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                handleClick3(6)
                                setCanTouch(false)
                                setQueryApi({ ...queryApi, investorType: 1 })
                            }}
                            className='md:text-[0.8rem] lg:text-[0.9rem]'>Tự doanh</button>
                        <button
                            style={activeButton3 === 7 ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                handleClick3(7)
                                setQueryApi({ ...queryApi, investorType: 2 })
                                setCanTouch(false)
                            }}
                            className='md:text-[0.8rem] lg:text-[0.9rem]'>Cá nhân & TC</button>
                        <button
                            style={activeButton3 === 8 ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                handleClick3(8)
                                setCanTouch(true)
                            }}
                            className='rounded-tr-xl rounded-br-xl md:text-[0.8rem] lg:text-[0.9rem]'>Toàn thị trường</button>
                    </div>
                </div>
            </div>
            <div>
                <div>
                <HighchartsReact highcharts={Highcharts} options={options} />
                </div>
                <div></div>
            </div>
        </>
    )
}

export default InvestorCashFlow