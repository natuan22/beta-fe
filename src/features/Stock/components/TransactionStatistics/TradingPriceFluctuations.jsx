import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getColor } from "../../../Chart/utils/utils";
import { fetchDataTradingPriceFluctuations } from "../../thunk";
import formatNumberCurrency from "../../../../helper/formatNumberCurrency";

const TradingPriceFluctuations = ({ stock }) => {
  const dispatch = useDispatch();
  const { dataTradingPriceFluctuations } = useSelector((state) => state.stock);

  useEffect(() => {
    dispatch(fetchDataTradingPriceFluctuations(stock));
  }, [dispatch, stock]);

  return (
    <div className="mt-4">
      <div>
        <div className="flex items-center justify-between border-solid border-[#D9D9D9] border-b-2 border-t-0 border-x-0 border-opacity-50">
          <span className="dark:text-white text-black xs:text-base xxs:text-xs">
            +/- Qua 1 tuần
          </span>
          <span
            className={`${getColor(
              dataTradingPriceFluctuations.p_week,
            )} xs:text-base xxs:text-xs`}
          >
            {dataTradingPriceFluctuations.p_week &&
              formatNumberCurrency(dataTradingPriceFluctuations.p_week)}
            %
          </span>
        </div>
        <div className="flex items-center justify-between border-solid border-[#D9D9D9] border-b-2 border-t-0 border-x-0 border-opacity-50 mt-4">
          <div className="dark:text-white text-black xs:text-base xxs:text-xs">
            +/- Qua 1 tháng
          </div>
          <span
            className={`${getColor(
              dataTradingPriceFluctuations.p_month,
            )} xs:text-base xxs:text-xs`}
          >
            {dataTradingPriceFluctuations.p_month &&
              formatNumberCurrency(dataTradingPriceFluctuations.p_month)}
            %
          </span>
        </div>
        <div className="flex items-center justify-between border-solid border-[#D9D9D9] border-b-2 border-t-0 border-x-0 border-opacity-50 mt-4">
          <div className="dark:text-white text-black xs:text-base xxs:text-xs">
            +/- Qua 1 quý
          </div>
          <span
            className={`${getColor(
              dataTradingPriceFluctuations.p_quarter,
            )} xs:text-base xxs:text-xs`}
          >
            {dataTradingPriceFluctuations.p_quarter &&
              formatNumberCurrency(dataTradingPriceFluctuations.p_quarter)}
            %
          </span>
        </div>
        <div className="flex items-center justify-between border-solid border-[#D9D9D9] border-b-2 border-t-0 border-x-0 border-opacity-50 mt-4">
          <div className="dark:text-white text-black xs:text-base xxs:text-xs">
            +/- Qua 1 năm
          </div>
          <span
            className={`${getColor(
              dataTradingPriceFluctuations.p_year,
            )} xs:text-base xxs:text-xs`}
          >
            {dataTradingPriceFluctuations.p_year &&
              formatNumberCurrency(dataTradingPriceFluctuations.p_year)}
            %
          </span>
        </div>
        <div className="flex items-center justify-between border-solid border-[#D9D9D9] border-b-2 border-t-0 border-x-0 border-opacity-50 mt-4">
          <div className="dark:text-white text-black xs:text-base xxs:text-xs">
            Cao nhất 52 tuần
          </div>
          <span className="dark:text-white text-black xs:text-base xxs:text-xs">
            {dataTradingPriceFluctuations.max_price &&
              formatNumberCurrency(
                dataTradingPriceFluctuations.max_price * 1000,
              )}
          </span>
        </div>
        <div className="flex items-center justify-between border-solid border-[#D9D9D9] border-b-2 border-t-0 border-x-0 border-opacity-50 mt-4">
          <div className="dark:text-white text-black xs:text-base xxs:text-xs">
            Thấp nhất 52 tuần
          </div>
          <span className="dark:text-white text-black xs:text-base xxs:text-xs">
            {dataTradingPriceFluctuations.min_price &&
              formatNumberCurrency(
                dataTradingPriceFluctuations.min_price * 1000,
              )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TradingPriceFluctuations;
