import React from "react";
import { useSelector } from "react-redux";
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from "react-icons/bs";
import { Card } from "antd";
import Marquee from "react-fast-marquee";

const Carousel = () => {
  const dataCarousel = useSelector((state) => state.chart.dataCarousel);

  return (
    <div className="bg-gray-800 p-2">
      <Marquee speed={70} pauseOnHover="true"  gradientColor="[0,0,0]">
        <div className="flex">
          {dataCarousel.data?.map((item, index) => {
            return (
              <div key={index} className="flex flex-col items-center ml-4">
                <span className="ml-4 text-sm font-semibold text-white">
                  {item.ticker}: {item.diemso}
                </span>
                <p>
                  {item.percent_d < 0 ? (
                    <BsFillArrowDownCircleFill
                      style={{ fontSize: "13px", color: "red" }}
                    />
                  ) : (
                    <BsFillArrowUpCircleFill
                      style={{ fontSize: "13px", color: "lightgreen" }}
                    />
                  )}
                  {item.percent_d < 0 ? (
                    <span className="ml-3 text-xs text-red-500">
                      {item.percent_d}%
                    </span>
                  ) : (
                    <span className="ml-3 text-xs text-green-500">
                      {item.percent_d}%
                    </span>
                  )}
                </p>
              </div>
            );
          })}
        </div>
      </Marquee>
      <Marquee speed={60} pauseOnHover="true" gradientColor="[0,0,0]">
        <div className="blog-news flex  " style={{ height: "150px" }}>
          <Card
            bordered={false}
            style={{
              width: 470,
              height: 90,
              backgroundColor: "#1F2937",
            }}
          >
            <div className="flex items-center">
              <img src="./image/betaBlog.webp" alt="img blog news" class width={175} height={95}
              />
              <div className="ml-2">
                <span className="text-xs font-semibold text-white items-center justify-center w-12">
                  Dự thảo sửa đổi NĐ65:Cho phép thanh toán trái phiếu bằng sản
                  phẩm bất động sản,...
                </span>
                <br />
                <span className="text-xs text-white items-center justify-center w-12">
                  Trong bối cảnh hàng loạt khó khăn xuất hiện trên thị trường
                  trái phiếu doanh nghiệp,..
                </span>
              </div>
            </div>
          </Card>
          <Card
            bordered={false}
            style={{
              width: 470,
              height: 90,
              backgroundColor: "#1F2937",
            }}
          >
            <div className="flex items-center">
              <img
                src="./image/betaBlog.webp"
                alt="img blog news"
                width={175}
                height={90}
              />
              <div className="ml-2">
                <span className="text-xs font-semibold text-white items-center justify-center w-12">
                  Dự thảo sửa đổi NĐ65:Cho phép thanh toán trái phiếu bằng sản
                  phẩm bất động sản,...
                </span>
                <br />
                <span className="text-xs text-white items-center justify-center w-12">
                  Trong bối cảnh hàng loạt khó khăn xuất hiện trên thị trường
                  trái phiếu doanh nghiệp,..
                </span>
              </div>
            </div>
          </Card>
          <Card
            bordered={false}
            style={{
              width: 470,
              height: 90,
              backgroundColor: "#1F2937",
            }}
          >
            <div className="flex items-center">
              <img
                src="./image/betaBlog.webp"
                alt="img blog news"
                width={175}
                height={90}
              />
              <div className="ml-2">
                <span className="text-xs font-semibold text-white items-center justify-center w-12">
                  Dự thảo sửa đổi NĐ65:Cho phép thanh toán trái phiếu bằng sản
                  phẩm bất động sản,...
                </span>
                <br />
                <span className="text-xs text-white items-center justify-center w-12">
                  Trong bối cảnh hàng loạt khó khăn xuất hiện trên thị trường
                  trái phiếu doanh nghiệp,..
                </span>
              </div>
            </div>
          </Card>
        </div>
      </Marquee>
    </div>
  );
};

export default Carousel;
