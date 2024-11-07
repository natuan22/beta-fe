import React, { useEffect, useState } from "react";
import Loading from "../../../Chart/utils/Loading";
import CentralRate from "../../components/RateAndInterestRate/CentralRate";
import ExchangeRateFluctuations from "../../components/RateAndInterestRate/ExchangeRateFluctuations";
import InterestRateVolatility from "../../components/RateAndInterestRate/InterestRateVolatility";
import ExchangeRateIndex from "../../components/RateAndInterestRate/ExchangeRateIndex";
import InterestRate from "../../components/RateAndInterestRate/InterestRate";

const RateAndInterestRate = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 500);
  }, []);

  return (
    <div className="container mx-auto mt-2 md:w-[90%] lg:w-[90%] xl:w-full">
      {isLoading ? (
        <>
          <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
            <div className="grid xl:grid-cols-2 lg:grid-cols-none gap-3">
              <div>
                <div className="border-solid border-[#25558d] border-b-2 border-t-0 border-x-0">
                  <span className="dark:text-white text-black font-semibold">
                    Tỷ giá trung tâm USD/VND
                  </span>
                </div>
                <CentralRate />
              </div>
              <div>
                <div className="border-solid border-[#25558d] border-b-2 border-t-0 border-x-0">
                  <span className="dark:text-white text-black font-semibold">
                    Bảng chỉ số tỷ giá
                  </span>
                </div>
                <ExchangeRateIndex />
              </div>
            </div>
            <div className="mt-2">
              <ExchangeRateFluctuations />
            </div>
            <div className="mt-2">
              <InterestRateVolatility />
            </div>
            <div>
              <div className="border-solid border-[#25558d] border-b-2 border-t-0 border-x-0">
                <span className="dark:text-white text-black font-semibold">
                  Lãi suất (%)
                </span>
              </div>
              <InterestRate />
            </div>
          </div>
        </>
      ) : (
        <div className="h-[300px] flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default RateAndInterestRate;
