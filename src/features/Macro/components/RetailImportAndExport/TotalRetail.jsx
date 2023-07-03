import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Loading from '../../../Chart/utils/Loading';

const TotalRetail = () => {
    const { dataTableTotalRetail } = useSelector(state => state.marco)
    const [dates, setDates] = useState()
    const [dataTb, setDataTb] = useState()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (dataTableTotalRetail?.length > 0) {
            setLoading(false);
            const modifiedArray = dataTableTotalRetail.map(item => {
                const modifiedName = item.name.replace('Bán lẻ: ', '').replace(' (Tỷ VNĐ)', '');
                const month = moment(item.date, 'YYYY/MM/DD').month() + 1 // Lấy tên tháng từ ngày
                const year = moment(item.date, 'YYYY/MM/DD').year(); // Lấy năm từ ngày

                return { ...item, name: modifiedName, date: `Tháng ${month}/${year}` };
            });

            const uniqueDates = [...new Set(modifiedArray?.map(item => item.date))];
            uniqueDates.unshift('Đơn vị tính');
            setDates(uniqueDates);
            const newData = {};
            modifiedArray.forEach(item => {
                if (!newData[item.name]) {
                    newData[item.name] = [];
                    newData[item.name].push('Tỷ VNĐ');
                }
                newData[item.name].push(item.value);
            });
            setDataTb(Object.entries(newData).map(([name, values]) => ({ name, values })));
        }
    }, [dataTableTotalRetail])
    return (
        <section className="bg-blueGray-50 pt-1.5">
            <div className="w-full">
                <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
                    <div className="block xxs:w-[295px] xs:w-[350px] sm:w-[400px] md:w-[670px] lg:w-[897px] xl:w-full scrollbar-thin scrollbar-thumb-[#436FB5] dark:scrollbar-track-[#151924] scrollbar-track-transparent overflow-x-scroll bg-transparent h-[273px]">
                        <table className="items-center w-full border-collapse bg-transparent">
                            <thead className="sticky top-0 bg-[#1E5D8B] z-10">
                                <tr>
                                    <th className="sticky left-0 bg-[#1E5D8B] text-center align-middle px-3 py-[19px] whitespace-nowrap font-semibold text-xs text-white">
                                        Chỉ tiêu
                                    </th>
                                    {Array.isArray(dates) && dates?.map((item, index) => (
                                        <th key={item} className={`text-center align-middle px-3 py-[19px] text-xs font-semibold text-white ${index === 0 ? 'whitespace-nowrap' : ''}`}>
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
        </section >
    )
}

export default TotalRetail