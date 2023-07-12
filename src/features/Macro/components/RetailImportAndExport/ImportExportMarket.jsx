import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Loading from '../../../Chart/utils/Loading';

const ImportExportMarket = () => {
    const { dataTableImportExportMarket } = useSelector(state => state.marco)
    const [dates, setDates] = useState()
    const [dataTb, setDataTb] = useState()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (dataTableImportExportMarket?.length > 0) {
            setLoading(false);
            const modifiedArray = dataTableImportExportMarket.map(item => {
                const month = moment(item.date, 'YYYY/MM/DD').month() + 1 // Lấy tên tháng từ ngày
                const year = moment(item.date, 'YYYY/MM/DD').year(); // Lấy năm từ ngày

                return { ...item, date: `Tháng ${month}/${year}` };
            });
            const uniqueDates = [...new Set(modifiedArray?.map(item => item.date))];
            setDates(uniqueDates);

            const newData = {};
            modifiedArray.forEach(item => {
                if (!newData[item.name]) {
                    newData[item.name] = [];
                }
                newData[item.name].push({ xk: item.xk, nk: item.nk, net_xnk: item.net_xnk });
            });
            setDataTb(Object.entries(newData).map(([name, values]) => ({ name, values })));
        }
    }, [dataTableImportExportMarket])

    return (
        <section className="bg-blueGray-50 pt-1.5">
            <div className="w-full">
                <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
                    <div className="block xxs:w-[295px] xs:w-[350px] sm:w-[400px] md:w-[670px] lg:w-[897px] xl:w-full scrollbar-thin scrollbar-thumb-[#436FB5] dark:scrollbar-track-[#151924] scrollbar-track-transparent overflow-x-scroll bg-transparent h-[367px]">
                        <table className="items-center w-full border-collapse bg-transparent">
                            <thead className="bg-[#1E5D8B] z-10" style={{ position: 'sticky', top: 0 }}>
                                <tr>
                                    <th className="sticky left-0 bg-[#1E5D8B] text-center align-middle px-3 py-[19px] whitespace-nowrap font-semibold text-xs text-white">
                                        Thị trường
                                    </th>
                                    <th className="text-center align-middle px-3 py-[19px] text-xs font-semibold text-white">
                                        Chỉ tiêu
                                    </th>
                                    {Array.isArray(dates) && dates?.map((item, index) => (
                                        <th key={index} className={`text-center align-middle px-3 py-[19px] text-xs font-semibold text-white ${index === 0 ? 'whitespace-nowrap' : ''}`}>
                                            {item}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {!loading ? (Array.isArray(dataTb) && dataTb.map((item, index) => (
                                    <Fragment key={index}>
                                        <tr className="dark:hover:bg-gray-800 hover:bg-gray-300 duration-500">
                                            <th className={`sticky left-0 dark:bg-[#151924] bg-gray-100 text-left align-middle whitespace-nowrap px-1 py-[14px] text-sm dark:text-white text-black`} rowSpan="3" style={{ border: '1px solid white' }}>
                                                {item.name}
                                            </th>
                                            <td className='text-sm text-center align-middle whitespace-nowrap px-1 py-[14px] font-semibold dark:text-white text-black' style={{ border: '1px solid white' }}>
                                                Xuất khẩu
                                            </td>

                                            {item.values.map((value, index) => (
                                                <td key={index} className={`text-sm text-center align-middle whitespace-nowrap px-1 py-[14px] font-semibold dark:text-white text-black`} style={{ border: '1px solid white' }}>
                                                    {value.xk.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr className="dark:hover:bg-gray-800 hover:bg-gray-300 duration-500">
                                            <td className='text-sm text-center align-middle whitespace-nowrap px-1 py-[14px] font-semibold dark:text-white text-black' style={{ border: '1px solid white' }}>
                                                Nhập khẩu
                                            </td>
                                            {item.values.map((value, index) => (
                                                <td key={index} className={`text-sm text-center align-middle whitespace-nowrap px-1 py-[14px] font-semibold dark:text-white text-black`} style={{ border: '1px solid white' }}>
                                                    {value.nk.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr className="dark:hover:bg-gray-800 hover:bg-gray-300 duration-500">
                                            <td className='text-sm text-center align-middle whitespace-nowrap px-1 py-[14px] font-semibold dark:text-white text-black' style={{ border: '1px solid white' }}>
                                                XNK Ròng
                                            </td>
                                            {item.values.map((value, index) => (
                                                <td key={index} className={`text-sm text-center align-middle whitespace-nowrap px-1 py-[14px] font-semibold dark:text-white text-black`} style={{ border: '1px solid white' }}>
                                                    {value.net_xnk.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                                                </td>
                                            ))}
                                        </tr>
                                    </Fragment>
                                ))) : (<tr><td><div><Loading /></div></td></tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default ImportExportMarket