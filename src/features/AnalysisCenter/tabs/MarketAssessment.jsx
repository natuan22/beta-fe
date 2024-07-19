import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchDataAnalysisCenter } from "../thunk";
import BuildAnalysisCenter from "../utils/BuildAnalysisCenter";

const MarketAssessment = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const trimmedPathname = location.pathname.replace("/trung-tam-phan-tich/", "");
    const pathMap = {
      "nhan-dinh-thi-truong": "1",
      "phan-tich-doanh-nghiep": "2",
      "bao-cao-nganh": "3",
      "phan-tich-ky-thuat": "4",
      "bao-cao-vi-mo": "5",
      "bao-cao-chien-luoc": "6",
      "bao-cao-trai-phieu-va-tien-te": "7",
    };

    const analysisType = pathMap[trimmedPathname] || "0";
    dispatch(fetchDataAnalysisCenter(analysisType));
  }, [location, dispatch]);

  return (
    <div className="container mx-auto md:w-[90%] lg:w-[90%] xl:w-[90%] 2xl:w-full pt-2">
      <BuildAnalysisCenter />
    </div>
  );
};

export default MarketAssessment;
