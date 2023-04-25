import React, { useState } from 'react'
import Loading from '../../../Chart/utils/Loading';

const IndustryCashFlow = () => {
    const [activeButton, setActiveButton] = useState('all');

    const handleClick = (button) => {
        setActiveButton(button);
    }

    return (
        <>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='text-white'>Dòng tiền theo ngành</span>
                <select className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0`}
                    onChange={(event) => {
                    }}>
                    <option value='0'>Phiên gần nhất</option>
                    <option value='1'>...</option>
                    <option value='2'>...</option>
                    <option value='3'>...</option>
                </select>
            </div>
            <div className="pt-3 mb-3 text-white">
                <span>
                    <button
                        onClick={() => {
                            handleClick('all')
                        }}
                        className={activeButton === 'all'
                            ? 'border-none bg-transparent relative text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>Toàn thị trường
                    </button>
                </span>
                <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10">
                    <button
                        onClick={() => {
                            handleClick('HSX')
                        }}
                        className={activeButton === 'HSX'
                            ? 'border-none bg-transparent relative text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>HSX
                    </button>
                </span>
                <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10">
                    <button
                        onClick={() => {
                            handleClick('HNX')
                        }}
                        className={activeButton === 'HNX'
                            ? 'border-none bg-transparent relative text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>HNX
                    </button>
                </span>
                <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10">
                    <button
                        onClick={() => {
                            handleClick('UPCOM')
                        }}
                        className={activeButton === 'UPCOM'
                            ? 'border-none bg-transparent relative text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>UPCOM
                    </button>
                </span>
            </div>
            <section className="bg-blueGray-50 pt-1.5">
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
                        <div className="block w-full scrollbar-thin scrollbar-thumb-[#217EBE] scrollbar-track-[#151924] overflow-y-scroll bg-transparent h-[450px]">
                            <table className="items-center w-full border-collapse bg-transparent">
                                <thead className="sticky top-0 bg-[#1E5D8B] z-10">
                                    <tr>
                                        <th className="uppercase text-center align-middle px-3 py-3 text-xs whitespace-nowrap font-semibold text-white">
                                            Phân ngành
                                        </th>
                                        <th className="uppercase text-center align-middle px-3 py-3 text-xs whitespace-nowrap font-semibold text-white">
                                            Tự doanh
                                        </th>
                                        <th className="uppercase text-center align-middle px-3 py-3 text-xs whitespace-nowrap font-semibold text-white">
                                            Khối ngoại
                                        </th>
                                        <th className="uppercase text-center align-middle px-3 py-3 text-xs font-semibold text-white">
                                            Cá nhân & TC trong nước
                                        </th>
                                        <th className="uppercase text-center align-middle px-3 py-3 text-xs whitespace-nowrap font-semibold text-white">
                                            Sức mạnh dòng tiền
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {/* <tr key={index} className="hover:bg-gray-800">
                                        <th className={`text-left align-middle px-2 py-2.5`}>
                                            {item.industry}
                                        </th>
                                        <td className={`align-middle whitespace-nowrap px-2 py-2.5 font-semibold`}>
                                            <span className="text-left px-1.5">
                                                {getIcon(item.day_change_percent)}
                                            </span>
                                            <span className="text-right px-px">
                                                {item.day_change_percent.toFixed(2)}%
                                            </span>
                                        </td>
                                    </tr> */}

                                    <tr><td colSpan={5}><div className="mt-16"><Loading /></div></td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            <hr />
            <div className='py-1'>
                <div className='flex'>
                    <div className='w-1/2'>
                        <div className='text-[10px] py-2'>TOP NGÀNH KHỐI NGOẠI MUA: </div>
                        <div className='text-[10px] py-2'>TOP NGÀNH TỰ DOANH MUA: </div>
                        <div className='text-[10px] py-2'>TOP NGÀNH CÁ NHÂN & TCTN MUA: </div>
                    </div>
                    <div className='w-1/2'>
                        <div className='grid grid-cols-2'>
                            <div className='text-[10px] py-2'>GT MUA RÒNG:</div>
                            <div className='text-[10px] py-2'>GT BÁN RÒNG:</div>

                            <div className='text-[10px] py-2'>GT MUA RÒNG:</div>
                            <div className='text-[10px] py-2'>GT BÁN RÒNG:</div>

                            <div className='text-[10px] py-2'>GT MUA RÒNG:</div>
                            <div className='text-[10px] py-2'>GT BÁN RÒNG:</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default IndustryCashFlow