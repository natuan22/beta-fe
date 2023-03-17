import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Banner from "./components/Banner";
import BarChartLeft from "./components/BarChartLeft";
import BarChartRight from "./components/BarChartRight";
import InternationalIndex from "./components/InternationalIndex";
import GeneralIndustry from "./components/GeneralIndustry";
import Events from "./components/Events";
import Top10Sell from "./components/Top10Sell";
import Top10Buy from "./components/Top10Buy";
import TreemapChart from "./components/TreemapChart";
import LineChart from "./components/LineChart";
import chartStyle from "./utils/Chart.module.css";
import TableDetail from "./components/TableDetail";
import GoodsDetail from "./components/GoodsDetail";
import Top10Incr from "./components/Top10Incr";
import Top10Decr from "./components/Top10Decr";
import TreeMapChart2 from "./components/TreeMapChart2";
import RateDetail from "./components/RateDetail";
import AreaChart from "./components/AreaChart";
import TableMarketVolatility from "./components/TableMarketVolatility";
import Footer from "../../components/Footer";
import StackingAreas from "./components/StackingAreas";
import NetVolumeTrade from "./components/NetVolumeTrade";
import TableMarketLiquidity from "./components/TableMarketLiquidity";
import {
  fetchDataInternationalIndex,
  fetchDataTableDetail,
  fetchDataBarChartRight,
  fetchDataBarChartLeft,
  fetchDataEvents,
  fetchDataTopNetForeignChange,
  fetchDataGoodsDetail,
  fetchDataRateDetail,
  fetchDataGeneralIndustry,
  fetchDataROC5Phien,
  fetchDataTreeMapSell,
  fetchDataTreeMapBuy,
  fetchDataAreaChart1,
  fetchDataAreaChart2,
  fetchDataWidthMarket,
  fetchDataTableMarketVolatility,
  fetchDataTableMarketLiquidity,
  fetchDataNetVolume,
  fetchDataNews,
} from "./thunk";
import News from "./components/News";

