import React, { useEffect } from "react";
import News from "../Chart/components/News";
import InternationalIndex from "../Chart/components/InternationalIndex";
import { Outlet } from "react-router-dom";
import MarketTab from "./utils/MarketTab";
import Banner from "../Chart/components/Banner";
import { useDispatch } from "react-redux";
import { fetchDataAreaChart1, fetchDataAreaChart2, fetchDataEvents, fetchDataGeneralIndustry, fetchDataInternationalIndex, fetchDataLineChart, fetchDataMacroNews, fetchDataNews, fetchDataTableDetail } from "../Chart/thunk";

const Market = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchDataNews);
    dispatch(fetchDataInternationalIndex);
    dispatch(fetchDataLineChart('0'))
    dispatch(fetchDataGeneralIndustry('all'))
    dispatch(fetchDataTableDetail)
    dispatch(fetchDataNews)
    dispatch(fetchDataMacroNews)
    dispatch(fetchDataEvents)

    dispatch(fetchDataAreaChart1);
    dispatch(fetchDataAreaChart2);
  }, [dispatch]);

  return (<>
    <div>
      <InternationalIndex />
      <News />
    </div>
    <Banner />
    <div className="container mx-auto">
      <div>
        <div className="px-11">
          <MarketTab />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  </>
  );
};

export default Market;
