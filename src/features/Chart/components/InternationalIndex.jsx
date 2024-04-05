import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from "react-icons/bs";
import { fetchDataInternationalIndex } from "../thunk";
import Marquee from "react-fast-marquee";

const InternationalIndex = () => {
  const dispatch = useDispatch();
  const dataInternationalIndex = useSelector(
    (state) => state.chart.dataInternationalIndex
  );

  useEffect(() => {
    dispatch(fetchDataInternationalIndex);
  }, []);
  return (
    <div className="dark:bg-black bg-white pt-1">
      <Marquee gradient={false} pauseOnHover={true} speed={40}>
        <div className="flex">
          {dataInternationalIndex.data?.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center ml-4 bg-gradient-to-b from-[#217EBE] to-black"
                style={{ padding: "5px" }}
              >
                <span className="mx-2 text-sm font-semibold text-white">
                  {item.ticker}: {item.diemso.toFixed(2)}
                </span>
                <p>
                  {item.percent_d < 0 ? (
                    <BsFillArrowDownCircleFill
                      style={{ fontSize: "13px", color: "red" }}
                    />
                  ) : (
                    <BsFillArrowUpCircleFill
                      style={{ fontSize: "13px", color: "#00BF63" }}
                    />
                  )}
                  <span className="ml-1.5 text-xs text-white">
                    {(
                      item.diemso -
                      item.diemso / (1 + item.percent_d / 100)
                    ).toFixed(2)}{" "}
                    ({item.percent_d.toFixed(2)}%)
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </Marquee>
    </div>
  );
};

export default InternationalIndex;
