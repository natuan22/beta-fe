import { LoadingButton } from "@mui/lab";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import icon_excel from "../../../../app/asset/img/icon_excel.png";
import { getApi } from "../../../../helper/getApi";
import { fetchDataHistoricalPEPB } from "../../thunk";
import ChartLine from "./components/ChartLine";

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

const HistoricalPEPB = ({ stock }) => {
  const dispatch = useDispatch();
  const { dataHistoricalPEPB } = useSelector((state) => state.stock);
  const [period, setPeriod] = useState("1");

  const [loadingExcel, setLoadingExcel] = useState(false);

  useEffect(() => {
    dispatch(fetchDataHistoricalPEPB(stock, period));
  }, [dispatch, stock, period]);

  const sheetTitle = [
    "Ngày",
    "PB Vnindex",
    "PE Vnindex",
    "PB Ngành",
    "PE Ngành",
    "PB",
    "PE",
  ];

  const prepareData = (item) => [
    moment(item.from).format("DD/MM/YYYY"), // Format to "DD/MM/YYYY"
    item.indexPb,
    item.indexPe,
    item.industryPb,
    item.industryPe,
    item.pb,
    item.pe,
  ];

  const downloadExcel = async () => {
    try {
      setLoadingExcel(true);

      const data = await getApi(
        `/api/v1/tcbs/historical-pe-pb?stock=${stock}&period=${period}`,
      );

      //Xử lý dữ liệu đưa vào sheet
      const sheet1Data = data.data.map(prepareData);

      // Tạo workbook và thêm các sheet
      const workbook = XLSX.utils.book_new();

      // Tạo sheet 1
      XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.aoa_to_sheet([sheetTitle, ...sheet1Data]),
        "Historical PE PB",
      );

      // Xuất workbook thành file Excel
      XLSX.writeFile(workbook, `historical-pe-pb-${stock}-${period}year.xlsx`);
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    } finally {
      setLoadingExcel(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="md:flex sm:block mt-8 items-center">
        <div className="md:w-[170px] sm:w-[200px] xs:w-[180px] xxs:w-[180px] border-solid border-[#25558d] border-b-2 border-t-0 border-x-0">
          <span className="dark:text-white text-black font-semibold uppercase">
            Lịch sử P/E, P/B
          </span>
        </div>
        <div className="sm:flex xs:block items-center justify-center md:mt-0 sm:mt-5 xs:mt-5 xxs:mt-5 gap-2">
          <div className="sm:block xs:flex xxs:flex justify-center">
            <button
              className={`custom-btn md:ml-5 sm:ml-0 ${
                period === "1" ? "active-btn" : "btn-2"
              }`}
              onClick={() => {
                setPeriod("1");
              }}
            >
              1Y
            </button>
            <button
              className={`custom-btn ml-5 ${
                period === "3" ? "active-btn" : "btn-2"
              }`}
              onClick={() => {
                setPeriod("3");
              }}
            >
              3Y
            </button>
            <button
              className={`custom-btn ml-5 ${
                period === "5" ? "active-btn" : "btn-2"
              }`}
              onClick={() => {
                setPeriod("5");
              }}
            >
              5Y
            </button>
          </div>
          <div className="sm:mt-0 xs:mt-5 xxs:mt-5 sm:block xs:flex xxs:flex justify-center">
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
              onClick={downloadExcel}
            >
              <div className="flex items-center p-[7.5px]">
                <img src={icon_excel} alt="icon_excel" />
                <span className="normal-case pl-1 text-[14px]  font-semibold text-white">
                  Tải Excel
                </span>
              </div>
            </LoadingButton>
          </div>
        </div>
      </div>
      <div className="mt-5 grid xl:grid-cols-2 lg:grid-cols-none">
        <ChartLine stock={stock} data={dataHistoricalPEPB} chartKey="P/E" period={period}/>
        <ChartLine stock={stock} data={dataHistoricalPEPB} chartKey="P/B" period={period}/>
      </div>
    </ThemeProvider>
  );
};

export default HistoricalPEPB;