const Home = () => {
  const dispatch = useDispatch();
  const buttons = [
    {
      label: 'Tăng mạnh nhất',
      value: '0',
      color: 'text-green-500',
      hover: 'bg-green-500'
    }, {
      label: 'Giảm mạnh nhất',
      value: '1',
      color: 'text-red-500',
      hover: 'bg-red-500'
    }, {
      label: 'Đóng góp cao nhất',
      value: '2',
      color: 'text-green-500',
      hover: 'bg-green-500'
    }, {
      label: 'Đóng góp thấp nhất',
      value: '3',
      color: 'text-red-500',
      hover: 'bg-red-500'
    }]

  useEffect(() => {
    dispatch(fetchDataEvents)
    dispatch(fetchDataNews)
    dispatch(fetchDataRateDetail)
    dispatch(fetchDataTopNetForeignChange("HSX"))
    dispatch(fetchDataROC5Phien("hose"))
    dispatch(fetchDataTableMarketVolatility)
    dispatch(fetchDataTableMarketLiquidity('0'))
    dispatch(fetchDataGoodsDetail)
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDataInternationalIndex);
    dispatch(fetchDataTableDetail);
    dispatch(fetchDataBarChartRight);
    dispatch(fetchDataBarChartLeft("VNINDEX"));
    dispatch(fetchDataGeneralIndustry)
    dispatch(fetchDataTreeMapSell("HSX"))
    dispatch(fetchDataTreeMapBuy("HSX"))
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDataAreaChart1)
    dispatch(fetchDataAreaChart2)
    dispatch(fetchDataWidthMarket('VNINDEX'))
    dispatch(fetchDataNetVolume("vnindex"))
  }, [dispatch])

  return (
    <>
      <div className="mx-auto bg-black">
        <div className="flex">
          <div className="w-[5%]">
            <Banner />
          </div>

          <div className='w-[95%] bg-black'>
            <div className="px-1.5">
              <InternationalIndex />
              <News />
            </div>
            <div>
              <div className="lg:block xl:flex ">
                <div className="xl:w-[60%]">
                  <div className="grid xs:grid-cols-none sm:grid-cols-none md:grid-cols-none lg:grid-cols-[2fr_2fr] xl:grid-cols-[2fr_2fr]">
                    <div className="mx-1 my-1 px-1.5 py-1.5 bg-[#151924]">
                      <TableDetail />
                    </div>

                    <div className="mx-1 my-1 px-1.5 py-1.5 bg-[#151924] xs:min-h-[352px] xxs:min-h-[332px] sm:min-h-[312px] md:min-h-[336px] lg:min-h-[350px]">
                      <LineChart />
                    </div>
                    <div className="mx-1 my-1 px-1.5 py-1.5 bg-[#151924]">
                      <div className="text-center bg-[#020203]">
                        <span className="font-semibold uppercase text-white">
                          Nhóm cổ phiếu dẫn dắt thị trường
                        </span>
                        <select className={`${chartStyle.selectStyle} text-base border-none bg-[#020203] text-[#0097B2]`}
                          onChange={(event) => {
                            dispatch(dispatch(fetchDataBarChartLeft(event.target.value)));
                          }}>
                          <option value="VNINDEX">VNINDEX</option>
                          <option value="HNX">HNX</option>
                          <option value="VN30">VN30</option>
                        </select>
                        <BarChartLeft />
                      </div>
                    </div>

                    <div className="text-center mx-1 my-1 px-1.5 py-1.5 bg-[#151924]">
                      <div className="bg-[#020203]">
                        <span className="font-semibold uppercase text-white">
                          Top nước ngoài mua bán ròng
                        </span>
                        <BarChartRight />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-[80%] xl:w-[40%] lg:translate-x-[14%] xl:translate-x-0 ">
                  <div className="mx-2 mt-1 px-1.5 py-1.5 bg-[#151924] xs:h-[438px] xxs:h-[430px] sm:h-[430px] md:h-[465px] lg:h-[450px] xl:h-[664px] 3xl:h-[734px]">
                    <GeneralIndustry />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="xl:flex lg:block">
                <div className="xl:w-[60%]">
                  <div className="grid gap-0.5 md:grid-cols-none lg:grid-cols-[2fr_2fr] xl:grid-cols-[2fr_2fr]">
                    <div className="mx-1 my-1 px-1.5 py-1.5 bg-[#151924] h-[380px]">
                      <GoodsDetail />
                    </div>

                    <div className="mx-1 my-1 px-1.5 py-1.5 bg-[#151924] h-[380px]">
                      <RateDetail />
                    </div>
                  </div>

                  <div className="mx-1 my-1 px-1.5 py-1.5 bg-[#151924] h-[385px]">
                    <Events />
                  </div>
                </div>

                <div className="lg:w-[80%] xl:w-[40%] lg:translate-x-[14%] xl:translate-x-0">
                  <div className="mx-2 mt-1 px-1.5 py-1.5 bg-[#151924]">
                    <div className="bg-[#020203] text-center px-20 pt-[19px]">
                      <span className="font-semibold text-base uppercase text-white">
                        Top 10 cổ phiếu tăng/giảm mạnh nhất sàn
                      </span>
                      <select className={`${chartStyle.selectStyle} text-base border-none bg-[#020203] text-[#0097B2]`} onChange={(event) => {
                        dispatch(dispatch(fetchDataROC5Phien((event.target.value))))
                      }}>
                        <option value="hose">HSX</option>
                        <option value="hnx">HNX</option>
                        <option value="upcom">UPCOM</option>
                      </select>
                      <span className="font-semibold uppercase text-white">qua 05 phiên gần nhất</span>
                    </div>
                    <div className="grid grid-cols-2 bg-[#020203]">
                      <div className="text-center mx-1">
                        <Top10Decr />
                      </div>

                      <div className="text-center mx-1">
                        <Top10Incr />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="lg:block xl:flex">
                <div className="xl:w-[60%] xs:hidden sm:hidden md:hidden xl:block ">
                  <div className="mx-1 my-1 px-1.5 py-1.5 bg-[#151924] h-[742px]">
                    <div className="grid grid-cols-2 gap-0.5">
                      <div className="text-center py-2">
                        <span className="text-white uppercase text-lg">Khối ngoại mua ròng sàn
                          <select className={`${chartStyle.selectStyle} text-base bg-[#151924] border-none text-[#0097B2]`}
                            onChange={(event) => {
                              dispatch(dispatch(fetchDataTreeMapBuy(event.target.value)));
                            }}>
                            <option value="HSX">HSX</option>
                            <option value="HNX">HNX</option>
                            <option value="UPCOM">UPCOM</option>
                          </select>
                        </span>
                      </div>
                      <div className="text-center py-2">
                        <span className="text-white uppercase text-lg">Khối ngoại bán ròng sàn
                          <select className={`${chartStyle.selectStyle} text-base bg-[#151924] border-none text-[#0097B2]`}
                            onChange={(event) => {
                              dispatch(dispatch(fetchDataTreeMapSell(event.target.value)));
                            }}>
                            <option value="HSX">HSX</option>
                            <option value="HNX">HNX</option>
                            <option value="UPCOM">UPCOM</option>
                          </select>
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-center pb-[10px]">
                      <hr className="xl:w-[690px] 2xl:w-[835px] 3xl:w-[1045px] xl:translate-x-[-5px] 2xl:translate-x-[-5px] 3xl:translate-x-[-5px] bg-gradient-to-r from-cyan-500 to-blue-500 opacity-100 h-[5px] " />
                    </div>
                    <div className="grid grid-cols-2 gap-0.5">
                      <div>
                        <TreemapChart />
                      </div>

                      <div>
                        <TreeMapChart2 />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-[80%] xl:w-[40%] lg:translate-x-[14%] xl:translate-x-0">
                  <div className="mx-2 mt-1 px-1.5 py-1.5 bg-[#151924]">
                    <div className="bg-[#020203] text-center px-20 pt-[19px]">
                      <span className="font-semibold text-base uppercase text-white">
                        Top 10 khối ngoại mua/bán nhiều nhất sàn
                      </span>
                      <select className={`${chartStyle.selectStyle} text-base border-none bg-[#020203] text-[#0097B2]`} onChange={(event) => {
                        dispatch(dispatch(fetchDataTopNetForeignChange((event.target.value))))
                      }}>
                        <option value="HSX">HSX</option>
                        <option value="HNX">HNX</option>
                        <option value="UPCOM">UPCOM</option>
                      </select>
                      <span className="font-semibold uppercase text-white">qua 05 phiên gần nhất</span>
                    </div>
                    <div className="grid grid-cols-2 bg-[#020203]">
                      <div className="text-center mx-1">
                        <Top10Sell />
                      </div>

                      <div className="text-center mx-1">
                        <Top10Buy />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xl:w-[60%] xl:hidden">
                  <div className="mx-1 my-1 px-1.5 py-1.5 bg-[#151924] xs:h-[800px] xxs:h-[770px] sm:h-[770px] md:h-[740px]">
                    <div className="grid grid-cols-2 gap-0.5">
                      <div className="text-center py-2">
                        <span className="text-white uppercase text-lg">Khối ngoại mua ròng sàn
                          <select className={`${chartStyle.selectStyle} text-base bg-[#151924] border-none text-[#0097B2]`}
                            onChange={(event) => {
                              dispatch(dispatch(fetchDataTreeMapBuy(event.target.value)));
                            }}>
                            <option value="HSX">HSX</option>
                            <option value="HNX">HNX</option>
                            <option value="UPCOM">UPCOM</option>
                          </select>
                        </span>
                      </div>
                      <div className="text-center py-2">
                        <span className="text-white uppercase text-lg">Khối ngoại bán ròng sàn
                          <select className={`${chartStyle.selectStyle} text-base bg-[#151924] border-none text-[#0097B2]`}
                            onChange={(event) => {
                              dispatch(dispatch(fetchDataTreeMapSell(event.target.value)));
                            }}>
                            <option value="HSX">HSX</option>
                            <option value="HNX">HNX</option>
                            <option value="UPCOM">UPCOM</option>
                          </select>
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-center pb-[10px]">
                      <hr className="xs:w-[315px] xxs:w-[363px] sm:w-[566px] md:w-[690px] lg:w-[933px] xs:translate-x-[-5px] xxs:translate-x-[-5px] sm:translate-x-[-5px] md:translate-x-[-5px] lg:translate-x-[-5px] bg-gradient-to-r from-cyan-500 to-blue-500 opacity-100 h-[5px] " />
                    </div>
                    <div className="grid grid-cols-2 gap-0.5">
                      <div>
                        <TreemapChart />
                      </div>

                      <div>
                        <TreeMapChart2 />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="lg:block xl:flex mr-2 ml-1 my-1 px-1.5 py-1.5 bg-[#151924]">
                <div className="xl:w-[65%]">
                  <div className="text-center text-white">
                    <h3 className="p-2 uppercase">Thanh khoản thị trường</h3>
                  </div>
                  <div className="mx-2 my-1 px-1.5 py-1.5">
                    <AreaChart />
                  </div>
                </div>
                <div className="xl:w-[35%]">
                  <div className="px-1.5 py-1.5">
                    <TableMarketVolatility />
                  </div>
                  <div className="px-1.5 py-1.5">
                    {buttons.map(item => {
                      return (
                        <button key={item.value} onClick={() => { dispatch(dispatch(fetchDataTableMarketLiquidity(item.value))) }}
                          type="button" className={`hover:${item.hover} hover:text-white ${item.color} cursor-pointer border-none bg-[#151924] font-medium rounded-lg text-xs px-2.5 py-2.5 text-center mr-1 mb-2`}>{item.label}
                        </button>
                      )
                    })}
                    <TableMarketLiquidity />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="xl:flex lg:block mr-2 ml-1 my-2 px-1.5 py-1.5 bg-[#151924]">
                <div className="xl:w-[65%]">
                  <div>
                    <div className="text-center text-white">
                      <h3 className="p-2 uppercase">Độ rộng thị trường</h3>
                    </div>
                    <StackingAreas />
                  </div>
                </div>
                <div className="xl:w-[35%]">
                  <div className="">

                  </div>
                </div>
              </div>
            </div>
            <div className="mr-2 ml-1 my-2 px-1.5 py-1.5 bg-[#151924]">
              <div>
                <NetVolumeTrade />
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
};

export default Home;

