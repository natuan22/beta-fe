import React from "react";
import News from "../Chart/components/News";
import InternationalIndex from "../Chart/components/InternationalIndex";
import { Outlet } from "react-router-dom";
import MarketTab from "./utils/MarketTab";

const Market = () => {
  return (
    <div className="container mx-auto">
      <div>
        <InternationalIndex />
        <News />
      </div>
      <div className="px-2">
        <div>
          <MarketTab />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Market;