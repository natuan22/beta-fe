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
        .then(data => {
          setData(data);
          setLoading(false);
        });
    }
    // let fetchData2 = async () => {
    //   fetch('http://192.168.15.181:3001/api/v1/stock/market-breadth')
    //     .then(j => j.json())
    //     .then(data => {
    //       setData(data);
    //       setLoading(false);
    //     });
    // }
    const interval = setInterval(() => {
      console.log('reload GeneralIndustry')
      fetchData();
    }, 5000);

    fetchData();

    return () => clearInterval(interval);
  }, [])

  return (
    <>
      <section className="bg-blueGray-50">
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded ">
            <div className="block w-full overflow-y-scroll xl:h-[663px] lg:h-[450px] md:h-[465px] sm:h-[430px] bg-[#000000]">
              <table className="items-center w-full border-collapse bg-[#000000]">
                <thead className="sticky top-0 bg-gradient-to-b from-cyan-800 to-black">
                  <tr>
                    <th className="text-center align-middle px-4 py-3 text-sm whitespace-nowrap font-semibold text-amber-500">
                      Phân ngành
                    </th>
                    <th className="text-center align-middle px-4 py-3 text-sm whitespace-nowrap font-semibold text-amber-500">
                      %D
                    </th>
                    <th className="text-center align-middle px-4 py-3 text-sm whitespace-nowrap font-semibold text-amber-500">
                      %W
                    </th>
                    <th className="text-center align-middle px-4 py-3 text-sm whitespace-nowrap font-semibold text-amber-500">
                      %M
                    </th>
                    <th className="text-center align-middle px-4 py-3 text-sm whitespace-nowrap font-semibold text-amber-500">
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
                        <tr key={index} className='hover:bg-gray-900'>
                          <th className={`${color} text-left align-middle xl:text-xs lg:text-sm px-2 py-2.5`}>
                            {item.vietnameseName}
                          </th>
                          <td className={`${color} align-middle xl:text-xs lg:text-sm whitespace-nowrap px-2 py-2.5 font-semibold`}>
                            <span className='text-left px-1.5'>
                              {getIcon(item.PerChange1D)}
                            </span>
                            <span className='text-right px-px'>
                              {item.PerChange1D.toFixed(2)}%
                            </span>
                          </td>
                          <td className={`${color2} align-middle xl:text-xs lg:text-sm whitespace-nowrap px-2 py-2 font-semibold`}>
                            <span className='text-left px-1.5'>
                              {getIcon(item.PerChange1M)}
                            </span>
                            <span className='text-right px-px'>
                              {item.PerChange1M.toFixed(2)}%
                            </span>
                          </td>
                          <td className={`${color3} align-middle xl:text-xs lg:text-sm whitespace-nowrap px-2 py-2 font-semibold`}>
                            <span className='text-left px-1.5'>
                              {getIcon(item.PerChange1Y)}
                            </span>
                            <span className='text-right px-px'>
                              {item.PerChange1Y.toFixed(2)}%
                            </span>
                          </td>
                          <td className="align-middle whitespace-nowrap xl:text-xs lg:text-sm px-2 py-2  ">
                            <div className='flex'>
                            <div style={{width:'20%', height:'10px'}} className="bg-purple-500"></div>
                            <div style={{width:'20%', height:'10px'}} className="bg-green-500"></div>
                            <div style={{width:'20%', height:'10px'}} className="bg-yellow-400"></div>
                            <div style={{width:'20%', height:'10px'}} className="bg-red-500"></div>
                            <div style={{width:'20%', height:'10px'}} className="bg-blue-400"></div>
                            </div>
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