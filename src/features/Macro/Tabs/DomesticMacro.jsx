import React, { useState, useRef, useEffect } from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import GDP from "./DomesticMacro/GDP";
import CPI from "./DomesticMacro/CPI";
import Produce from "./DomesticMacro/Produce";
import RetailImportAndExport from "./DomesticMacro/RetailImportAndExport";
import FDI from "./DomesticMacro/FDI";
import Credit from "./DomesticMacro/Credit";
import RateAndInterestRate from "./DomesticMacro/RateAndInterestRate";
import Bonds from "./DomesticMacro/Bonds";
import Labour from "./DomesticMacro/Labour";
import "../utils/style/muiTabHeader.css";
export const hashTb = {
  GDP: "0",
  CPI: "1",
  "SẢN XUẤT": "2",
  "BÁN LẺ & XUẤT NHẬP KHẨU": "3",
  FDI: "4",
  "TÍN DỤNG": "5",
  "TỶ GIÁ VÀ LÃI SUẤT": "6",
  "TRÁI PHIẾU DN": "7",
  "LAO ĐỘNG": "8",
};

function DomesticMacro() {
  const [value, setValue] = useState(localStorage.getItem("userTabCurrent"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("userTabCurrent", newValue);
  };
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("userTabCurrent"),
  );
  const tabsRef = useRef([]);

  const handleTabClick = (value) => {
    setActiveTab(value);
    localStorage.setItem("userTabCurrent", value);
  };

  useEffect(() => {
    const activeButton = tabsRef.current[activeTab];
    const movingBackground = document.querySelector(".moving-background");
    if (activeButton && movingBackground) {
      movingBackground.style.left = `${activeButton.offsetLeft}px`;
      movingBackground.style.width = `${activeButton.offsetWidth}px`;
    }
  }, [activeTab]);

  return (
    <div className="tab container mx-auto">
      <Box
        sx={{ width: "100%", typography: "body1", bgcolor: "transparent" }}
        className="pt-1"
        id="domesticMacro"
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
            >
              <div className="moving-background absolute h-full top-0 bg-[#35adf2] transition-all duration-500 rounded-full "></div>
              {Object.entries(hashTb).map(([label, value]) => (
                <Tab
                  ref={(el) => (tabsRef.current[value] = el)}
                  onClick={() => handleTabClick(value)}
                  className="btn"
                  key={value}
                  label={label}
                  value={value}
                />
              ))}
            </TabList>
          </Box>

          <TabPanel value="0">
            <GDP />
          </TabPanel>
          <TabPanel value="1">
            <CPI />
          </TabPanel>
          <TabPanel value="2">
            <Produce />
          </TabPanel>
          <TabPanel value="3">
            <RetailImportAndExport />
          </TabPanel>
          <TabPanel value="4">
            <FDI />
          </TabPanel>
          <TabPanel value="5">
            <Credit />
          </TabPanel>
          <TabPanel value="6">
            <RateAndInterestRate />
          </TabPanel>
          <TabPanel value="7">
            <Bonds />
          </TabPanel>
          <TabPanel value="8">
            <Labour />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default DomesticMacro;
