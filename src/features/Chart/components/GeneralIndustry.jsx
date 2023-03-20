import {
  CaretDownOutlined,
  CaretRightOutlined,
  CaretUpOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../utils/Loading";
import socket from "../utils/socket";

const GeneralIndustry = () => {
  const dataGeneral = useSelector((state) => state.chart.dataGeneral);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
 

  // const [isHovering, setIsHovering] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const handleMouseOver = (index) => {
    // setIsHovering(true);
    setHoveredIndex(index);
  };
  const handleMouseOut = () => {
    // setIsHovering(false);
    setHoveredIndex(-1);
  };

  useEffect(() => {
    if (dataGeneral?.data) {
      setLoading(false);
      setData(dataGeneral.data);
    }
  }, [dataGeneral]);

  useEffect(() => {
    socket.on("listen-phan-nganh", (newData) => {
      
    });
  },[]);
  return (
    <>
      <section className="bg-blueGray-50">
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded ">
            <div className="block w-full scrollbar-thin scrollbar-thumb-[#217EBE] scrollbar-track-[#151924] overflow-y-scroll xs:h-[438px] xxs:h-[430px] sm:h-[430px] md:h-[465px] lg:h-[450px] xl:h-[663px] 3xl:h-[735px] bg-[#000000]">
              <table className="items-center w-full border-collapse bg-[#000000]">
                <thead className="sticky top-0 bg-gradient-to-b from-[#217EBE] to-black z-30">
                  <tr>
                    <th className="text-center align-middle px-4 py-3 text-sm whitespace-nowrap font-semibold text-white">
                      Phân ngành
                    </th>
                    <th className="text-center align-middle px-4 py-3 text-sm whitespace-nowrap font-semibold text-white">
                      %D
                    </th>
                    <th className="text-center align-middle px-4 py-3 text-sm whitespace-nowrap font-semibold text-white">
                      %W
                    </th>
                    <th className="text-center align-middle px-4 py-3 text-sm whitespace-nowrap font-semibold text-white">
                      %M
                    </th>
                    <th className="text-center align-middle px-4 py-3 text-sm whitespace-nowrap font-semibold text-white">
                      Độ rộng ngành
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {!loading ? (
                    Array.isArray(data) &&
                    data.map((item, index) => {
                      let color = getColor(item.day_change_percent);
                      let color2 = getColor(item.week_change_percent);
                      let color3 = getColor(item.month_change_percent);

                      if (item.industry === "#N/A") {
                        return null;
                      }
                      let numOfHigh = item.high;
                      let numOfLow = item.low;
                      let numOfIncrease = item.increase;
                      let numOfDecrease = item.decrease;
                      let numOfEqual = item.equal;
                      let total = numOfHigh + numOfLow + numOfIncrease + numOfDecrease + numOfEqual;
                      return (
                        <tr key={index} className="hover:bg-gray-900">
                          <th className={`${color} text-left align-middle lg:text-sm xl:text-xs px-2 py-2.5`}>
                            {item.industry}
                          </th>
                          <td className={`${color} align-middle lg:text-sm xl:text-xs whitespace-nowrap px-2 py-2.5 font-semibold`}>
                            <span className="text-left px-1.5">
                              {getIcon(item.day_change_percent)}
                            </span>
                            <span className="text-right px-px">
                              {item.day_change_percent.toFixed(2)}%
                            </span>
                          </td>
                          <td className={`${color2} align-middle lg:text-sm xl:text-xs whitespace-nowrap px-2 py-2 font-semibold`}>
                            <span className="text-left px-1.5">
                              {getIcon(item.week_change_percent)}
                            </span>
                            <span className="text-right px-px">
                              {item.week_change_percent.toFixed(2)}%
                            </span>
                          </td>
                          <td className={`${color3} align-middle lg:text-sm xl:text-xs whitespace-nowrap px-2 py-2 font-semibold`}>
                            <span className="text-left px-1.5">
                              {getIcon(item.month_change_percent)}
                            </span>
                            <span className="text-right px-px">
                              {item.month_change_percent.toFixed(2)}%
                            </span>
                          </td>

                          <td className="align-middle whitespace-nowrap lg:text-sm xl:text-xs px-2 py-2  ">
                            <div
                              className="flex relative"
                              onMouseOver={() => handleMouseOver(index)}
                              onMouseOut={handleMouseOut}
                            >
                              {hoveredIndex === index && (
                                <div className="bg-white text-black text-xs font-medium p-1 rounded-md absolute top-0 translate-x-[-60%] translate-y-[-110%] z-40 ease-in-out duration-500">
                                  <span>Trần:{item.high}</span>
                                  <span className="ml-2">
                                    Tăng: {item.increase}
                                  </span>
                                  <span className="ml-2">
                                    Không đổi: {item.equal}
                                  </span>
                                  <span className="ml-2">
                                    Giảm: {item.decrease}
                                  </span>
                                  <span className="ml-2">Sàn: {item.low}</span>
                                </div>
                              )}
                              <div
                                className="bg-purple-500 h-2.5"
                                style={{
                                  width: `${(item.high / total) * 100}%`,
                                }}
                              ></div>
                              <div
                                className="h-2.5 bg-green-500"
                                style={{
                                  width: `${(item.increase / total) * 100}%`,
                                }}
                              ></div>
                              <div
                                className="bg-yellow-400 h-2.5"
                                style={{
                                  width: `${(item.equal / total) * 100}%`,
                                }}
                              ></div>
                              <div
                                className="bg-red-500 "
                                style={{
                                  width: `${(item.decrease / total) * 100}%`,
                                }}
                              ></div>
                              <div
                                className="bg-blue-400 h-2.5"
                                style={{
                                  width: `${(item.low / total) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5}>
                        <Loading />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GeneralIndustry;

function getColor(item) {
  let color = "";
  if (item === 0) color = "text-yellow-500";
  else if (item < "0") color = "text-red-500";
  else color = "text-green-500";

  return color;
}

function getIcon(item) {
  if (item === 0) return <CaretRightOutlined style={{ fontSize: "18px" }} />;
  else if (item < "0")
    return <CaretDownOutlined style={{ fontSize: "18px" }} />;
  else return <CaretUpOutlined style={{ fontSize: "18px" }} />;
}
