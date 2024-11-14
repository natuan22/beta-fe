import { LoadingButton } from "@mui/lab";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Skeleton, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import icon_excel from "../../../../app/asset/img/icon_excel.png";
import formatNumber from "../../../../helper/formatNumber";
import { getApi } from "../../../../helper/getApi";
import LineChartPrice from "./BuySellActive/components/LineChartPrice";
import PieChartVal from "./BuySellActive/components/PieChartVal";
import PriceStep from "./BuySellActive/components/PriceStep";
import StackColumnVal from "./BuySellActive/components/StackColumnVal";
import TableBuySell from "./BuySellActive/components/TableBuySell";
import "./BuySellActive/utils/styles/styleBtn.css";
import "./BuySellActive/utils/styles/styleLoadingBuySell.css";
import moment from "moment";
import socket from "../../../Chart/utils/socket";

const XLSX = require("xlsx");

const theme = createTheme({
  palette: {
    test: {
      light: "#25558d",
      main: "#0050AD",
      dark: "#0b3c74",
    },
  },
});

const BuySellActive = ({ stock }) => {
  const [isVisible, setIsVisible] = useState(true);

  const [data, setData] = useState();
  const [dataCashFlowAnalysis, setDataCashFlowAnalysis] = useState();

  const [showTable, setShowTable] = useState(1); // Mặc định hiển thị TableBuySell
  const [timeFrame, setTimeFrame] = useState(0);

  const [socketConnected, setSocketConnected] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadingExcel, setLoadingExcel] = useState(false);

  const calData = (data) => {
    // Đảo ngược dữ liệu để tính toán từ mới nhất đến cũ nhất
    const reversedData = [...data.data].reverse();

    let totalSellVolToNow = 0;
    let totalSellValToNow = 0;
    let totalBuyVolToNow = 0;
    let totalBuyValToNow = 0;

    // Duyệt qua dữ liệu đã đảo ngược để tính toán
    reversedData.forEach((item) => {
      if (item.action === "S") {
        totalSellVolToNow += item.volume;
        totalSellValToNow += item.value;
      } else if (item.action === "B") {
        totalBuyVolToNow += item.volume;
        totalBuyValToNow += item.value;
      }

      // Ghi tổng sell và buy vào từng object
      item.totalSellVolToNow = totalSellVolToNow;
      item.totalSellValToNow = totalSellValToNow;
      item.totalBuyVolToNow = totalBuyVolToNow;
      item.totalBuyValToNow = totalBuyValToNow;
    });

    // Sau khi tính xong 4 biến trên, đảo ngược lại dữ liệu về thứ tự ban đầu
    reversedData.reverse();

    // Tính tổng volume tổng, sell và buy
    const { totalVol, totalVolSell, totalVolBuy } = data.data.reduce(
      (acc, item) => {
        acc.totalVol += item.volume;
        if (item.action === "S") {
          acc.totalVolSell += item.volume;
        } else if (item.action === "B") {
          acc.totalVolBuy += item.volume;
        }
        return acc;
      },
      { totalVol: 0, totalVolSell: 0, totalVolBuy: 0 }
    );

    // Bước giá
    const matchPriceGroups = new Map();

    reversedData.forEach((item) => {
      if (!matchPriceGroups.has(item.matchPrice)) {
        matchPriceGroups.set(item.matchPrice, {
          totalValBuy: 0,
          totalValSell: 0,
          atcVal: 0,
          atoVal: 0,
          totalVolBuy: 0,
          totalVolSell: 0,
          atcVol: 0,
          atoVol: 0,
        });
      }

      const group = matchPriceGroups.get(item.matchPrice);

      switch (item.action) {
        case "B":
          group.totalValBuy += item.value;
          group.totalVolBuy += item.volume;
          break;
        case "S":
          group.totalValSell += item.value;
          group.totalVolSell += item.volume;
          break;
        case "C":
          group.atcVal += item.value;
          group.atcVol += item.volume;
          break;
        case "O":
          group.atoVal += item.value;
          group.atoVol += item.volume;
          break;
        default:
          break;
      }
    });

    // Kết quả cuối cùng sau khi tính toán
    const dataNew = {
      ...data,
      totalVol,
      totalVolSell,
      totalVolBuy,
      matchPriceGroups: Array.from(matchPriceGroups, ([category, values]) => ({
        category,
        ...values,
      })),
    };

    return dataNew;
  };

  const calDataCashFlowAnalysis = (data) => {
    const totals = {
      buy: { small: 0, medium: 0, large: 0 },
      sell: { small: 0, medium: 0, large: 0 },
    };

    let totalBuyVal = 0;
    let totalSellVal = 0;

    data.forEach((item, index) => {
      if (timeFrame === 0 || timeFrame === 1) {
        if (index === 0) {
          const startTime =
            item.action !== "B" && item.action !== "S" && data[index + 1]
              ? moment(data[index + 1].time, "HH:mm:ss")
              : moment(item.time, "HH:mm:ss");
          const cutoffTime = startTime.clone().subtract(30, "minutes"); // Subtract 30 minutes

          // Process items within the 30-minute window
          data.forEach((innerItem) => {
            const currentItemTime = moment(innerItem.time, "HH:mm:ss");
            if (currentItemTime.isSameOrAfter(cutoffTime)) {
              if (innerItem.action === "B") {
                totals.buy[innerItem.type] += innerItem.value;
                totalBuyVal += innerItem.value;
              } else if (innerItem.action === "S") {
                totals.sell[innerItem.type] += innerItem.value;
                totalSellVal += innerItem.value;
              }
            }
          });
        }
      } else {
        if (item.action === "B") {
          totals.buy[item.type] += item.value;
          totalBuyVal += item.value;
        } else if (item.action === "S") {
          totals.sell[item.type] += item.value;
          totalSellVal += item.value;
        }
      }
    });

    return { totals, totalBuyVal, totalSellVal };
  };

  const fetchData = async () => {
    try {
      const res = await getApi(
        `/api/v1/investment/ticker-translog?stock=${stock}`
      );
      return res; // Return the fetched data
    } catch (error) {
      console.error(error);
      return null; // Return null in case of an error
    }
  };

  useEffect(() => {
    // Page Visibility API
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const currentTime = new Date();
      const hours = currentTime.getHours();

      const fetchedData = await fetchData(); // Call fetchData and wait for the result

      if (fetchedData !== null) {
        const processedData = calData(fetchedData);

        setData(processedData);
        setSocketConnected(true);
        setLoading(false);
      } else if (fetchedData === null && hours >= 8 && hours < 23) {
        setData(null);
        setSocketConnected(false);
        setLoading(false);
      } else {
        setData(null);
        setSocketConnected(false);
        setLoading(true);
      }
    };

    loadData();

    /// Set up periodic fetching only if the page is visible
    const intervalId = isVisible ? setInterval(loadData, 60000) : null;
    return () => clearInterval(intervalId); // Cleanup on unmount or stock change
  }, [stock, isVisible]);

  useEffect(() => {
    if (data) {
      const cashFlowAnalysis = calDataCashFlowAnalysis(data.data);
      setDataCashFlowAnalysis(cashFlowAnalysis);
    }
  }, [data, timeFrame]);

  const prepareData = (item) => [
    moment(item.time, "HH:mm:ss").format("HH:mm:ss"),
    item.action === "S" ? "Bán" : item.action === "B" ? "Mua" : " ",
    item.volume,
    item.matchPrice,
    item.priceChangeReference,
    item.perChangeReference.toFixed(2),
  ];

  const sheet1Title = ["Giờ", "Mua/Bán", "Khối lượng", "Giá", "+/-", "%"];

  const fetchDataAndDownloadCSV = async () => {
    try {
      setLoadingExcel(true);

      // Gọi API để lấy dữ liệu
      const data = await getApi(
        `/api/v1/investment/ticker-translog?stock=${stock}`
      );

      //Xử lý dữ liệu đưa vào sheet
      const sheet1Data = data?.data.map(prepareData);

      // Tạo workbook và thêm các sheet
      const workbook = XLSX.utils.book_new();

      // Tạo sheet 1
      XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.aoa_to_sheet([sheet1Title, ...sheet1Data]),
        "Mua bán chủ động"
      );

      // Xuất workbook thành file Excel
      XLSX.writeFile(workbook, `dataMB_${stock}.xlsx`);
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    } finally {
      setLoadingExcel(false);
    }
  };

  const buyColor = [
    { name: "Lớn", color: "#00d060" },
    { name: "Trung bình", color: "#0c7640" },
    { name: "Nhỏ", color: "#144d31" },
  ];
  const sellColor = [
    { name: "Lớn", color: "#d34037" },
    { name: "Trung bình", color: "#812a24" },
    { name: "Nhỏ", color: "#572724" },
  ];

  // useEffect(() => {
  //   if (socketConnected && data) {
  //     const updateData = (newData) => {
  //       const { action, volume: newVolume, value: newValue, type } = newData;
  //       const { totalBuyValToNow, totalBuyVolToNow, totalSellValToNow, totalSellVolToNow } = data.data[0]

  //       const updatedTotalsToNow = {
  //         totalBuyVolToNow: action === "B" ? totalBuyVolToNow + newVolume : totalBuyVolToNow,
  //         totalBuyValToNow: action === "B" ? totalBuyValToNow + newValue : totalBuyValToNow,
  //         totalSellValToNow: action === "S" ? totalSellValToNow + newValue : totalSellValToNow,
  //         totalSellVolToNow: action === "S" ? totalSellVolToNow + newVolume : totalSellVolToNow,
  //       };

  //       // Cập nhật tổng giá trị và khối lượng
  //       const updatedBuyValData = {
  //         ...data.buyValData,
  //         ...(action === "B" && { [type]: (data.buyValData[type] || 0) + newValue })
  //       };

  //       const updatedSellValData = {
  //         ...data.sellValData,
  //         ...(action === "S" && { [type]: (data.sellValData[type] || 0) + newValue })
  //       };

  //       // Cập nhật các giá trị tổng
  //       const updatedTotals = {
  //         totalVol: data.totalVol + newVolume,
  //         totalVolBuy: action === "B" ? data.totalVolBuy + newVolume : data.totalVolBuy,
  //         totalVolSell: action === "S" ? data.totalVolSell + newVolume : data.totalVolSell,
  //         totalBuyVal: action === "B" ? data.totalBuyVal + newValue : data.totalBuyVal,
  //         totalSellVal: action === "S" ? data.totalSellVal + newValue : data.totalSellVal,
  //       };

  //       // Cập nhật matchPriceGroups
  //       const updatedMatchPriceGroups = data.matchPriceGroups.map((group) => {
  //         if (group.category === newData.type) {
  //           // Nếu category khớp, cập nhật tổng giá trị mua và bán
  //           return {
  //             ...group,
  //             totalBuy: action === "B" ? group.totalBuy + newValue : group.totalBuy,
  //             totalSell: action === "S" ? group.totalSell + newValue : group.totalSell,
  //             atc: action === "C" ? group.atc + newValue : group.atc,
  //             ato: action === "O" ? group.ato + newValue : group.ato,
  //           };
  //         }
  //         return group; // Không thay đổi nhóm nếu category không khớp
  //       });

  //       // Tạo một đối tượng mới cho newData với thông tin bổ sung
  //       const updatedNewData = {
  //         ...newData, // Sao chép toàn bộ dữ liệu hiện có từ newData
  //         ...updatedTotalsToNow, // Thêm các giá trị tổng mới vào newData
  //       };

  //       // Cập nhật dữ liệu mới vào danh sách
  //       const updatedDataList = [updatedNewData, ...data.data];

  //       // Cập nhật state với dữ liệu đã được xử lý
  //       setData((prevData) => ({
  //         ...prevData,
  //         buyValData: updatedBuyValData,
  //         sellValData: updatedSellValData,
  //         data: updatedDataList,
  //         matchPriceGroups: updatedMatchPriceGroups,
  //         ...updatedTotals,
  //       }));
  //     };

  //     // Đăng ký lắng nghe sự kiện từ socket
  //     socket.on(`listen-trans-co-phieu-${stock}`, updateData);

  //     return () => {
  //       // Tắt sự kiện socket khi component unmount
  //       socket.off(`listen-trans-co-phieu-${stock}`, updateData);
  //     };
  //   }
  // }, [socketConnected, data, stock]);

  const formatVolume = (volume) =>
    volume >= 1000 ? `${formatNumber(volume / 1000)} K` : volume;

  return (
    <ThemeProvider theme={theme}>
      <div className="md:flex sm:block items-center">
        <div className="xs:w-[362px] xxs:w-full border-solid border-[#25558d] border-b-2 border-t-0 border-x-0">
          <span className="dark:text-white text-black font-semibold uppercase">
            Mua bán chủ động
          </span>
        </div>
        <div className="md:translate-x-[0px] sm:translate-x-[-8px] md:!mt-0 sm:mt-2 xs:mt-2 xxs:mt-2 md:block sm:flex xs:flex xxs:flex justify-center">
          <LoadingButton
            className="!ml-2"
            variant="contained"
            color="test"
            sx={{
              padding: "0px",
              "& .MuiLoadingButton-loadingIndicator": {
                color: "#FC9433", // Customize the color of the loading spinner
              },
            }}
            loading={loadingExcel}
            onClick={fetchDataAndDownloadCSV}
          >
            <div className="flex items-center p-[7.5px]">
              <img src={icon_excel} alt="icon_excel" />
              <span className="normal-case pl-1 text-[14px] font-semibold text-white">
                Tải Excel
              </span>
            </div>
          </LoadingButton>
        </div>
      </div>
      {!loading ? (
        <div>
          <div className="mt-5 xl:grid xl:grid-cols-12 lg:grid-cols-none md:block">
            <div className="2xl:col-span-5 xl:col-span-8">
              <LineChartPrice data={data} />
            </div>

            <div className="2xl:col-span-7 xl:col-span-4 grid 2xl:grid-cols-2 xl:grid-cols-none">
              <div className="2xl:flex xl:hidden lg:hidden md:hidden sm:hidden xs:hidden xxs:hidden flex-col justify-around">
                <div className="grid grid-cols-12">
                  <div className="col-span-1 content-center justify-self-end">
                    <Tooltip
                      placement="bottom"
                      title={
                        <div className="w-[275px] text-justify">
                          Phân loại lệnh Mua/Bán chủ động:
                          <br /> Lớn (&gt;1 tỷ đồng/lệnh); Trung Bình (100tr-1tỷ
                          đồng/lệnh) và Nhỏ (&lt;100 triệu đồng/lệnh)
                        </div>
                      }
                      color={"linear-gradient(to bottom, #E6EFF9, #61A6F6)"}
                    >
                      <BsInfoCircle className="cursor-pointer dark:text-white text-black" />
                    </Tooltip>
                  </div>

                  <div className="col-span-11 text-[15px] pr-3">
                    <div className="flex justify-evenly dark:text-white text-black">
                      <div>
                        Lệnh{" "}
                        <span className="text-green-500 uppercase font-bold">
                          mua (M)
                        </span>{" "}
                        chủ động
                      </div>

                      {buyColor.map((item, index) => (
                        <div className="flex items-center gap-2" key={index}>
                          <div
                            style={{ backgroundColor: item.color }}
                            className="rounded-[50%] w-[10px] h-[10px]"
                          ></div>
                          <div>{item.name}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-evenly mt-1 dark:text-white text-black">
                      <div className="w-[168px]">
                        Lệnh{" "}
                        <span className="text-red-500 uppercase font-bold">
                          bán (B)
                        </span>{" "}
                        chủ động
                      </div>

                      {sellColor.map((item, index) => (
                        <div className="flex items-center gap-2" key={index}>
                          <div
                            style={{ backgroundColor: item.color }}
                            className="rounded-[50%] w-[10px] h-[10px]"
                          ></div>
                          <div>{item.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="my-2 px-7">
                  <button
                    className={`custom-btn-line cursor-pointer ${
                      timeFrame === 0 ? "active-btn-line" : "btn-2-line"
                    }`}
                    onClick={() => setTimeFrame(0)}
                  >
                    30 phút
                  </button>
                  <button
                    className={`custom-btn-line cursor-pointer ml-3 xs:translate-x-0 xxs:-translate-x-3 xs:mt-0 xxs:mt-4 ${
                      timeFrame === 1 ? "active-btn-line" : "btn-2-line"
                    }`}
                    onClick={() => setTimeFrame(1)}
                  >
                    2 giờ
                  </button>
                  <button
                    className={`custom-btn-line cursor-pointer ml-3 xs:translate-x-0 xxs:-translate-x-3 xs:mt-0 xxs:mt-4 ${
                      timeFrame === 2 ? "active-btn-line" : "btn-2-line"
                    }`}
                    onClick={() => setTimeFrame(2)}
                  >
                    1 ngày
                  </button>
                </div>
                <StackColumnVal data={dataCashFlowAnalysis} />
                <PieChartVal data={dataCashFlowAnalysis} />
              </div>

              <div>
                <div className="w-fit">
                  <button
                    className={`custom-btn-line ${
                      showTable === 1 ? "active-btn-line" : "btn-2-line"
                    }`}
                    onClick={() => setShowTable(1)}
                  >
                    Sổ lệnh
                  </button>
                  <button
                    className={`custom-btn-line ml-4 ${
                      showTable === 2 ? "active-btn-line" : "btn-2-line"
                    }`}
                    onClick={() => setShowTable(2)}
                  >
                    Bước giá
                  </button>
                </div>
                <div className="flex justify-evenly py-1 font-semibold items-center dark:text-white text-black">
                  <div>KL: {formatVolume(data?.totalVol)}</div>
                  <div>
                    M:{" "}
                    <span className="text-green-500">
                      {formatVolume(data?.totalVolBuy)}
                    </span>
                  </div>
                  <div>
                    B:{" "}
                    <span className="text-red-500">
                      {formatVolume(data?.totalVolSell)}
                    </span>
                  </div>
                </div>
                <div>
                  {showTable === 1 ? (
                    <TableBuySell data={data} /> // Hiển thị TableBuySell nếu showTable là true
                  ) : (
                    <PriceStep data={data} /> // Hiển thị PriceStep nếu showTable là false
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="2xl:hidden xl:block">
            <div className="md:w-[460px] sm:w-[250px] xs:w-[250px] xxs:w-[250px] grid grid-cols-12 mx-auto my-8">
              <div className="col-span-1 content-center justify-self-end">
                <Tooltip
                  placement="bottom"
                  title={
                    <div className="w-[275px] text-justify">
                      Phân loại lệnh Mua/Bán chủ động:
                      <br /> Lớn (&gt;1 tỷ đồng/lệnh); Trung Bình (100tr-1tỷ
                      đồng/lệnh) và Nhỏ (&lt;100 triệu đồng/lệnh)
                    </div>
                  }
                  color={"linear-gradient(to bottom, #E6EFF9, #61A6F6)"}
                >
                  <BsInfoCircle className="cursor-pointer dark:text-white text-black" />
                </Tooltip>
              </div>

              <div className="col-span-11 text-[15px] pr-5 md:ml-0 sm:ml-3 xs:ml-3 xxs:ml-3">
                <div className="md:flex sm:block justify-evenly dark:text-white text-black">
                  <div>
                    Lệnh{" "}
                    <span className="text-green-500 uppercase font-bold">
                      mua (M)
                    </span>{" "}
                    chủ động
                  </div>

                  {buyColor.map((item, index) => (
                    <div
                      className="flex items-center gap-2 md:ml-0 sm:ml-3 xs:ml-3 xxs:ml-3"
                      key={index}
                    >
                      <div
                        style={{ backgroundColor: item.color }}
                        className="rounded-[50%] w-[10px] h-[10px]"
                      ></div>
                      <div>{item.name}</div>
                    </div>
                  ))}
                </div>

                <div className="md:flex sm:block justify-evenly mt-1 dark:text-white text-black">
                  <div className="w-[166px]">
                    Lệnh{" "}
                    <span className="text-red-500 uppercase font-bold">
                      bán (B)
                    </span>{" "}
                    chủ động
                  </div>

                  {sellColor.map((item, index) => (
                    <div
                      className="flex items-center gap-2 md:ml-0 sm:ml-3 xs:ml-3 xxs:ml-3"
                      key={index}
                    >
                      <div
                        style={{ backgroundColor: item.color }}
                        className="rounded-[50%] w-[10px] h-[10px]"
                      ></div>
                      <div>{item.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mx-auto w-fit my-3">
              <button
                className={`sm:inline xs:block custom-btn-line cursor-pointer ${
                  timeFrame === 0 ? "active-btn-line" : "btn-2-line"
                }`}
                onClick={() => setTimeFrame(0)}
              >
                30 phút
              </button>
              <button
                className={`sm:inline xs:block custom-btn-line cursor-pointer ml-3 sm:translate-x-0 xs:-translate-x-3 xxs:-translate-x-3 sm:mt-0 xs:mt-4 xxs:mt-4 ${
                  timeFrame === 1 ? "active-btn-line" : "btn-2-line"
                }`}
                onClick={() => setTimeFrame(1)}
              >
                2 giờ
              </button>
              <button
                className={`sm:inline xs:block custom-btn-line cursor-pointer ml-3 sm:translate-x-0 xs:-translate-x-3 xxs:-translate-x-3 sm:mt-0 xs:mt-4 xxs:mt-4 ${
                  timeFrame === 2 ? "active-btn-line" : "btn-2-line"
                }`}
                onClick={() => setTimeFrame(2)}
              >
                1 ngày
              </button>
            </div>
            <div className="xl:grid grid-cols-12 md:block">
              <div className="xl:col-span-6 lg:col-span-8 mx-auto">
                <StackColumnVal data={dataCashFlowAnalysis} />
              </div>
              <div className="xl:col-span-6 lg:col-span-4 mx-auto">
                <PieChartVal data={dataCashFlowAnalysis} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="buy-sell-active">
          <div className="grid lg:grid-cols-2 md:grid-cols-none gap-5">
            <div className="mt-4">
              <Skeleton.Input active block size="large" className="mt-1" />
            </div>
            <div className="grid md:grid-cols-2 sm:grid-cols-none gap-5">
              <div>
                <div className="mt-4">
                  <Skeleton.Input active block size="large" className="mt-1" />
                </div>
                <div className="mt-4">
                  <Skeleton.Input active block size="large" className="mt-1" />
                </div>
              </div>
              <div className="table-price mt-4">
                <Skeleton.Input active block size="large" className="mt-1" />
              </div>
            </div>
          </div>
        </div>
      )}
    </ThemeProvider>
  );
};

export default BuySellActive;
