import React, { useEffect, useState } from "react";
import Loading from "../../../Chart/utils/Loading";
import LaborForce from "../../components/Labour/LaborForce";
import UnemploymentRate from "../../components/Labour/UnemploymentRate";
import AverageSalary from "../../components/Labour/AverageSalary";
import LaborRateBySector from "../../components/Labour/LaborRateBySector";
import RateOfInformalEmployment from "../../components/Labour/RateOfInformalEmployment";
import JobFluctuations from "../../components/Labour/JobFluctuations";

const Labour = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 500);
  }, []);

  return (
    <div className="container mx-auto mt-2 md:w-[90%] lg:w-[90%] xl:w-full">
      {isLoading ? (
        <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
          <div className="xl:flex lg:block gap-3">
            <div className="xl:w-[80%] lg:w-full">
              <div className="grid xl:grid-cols-2 lg:grid-cols-none gap-3">
                <div>
                  <div>
                    <div className="border-solid border-[#25558d] border-b-2 border-t-0 border-x-0">
                      <span className="dark:text-white text-black font-semibold">
                        Lực lượng lao động ( triệu người)
                      </span>
                    </div>
                    <LaborForce />
                  </div>
                  <div>
                    <div className="border-solid border-[#25558d] border-b-2 border-t-0 border-x-0">
                      <span className="dark:text-white text-black font-semibold xs:text-base xxs:text-[15px]">
                        Tỷ lệ thất nghiệp tại các nhóm lao động (%){" "}
                      </span>
                    </div>
                    <UnemploymentRate />
                  </div>
                </div>

                <div>
                  <div className="grid xl:grid-cols-2 lg:grid-cols-none gap-3">
                    <div>
                      <div className="border-solid border-[#25558d] border-b-2 border-t-0 border-x-0">
                        <span className="dark:text-white text-black font-semibold">
                          Tỷ lệ lao động theo lĩnh vực (%)
                        </span>
                      </div>
                      <LaborRateBySector />
                    </div>
                    <div>
                      <div className="border-solid border-[#25558d] border-b-2 border-t-0 border-x-0">
                        <span className="dark:text-white text-black font-semibold">
                          Tỷ lệ lao động phi chính thức (%)
                        </span>
                      </div>
                      <RateOfInformalEmployment />
                    </div>
                  </div>
                  <div>
                    <div>
                      <div className="border-solid border-[#25558d] border-b-2 border-t-0 border-x-0">
                        <span className="dark:text-white text-black font-semibold md:text-base sm:text-[13px] xs:text-[12px] xxs:text-[10px]">
                          Mức lương bình quân trên thị trường lao động (triệu
                          VND/tháng)
                        </span>
                      </div>
                      <AverageSalary />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:w-[20%] lg:w-full">
              <div>
                <div className="border-solid border-[#25558d] border-b-2 border-t-0 border-x-0">
                  <span className="dark:text-white text-black font-semibold">
                    Biến động việc làm so với cùng kỳ
                  </span>
                </div>
                <JobFluctuations />
              </div>
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

export default Labour;
