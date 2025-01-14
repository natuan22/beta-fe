import React, { useEffect, useState } from "react";
import GDPByIndustry from "../../components/GDP/GDPByIndustry";
import GDPByPrice from "../../components/GDP/GDPByPrice";
import GDPContributionRatio from "../../components/GDP/GDPContributionRatio";
import GDPGrowth from "../../components/GDP/GDPGrowth";
import Loading from "../../../Chart/utils/Loading";
import PerGDPGrowth from "../../components/GDP/PerGDPGrowth";

const GDP = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 500);
  }, []);

  return (
    <div className="container mx-auto md:w-[90%] lg:w-[90%] xl:w-full">
      {isLoading ? (
        <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
          <div className="grid xl:grid-cols-2 lg:grid-cols-none gap-3">
            <div>
              <div className="border-solid border-[#25558d] border-b-2 border-t-0 border-x-0">
                <span className="dark:text-white text-black font-semibold md:text-base sm:text-[15px] xs:text-[15px] xxs:text-[13px]">
                  Giá trị GDP theo các nhóm ngành chính (Tỷ đồng)
                </span>
              </div>
              <GDPByIndustry />
            </div>
            <div>
              <div className="border-solid border-[#25558d] border-b-2 border-t-0 border-x-0">
                <span className="dark:text-white text-black font-semibold md:text-base sm:text-[15px] xs:text-[15px] xxs:text-[13px]">
                  GDP theo giá cố định và giá hiện hành (Tỷ đồng)
                </span>
              </div>
              <GDPByPrice />
            </div>
          </div>

          <div className="grid xl:grid-cols-2 lg:grid-cols-none gap-3 mt-1">
            <div>
              <div>
                <div className="border-solid border-[#25558d] border-b-2 border-t-0 border-x-0 mt-[3px]">
                  <span className="dark:text-white text-black font-semibold md:text-base sm:text-[15px] xs:text-[13px] xxs:text-[11px]">
                    Tỷ trọng đóng góp GDP theo các nhóm ngành chính (%)
                  </span>
                </div>
                <GDPContributionRatio />
              </div>
              <div className="mt-1">
                <div className="border-solid border-[#25558d] border-b-2 border-t-0 border-x-0">
                  <span className="dark:text-white text-black font-semibold md:text-base sm:text-[15px] xs:text-[15px] xxs:text-[14px]">
                    Tăng trưởng GDP theo từng ngành nghề (%)
                  </span>
                </div>
                <PerGDPGrowth />
              </div>
            </div>
            <div>
              <GDPGrowth />
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[300px] flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default GDP;
