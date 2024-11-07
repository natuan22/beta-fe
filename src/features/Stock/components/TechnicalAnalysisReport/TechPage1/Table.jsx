import React from "react";
import { getColorBaseOnValue } from "../../../../../helper/getColorBaseOnValue";
import formatNumber from "../../../../../helper/formatNumber";
import LazyLoad from "react-lazyload";

const Table = ({ data }) => {
  return (
    <div>
      <LazyLoad offset={300} debounce={200} once>
        <table className={`w-[330px] h-[120px]`}>
          <thead>
            <tr className="text-[13px] font-bold text-center ">
              <td className="bg-gradient-to-b from-[#024A9B] to-[#0570EB] text-white px-1 py-2">
                Biến động giá (%)
              </td>
              <td className="bg-gradient-to-b from-[#024A9B] to-[#0570EB] text-white px-1 py-2">
                1 Tháng
              </td>
              <td className="bg-gradient-to-b from-[#024A9B] to-[#0570EB] text-white px-1 py-2">
                3 Tháng
              </td>
              <td className="bg-gradient-to-b from-[#024A9B] to-[#0570EB] text-white px-1 py-2">
                Từ đầu năm
              </td>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).length !== 0 ? (
              data?.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="text-center text-[13px] font-semibold"
                  >
                    <td className="text-black">{item.code}</td>
                    <td className={`${getColorBaseOnValue(item.month)} `}>
                      {formatNumber(item.month)}%
                    </td>
                    <td className={`${getColorBaseOnValue(item.month_3)} `}>
                      {formatNumber(item.month_3)}%
                    </td>
                    <td className={`${getColorBaseOnValue(item.ytd)} `}>
                      {formatNumber(item.ytd)}%
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </LazyLoad>
    </div>
  );
};

export default Table;
