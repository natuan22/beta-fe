import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataStatisticsByMonth } from "../../thunk";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import Loading from "../../../Chart/utils/Loading";
import formatNumberCurrency from "../../../../helper/formatNumberCurrency";

const getFormattedDate = (dateString) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // Lấy tháng (từ 0 đến 11) và cộng thêm 1 để chuyển thành tháng số từ 1 đến 12
  const year = date.getFullYear();
  return `Tháng ${month} năm ${year}`;
};

const StatisticsByMonth = ({ stock }) => {
  const dispatch = useDispatch();
  const { dataStatisticsByMonth } = useSelector((state) => state.stock);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0); // Tháng hiện tại đang hiển thị
  const [currentDate, setCurrentDate] = useState(""); // Ngày hiện tại đang hiển thị

  // console.log(dataStatisticsByMonth);

  useEffect(() => {
    dispatch(fetchDataStatisticsByMonth(stock));
  }, [dispatch, stock]);

  useEffect(() => {
    if (dataStatisticsByMonth.length > 0) {
      setCurrentDate(
        getFormattedDate(dataStatisticsByMonth[currentMonthIndex].date)
      );
    }
  }, [dataStatisticsByMonth, currentMonthIndex]);

  const handleNextMonth = () => {
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex(currentMonthIndex - 1);
    }
  };

  const handlePreMonth = () => {
    if (currentMonthIndex < dataStatisticsByMonth.length - 1) {
      setCurrentMonthIndex(currentMonthIndex + 1);
    }
  };

  // Lấy thông tin tháng hiện tại từ mảng dữ liệu
  const currentMonthData = dataStatisticsByMonth[currentMonthIndex];

  return (
    <div className="flex justify-center">
      {dataStatisticsByMonth?.length > 0 ? (
        <div className="mt-4 xl:w-full lg:w-[411px] md:w-full sm:w-full xs:w-full xxs:w-full">
          <div className="bg-[#1D5F8D] w-full h-[44px] flex justify-evenly items-center">
            <button
              className={` ${
                currentMonthIndex === dataStatisticsByMonth.length - 1
                  ? "cursor-not-allowed opacity-70"
                  : "cursor-pointer"
              } bg-transparent border-0 text-xl text-[#C3FFB4] `}
            >
              <BiSolidLeftArrow onClick={handlePreMonth} />
            </button>
            <span className="date text-white"> {currentDate}</span>
            <button
              className={` ${
                currentMonthIndex === 0
                  ? "cursor-not-allowed opacity-70"
                  : "cursor-pointer"
              } bg-transparent border-0 text-xl text-[#C3FFB4] `}
            >
              <BiSolidRightArrow onClick={handleNextMonth} />
            </button>
          </div>
          <div className="dark:text-white text-black xl:text-base lg:text-sm md:text-base xs:text-base xxs:text-sm">
            <div className="total flex justify-between mt-4">
              <span>Tổng số phiên</span>
              <span>{currentMonthData.total}</span>
            </div>
            <div className="omVol flex justify-between mt-4">
              <span>Tổng KL khớp lệnh</span>
              <span>{formatNumberCurrency(currentMonthData.omVol)}</span>
            </div>
            <div className="omVal flex justify-between mt-4">
              <span>Tổng GT khớp lệnh</span>
              <span>{formatNumberCurrency(currentMonthData.omVal)}</span>
            </div>
            <div className="ptVol flex justify-between mt-4">
              <span>Tổng KL thỏa thuận</span>
              <span>{formatNumberCurrency(currentMonthData.ptVol)}</span>
            </div>
            <div className="flex ptVal justify-between mt-4">
              <span>Tổng GT thỏa thuận</span>
              <span>{formatNumberCurrency(currentMonthData.ptVal)}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[244px] flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default StatisticsByMonth;
