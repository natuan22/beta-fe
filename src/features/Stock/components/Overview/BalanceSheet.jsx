import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../Chart/utils/Loading';
import { fetchDataBalanceSheet } from '../../thunk';

const BalanceSheet = ({ queryApi }) => {
  const dispatch = useDispatch();
  const { dataBalanceSheet } = useSelector(state => state.stock)
  const [dates, setDates] = useState()
  const [dataTb, setDataTb] = useState()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchDataBalanceSheet(queryApi.stock, queryApi.order, queryApi.type));
  }, [dispatch, queryApi]);

  useEffect(() => {
    if (dataBalanceSheet?.length > 0) {
      setLoading(false);
      let modifiedArray;

      if (queryApi.order === 0) {
        modifiedArray = dataBalanceSheet.map(item => {
          const year = item.date.slice(0, 4);
          const quarter = item.date.slice(4);

          return { ...item, date: `Quý ${quarter}/${year}` };
        });
      } else {
        modifiedArray = dataBalanceSheet.map(item => {
          const year = item.date.slice(0, 4);

          return { ...item, date: `Năm ${year}` };
        });
      }

      const dates = [...new Set(modifiedArray?.map(item => item.date))];
      setDates(dates);
      const newData = {};
      modifiedArray.forEach(item => {
        if (!newData[item.name]) {
          newData[item.name] = [];
        }
        newData[item.name].push(item.value / 1000000000);
      });
      setDataTb(Object.entries(newData).map(([name, values]) => ({ name, values })));
    }
  }, [dataBalanceSheet, queryApi])

  return (
    <div>
      <section className="pt-4">
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
            <div className="block bg-transparent">
              <table className="items-center w-full border-collapse bg-transparent">
                <thead className="bg-[#0055B6]">
                  <tr>
                    <th className="bg-[#C3FFB4] text-center uppercase align-middle px-[27px] py-[19px] whitespace-nowrap font-extrabold text-black">
                      Cân đối kế toán
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
                      <th className={`text-left align-middle whitespace-nowrap px-1 py-[14px] text-sm dark:text-white text-black`}>
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
    </div>
  )
}

export default BalanceSheet