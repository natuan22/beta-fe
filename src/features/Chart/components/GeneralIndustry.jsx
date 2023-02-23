import { CaretDownOutlined, CaretRightOutlined, CaretUpOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../utils/Loading';

const GeneralIndustry = () => {
  const dataGeneral = useSelector(state => state.chart.dataGeneral);
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // if (dataGeneral) {
    //   setLoading(false);
    //   setData(dataGeneral)
    // }

    let fetchData = async () => {
      fetch('http://192.168.9.250:5000/tongnganh')
        .then(j => j.json())
        .then(data1 => {
          setData(data1);
          setLoading(false);
        });
    }

    const interval = setInterval(() => {
      console.log('reload')
      fetchData();
    }, 10000);

    fetchData();

    return () => clearInterval(interval);
  }, [])

  return (
    <>
      <section className="bg-blueGray-50">
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="block w-full" style={{ height: '878px' }}>
              <table className="items-center bg-transparent w-full border-collapse">
                <thead className="bg-slate-300">
                  <tr>
                    <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle py-3 text-sm whitespace-nowrap font-semibold">
                      Phân ngành
                    </th>
                    <th className="text-center px-3 bg-blueGray-50 text-blueGray-500 align-middle py-3 text-sm whitespace-nowrap font-semibold">
                      %D
                    </th>
                    <th className="text-center px-3 bg-blueGray-50 text-blueGray-500 align-middle py-3 text-sm whitespace-nowrap font-semibold">
                      %W
                    </th>
                    <th className="text-center px-3 bg-blueGray-50 text-blueGray-500 align-middle py-3 text-sm whitespace-nowrap font-semibold">
                      %M
                    </th>
                    <th className="text-center px-3 bg-blueGray-50 text-blueGray-500 align-middle py-3 text-sm whitespace-nowrap font-semibold">
                      Độ rộng ngành
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {!loading ? (Array.isArray(data) &&
                    data.map((item, index) => {
                      let color = getColor(item.PerChange1D)
                      let color2 = getColor(item.PerChange1M)
                      let color3 = getColor(item.PerChange1Y)

                      return (
                        <tr key={index}>
                          <th className={`${color} text-left border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs p-3`}>
                            {item.vietnameseName}
                          </th>
                          <td className={`${color} border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-1 font-semibold`}>
                            <span className='text-left px-1'>
                              {getIcon(item.PerChange1D)}
                            </span>
                            <span className='text-right'>
                              {item.PerChange1D.toFixed(2)}%
                            </span>
                          </td>
                          <td className={`${color2} border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-1 font-semibold`}>
                            <span className='text-left px-1'>
                              {getIcon(item.PerChange1M)}
                            </span>
                            <span className='text-right'>
                              {item.PerChange1M.toFixed(2)}%
                            </span>
                          </td>
                          <td className={`${color3} border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-1 font-semibold`}>
                            <span className='text-left px-1'>
                              {getIcon(item.PerChange1Y)}
                            </span>
                            <span className='text-right'>
                              {item.PerChange1Y.toFixed(2)}%
                            </span>
                          </td>
                          <td className="border-t-0 px-2 align-middle border-l-0 whitespace-nowrap border-r-0 text-xs p-1">
                            thanh độ rộng ngành
                          </td>
                        </tr>
                      )
                    })) : (<td colSpan={5}><Loading /></td>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section >
    </>
  );
};

export default GeneralIndustry;

function getColor(item) {
  let color = ''
  if (item === 0)
    color = 'text-yellow-500'
  else if (item < '0')
    color = 'text-red-500'
  else
    color = 'text-green-500'

  return color
}

function getIcon(item) {
  if (item === 0)
    return <CaretRightOutlined style={{ fontSize: '18px' }} />
  else if (item < '0')
    return <CaretDownOutlined style={{ fontSize: '18px' }} />
  else
    return <CaretUpOutlined style={{ fontSize: '18px' }} />
}
