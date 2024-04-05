import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataFilterCanslim } from "../../thunk";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { getColorForHeaderRating } from "../../../Chart/utils/utils";

const FilterCanslim = ({ queryApi }) => {
  const { stock } = queryApi;
  const dispatch = useDispatch();
  const { dataFilterCanslim } = useSelector((state) => state.stock);
  useEffect(() => {
    dispatch(fetchDataFilterCanslim(stock));
  }, [stock]);

  return (
    <>
      <div className="flex w-full border-solid dark:border-white border-black border-b-2 border-t-0 border-x-0 pb-1">
        <div className="dark:text-white text-black flex items-center justify-center">
          <div className="icon_left cursor-pointer mr-2">
            <BiSolidLeftArrow className="text-base" />
          </div>
          <div className="text_mid text-base">Chuẩn lọc CANSLIM</div>
          <div className="icon_right cursor-pointer ml-2">
            <BiSolidRightArrow className="text-base" />
          </div>
        </div>
      </div>
      <div className="dark:text-white text-black">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-2 text-left">Tiêu chí</th>
              <th className="p-2">Đánh giá</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(dataFilterCanslim) &&
              dataFilterCanslim?.map((item, index) => (
                <tr key={index}>
                  <td
                    className={`${
                      item.name === "Tổng hợp chỉ tiêu" ? "font-bold" : ""
                    } p-2`}
                  >
                    {item.name}
                  </td>
                  <td
                    className={`${
                      item.name === "Tổng hợp chỉ tiêu"
                        ? "font-bold border border-solid dark:border-white border-black border-t-2 border-b-0 border-x-0"
                        : ""
                    } p-2 text-center ${getColorForHeaderRating(item.value)}`}
                  >
                    {item.name === "Tổng hợp chỉ tiêu"
                      ? item.value + "/5"
                      : item.value}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FilterCanslim;
