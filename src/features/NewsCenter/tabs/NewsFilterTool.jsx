import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNewsTool } from '../thunk'
import Loading from '../../Chart/utils/Loading'
import { Checkbox, Button } from 'antd'
import { BsFillArrowRightCircleFill } from "react-icons/bs";
const NewsFilterTool = () => {
    const dispatch = useDispatch()
    const { newsTool } = useSelector(state => state.newsCenter)
    const [selectedExchange, setSelectedExchange] = useState(null)
    const [selectedLV2, setSelectedLV2] = useState([])
    const [selectedLV4, setSelectedLV4] = useState([])

    useEffect(() => {
        dispatch(fetchNewsTool())
    }, [])

    const handleFilterExchange = (e) => {
        const exchangeName = e.target.value
        setSelectedExchange(exchangeName)
        setSelectedLV2([])
        setSelectedLV4([])
    }

    const handleFilterLV2 = (lv2Name) => {
        if (selectedLV2.includes(lv2Name)) {
            setSelectedLV2(selectedLV2.filter(name => name !== lv2Name))
        } else {
            setSelectedLV2([...selectedLV2, lv2Name])
        }
    }

    const handleFilterLV4 = (lv4Name) => {
        if (selectedLV4.includes(lv4Name)) {
            setSelectedLV4(selectedLV4.filter(name => name !== lv4Name))
        } else {
            setSelectedLV4([...selectedLV4, lv4Name])
        }
    }

    return (
        <div className='h-screen'>
            {newsTool?.length ?
                <div className='container h-full mt-5 bg-[#151924] '>
                    <div className='h-[300px] w-full p-2 ' style={{ borderBottom: "solid 1px grey", display: 'grid', gridTemplateColumns: '0.5fr 1.5fr 1.5fr 1fr 2fr' }}>
                        <div className='exchange__tabs flex flex-col justify-center bg-[#04013d] p-2 ' style={{ borderRight: 'solid 1px gray', borderTop: 'solid 3px #147df5' }}>
                            {newsTool.map((exchange, index) => (
                                <div key={index}>
                                    <Checkbox
                                        checked={selectedExchange === exchange.name}
                                        onChange={handleFilterExchange}
                                        value={exchange.name}
                                        className='text-white text-sm mt-3'
                                    >
                                        {exchange.name}
                                    </Checkbox>
                                </div>
                            ))}
                        </div>
                        <div className='industryLv2__tabs overflow-auto ml-1 p-2 ' style={{ borderRight: 'solid 1px gray', borderTop: 'solid 3px #147df5' }}>
                            {selectedExchange && newsTool.find(exchange => exchange.name === selectedExchange).LV2.map((lv2, index) => (
                                <div key={index}>
                                    <Checkbox
                                        checked={selectedLV2.includes(lv2.name)}
                                        onChange={() => handleFilterLV2(lv2.name)}
                                        className='text-white text-sm mt-3'
                                    >
                                        {lv2.name}
                                    </Checkbox>
                                </div>
                            ))
                            }
                        </div>
                        <div className='industryLv4__tabs overflow-auto p-2 ml-2' style={{ borderRight: 'solid 1px gray', borderTop: 'solid 3px #147df5' }}>
                            {selectedLV2.length > 0 &&
                                newsTool
                                    .find(exchange => exchange.name === selectedExchange)
                                    .LV2.filter(lv2 => selectedLV2.includes(lv2.name))
                                    .map(lv2 => lv2.LV4)
                                    .flat()
                                    .map((lv4, index) => (
                                        <div key={index}>
                                            <Checkbox
                                                checked={selectedLV4.includes(lv4.name)}
                                                onChange={() => handleFilterLV4(lv4.name)}
                                                className='text-white text-sm mt-3'
                                            >
                                                {lv4.name}
                                            </Checkbox>
                                        </div>
                                    ))
                            }
                        </div>
                        <div className='code__tabs overflow-auto p-2 ml-2' style={{ borderRight: 'solid 1px gray', borderTop: 'solid 3px #147df5' }}>
                            {selectedLV4.length > 0 &&
                                newsTool
                                    .find(exchange => exchange.name === selectedExchange)
                                    .LV2.filter(lv2 => selectedLV2.includes(lv2.name))
                                    .flatMap(lv2 => lv2.LV4)
                                    .filter(lv4 => selectedLV4.includes(lv4.name))
                                    .map(lv4 => (
                                        <div key={lv4.name} className='flex flex-col '>
                                            {lv4.code.map((code, index) => (
                                                <div className='flex flex-col justify-center items-center'>
                                                    <Button className='mt-2 w-[50%] text-sm border-0 p-2 rounded-lg font-bold flex justify-between items-center' key={index}>
                                                        {code}
                                                        <BsFillArrowRightCircleFill className='text-base' />
                                                    </Button>

                                                </div>
                                            ))}
                                        </div>
                                    ))
                            }
                        </div>
                        <div className='watchList__tabs'></div>
                    </div>
                </div> :
                <div className='h-[50%] flex flex-col justify-center'><Loading /></div>
            }
        </div>
    )
}

export default NewsFilterTool
