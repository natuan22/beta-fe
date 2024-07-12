import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import TechPage1 from "../components/TechnicalAnalysisReport/TechPage1";
import TechPage2 from "../components/TechnicalAnalysisReport/TechPage2";
import TechPage3 from "../components/TechnicalAnalysisReport/TechPage3";
import {
  fetchDataInfoStock,
  fetchDataPriceFluctuation,
  fetchDataPriceFluctuationCorrelation,
  fetchDataSalesOrderStatistics,
  fetchDataTechnicalIndex,
} from "../thunk";
import { Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    test: {
      light: "#143A65",
      main: "#1976d2",
      dark: "#0054B4",
    },
  },
});

const TechnicalAnalysisReport = ({ codeUrl }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataTechnicalIndex(codeUrl.split("-")[0]));
    dispatch(fetchDataInfoStock(codeUrl.split("-")[0]));
    dispatch(fetchDataPriceFluctuationCorrelation(codeUrl.split("-")[0]));
    dispatch(fetchDataPriceFluctuation(codeUrl.split("-")[0]));
    dispatch(fetchDataSalesOrderStatistics(codeUrl.split("-")[0]));
  }, [dispatch, codeUrl]);

  const pageRefs = {
    page1: useRef(null),
    page2: useRef(null),
    page3: useRef(null),
  };

  const generateImage = async (pageRefs, height) => {
    if (!pageRefs.current) return null;
    const canvas = await html2canvas(pageRefs.current, {
      width: 800,
      height,
      scale: 2,
    });
    return canvas.toDataURL("image/png");
  };

  const downloadImages = async () => {
    const img1 = await generateImage(pageRefs.page1, 1121);
    const img2 = await generateImage(pageRefs.page2, 1121);
    const img3 = await generateImage(pageRefs.page3, 1121);

    const link1 = document.createElement("a");
    link1.href = img1;
    link1.download = `BetaAnalysisReportAutomation${
      codeUrl.split("-")[0]
    }-Trang1.png`;
    link1.click();

    const link2 = document.createElement("a");
    link2.href = img2;
    link2.download = `BetaAnalysisReportAutomation${
      codeUrl.split("-")[0]
    }-Trang2.png`;
    link2.click();

    const link3 = document.createElement("a");
    link3.href = img3;
    link3.download = `BetaAnalysisReportAutomation${
      codeUrl.split("-")[0]
    }-Trang3.png`;
    link3.click();
  };

  const generatePDF = async () => {
    const pdf = new jsPDF();
    const img1 = await generateImage(pageRefs.page1, 1480);
    const img2 = await generateImage(pageRefs.page2, 1480);
    const img3 = await generateImage(pageRefs.page3, 1480);

    pdf.addImage(img1, "PNG", 0, 0, 210, 387);
    pdf.addPage();
    pdf.addImage(img2, "PNG", 0, 0, 210, 387);
    pdf.addPage();
    pdf.addImage(img3, "PNG", 0, 0, 210, 387);

    pdf.save(`Phan-tich-ky-thuat-${codeUrl.split("-")[0]}.pdf`);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="container grid grid-cols-12">
        <div className="col-span-10 grid place-items-center">
          <div ref={pageRefs.page1}>
            <TechPage1 />
          </div>
          <div ref={pageRefs.page2}>
            <TechPage2 />
          </div>
          <div ref={pageRefs.page3}>
            <TechPage3 />
          </div>
        </div>

        <div className="col-span-2">
          <div className="flex justify-evenly my-10">
            <Button variant="contained" color="test" onClick={generatePDF}>
              <span className="text-white">Tải PDF</span>
            </Button>

            <Button variant="contained" color="test" onClick={downloadImages}>
              <span className="text-white">Tải ảnh</span>
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default TechnicalAnalysisReport;
