import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataAverageTradingVolume } from "../../thunk";
import formatNumberCurrency from "../../../../helper/formatNumberCurrency";

const AverageTradingVolume = ({ stock }) => {
  const dispatch = useDispatch();
  const { dataAverageTradingVolume } = useSelector((state) => state.stock);

  useEffect(() => {
    dispatch(fetchDataAverageTradingVolume(stock));
  }, [dispatch, stock]);

  return (
    <div className="mt-4">
      <div>
        <div className="flex items-center justify-between border-solid border-[#D9D9D9] border-b-2 border-t-0 border-x-0 border-opacity-50">
          <span className="dark:text-white text-black xs:text-base xxs:text-xs">
            Khối lượng giao dịch/Ngày (1 tuần)
          </span>
          <span className="dark:text-white text-black xs:text-base xxs:text-xs">
            {dataAverageTradingVolume.week &&
              formatNumberCurrency(dataAverageTradingVolume.week)}
          </span>
        </div>
        <div className="flex items-center justify-between border-solid border-[#D9D9D9] border-b-2 border-t-0 border-x-0 border-opacity-50 mt-4">
          <div className="dark:text-white text-black xs:text-base xxs:text-xs">
            Khối lượng giao dịch/Ngày (1 tháng)
          </div>
          <span className="dark:text-white text-black xs:text-base xxs:text-xs">
            {dataAverageTradingVolume.month &&
              formatNumberCurrency(dataAverageTradingVolume.month)}
          </span>
        </div>
        <div className="flex items-center justify-between border-solid border-[#D9D9D9] border-b-2 border-t-0 border-x-0 border-opacity-50 mt-4">
          <div className="dark:text-white text-black xs:text-base xxs:text-xs">
            Khối lượng giao dịch/Ngày (1 quý)
          </div>
          <span className="dark:text-white text-black xs:text-base xxs:text-xs">
            {dataAverageTradingVolume.quarter &&
              formatNumberCurrency(dataAverageTradingVolume.quarter)}
          </span>
        </div>
        <div className="flex items-center justify-between border-solid border-[#D9D9D9] border-b-2 border-t-0 border-x-0 border-opacity-50 mt-4">
          <div className="dark:text-white text-black xs:text-base xxs:text-xs">
            Khối lượng giao dịch/Ngày (1 năm)
          </div>
          <span className="dark:text-white text-black xs:text-base xxs:text-xs">
            {dataAverageTradingVolume.year &&
              formatNumberCurrency(dataAverageTradingVolume.year)}
          </span>
        </div>
        <div className="flex items-center justify-between border-solid border-[#D9D9D9] border-b-2 border-t-0 border-x-0 border-opacity-50 mt-4">
          <div className="dark:text-white text-black xs:text-base xxs:text-xs">
            Nhiều nhất 52 tuần
          </div>
          <span className="dark:text-white text-black xs:text-base xxs:text-xs">
            {dataAverageTradingVolume.max &&
              formatNumberCurrency(dataAverageTradingVolume.max)}
          </span>
        </div>
        <div className="flex items-center justify-between border-solid border-[#D9D9D9] border-b-2 border-t-0 border-x-0 border-opacity-50 mt-4">
          <div className="dark:text-white text-black xs:text-base xxs:text-xs">
            Ít nhất 52 tuần
          </div>
          <span className="dark:text-white text-black xs:text-base xxs:text-xs">
            {dataAverageTradingVolume.min &&
              formatNumberCurrency(dataAverageTradingVolume.min)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AverageTradingVolume;
