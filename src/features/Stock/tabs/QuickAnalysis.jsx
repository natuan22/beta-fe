import React, { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import Loading from "../../Chart/utils/Loading";
import useQueryApi from "../components/Overview/utils/custom/useQueryApi/useQueryApi";
import BasicPrice from "../components/QuickAnalysis/BasicPrice";
import BusinessPosition from "../components/QuickAnalysis/BusinessPosition";
import BussinessAnalysis from "../components/QuickAnalysis/BussinessAnalysis";
import FinancialHealthAnalysis from "../components/QuickAnalysis/FinancialHealthAnalysis";
import IndividualInvestorBenefits from "../components/QuickAnalysis/IndividualInvestorBenefits";
import SpiderWebChart from "../components/QuickAnalysis/SpiderWebChart";
import TechnicalAnalysis from "../components/QuickAnalysis/TechnicalAnalysis";
import {
  fetchDataBasicPrice,
  fetchDataBusinessPosition,
  fetchDataBussinessAnalysis,
  fetchDataFinancialHealthAnalysis,
  fetchDataIndividualInvestorBenefits,
  fetchDataTechnicalAnalysis,
} from "../thunk";
import { useDispatch } from "react-redux";
import RatingHeader from "../components/QuickAnalysis/RatingHeader";
import FilterCanslim from "../components/QuickAnalysis/FilterCanslim";
import HistoricalPEPB from "../components/QuickAnalysis/HistoricalPEPB";

const QuickAnalysis = ({ codeUrl }) => {
  const dispatch = useDispatch();
  const { queryApi } = useQueryApi(codeUrl);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 700);
  }, []);

  useEffect(() => {
    dispatch(fetchDataFinancialHealthAnalysis(queryApi.stock));
    dispatch(fetchDataBussinessAnalysis(queryApi.stock));
    dispatch(fetchDataBusinessPosition(queryApi.stock));
    dispatch(fetchDataBasicPrice(queryApi.stock));
    dispatch(fetchDataTechnicalAnalysis(queryApi.stock));
    dispatch(fetchDataIndividualInvestorBenefits(queryApi.stock));
  }, [dispatch, queryApi.stock]);

  return (
    <div className="container mx-auto">
      {isLoading ? (
        <>
          <div>
            {/* <div className="xl:flex lg:block py-2">
              <div className="xl:w-[40%] lg:w-full">
                <SpiderWebChart queryApi={queryApi} />
              </div>

              <div className="xl:w-[60%] lg:w-full">
                <div className="grid md:grid-cols-2 sm:grid-cols-none gap-10">
                  <div>
                    <RatingHeader queryApi={queryApi} />
                  </div>

                  <div>
                    <FilterCanslim queryApi={queryApi} />
                  </div>
                </div>
              </div>
            </div> */}
            <div className="xl:flex lg:block py-2 items-center justify-center gap-10">
              <div>
                <LazyLoad offset={300} debounce={200} once>
                  <SpiderWebChart queryApi={queryApi} />
                </LazyLoad>
              </div>

              <div className="xl:w-[576px] lg:w-full">
                <LazyLoad offset={300} debounce={200} once>
                  <FilterCanslim queryApi={queryApi} />
                </LazyLoad>
              </div>
            </div>

            <div className="grid xl:grid-cols-3 lg:grid-cols-none gap-5">
              <div>
                <LazyLoad offset={300} debounce={200} once>
                  <FinancialHealthAnalysis queryApi={queryApi} />
                </LazyLoad>
              </div>
              <div>
                <LazyLoad offset={300} debounce={200} once>
                  <BussinessAnalysis queryApi={queryApi} />
                </LazyLoad>
              </div>
              <div>
                <LazyLoad offset={300} debounce={200} once>
                  <BusinessPosition queryApi={queryApi} />
                </LazyLoad>
              </div>
              <div>
                <LazyLoad offset={300} debounce={200} once>
                  <BasicPrice queryApi={queryApi} />
                </LazyLoad>
              </div>
              <div>
                <LazyLoad offset={300} debounce={200} once>
                  <TechnicalAnalysis queryApi={queryApi} />
                </LazyLoad>
              </div>
              <div>
                <LazyLoad offset={300} debounce={200} once>
                  <IndividualInvestorBenefits queryApi={queryApi} />
                </LazyLoad>
              </div>
            </div>
            <div>
              <LazyLoad offset={300} debounce={200} once>
                <HistoricalPEPB stock={queryApi.stock} />
              </LazyLoad>
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

export default QuickAnalysis;
