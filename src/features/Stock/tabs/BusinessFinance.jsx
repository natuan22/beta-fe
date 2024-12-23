import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import React, { useState } from "react";
import BalanceSheet from "../components/BusinessFinance/BalanceSheet";
import BusinessReport from "../components/BusinessFinance/BusinessReport";
import FinancialIndicators from "../components/BusinessFinance/FinancialIndicators";
import StatementsCashFlows from "../components/BusinessFinance/StatementsCashFlows";

const BusinessFinance = ({ codeUrl }) => {
  const [activeTab, setActiveTab] = useState("0");

  const handleTabClick = (value) => {
    setActiveTab(value);
  };

  return (
    <div>
      <div className="pt-4">
        <Box
          sx={{ width: "100%", typography: "body1", bgcolor: "transparent" }}
          className="pt-1"
        >
          <TabContext value={activeTab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                sx={{
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#FF7317",
                    height: "48px",
                    zIndex: "-1",
                    boxShadow: `inset -4px -4px 6px 0 rgba(0, 0, 0, 0.2),
                  inset 4px 4px 6px 0 rgba(0, 0, 0, 0.4)`,
                    borderRadius: "10px",
                  },
                  "& .MuiButtonBase-root .MuiTouchRipple-root": {
                    backgroundColor: "#0050AD",
                    height: "200px",
                    zIndex: "-1",
                  },
                  "& .MuiTab-root": { color: "#fff", textTransform: "none" },
                  "& .MuiTab-root .MuiTabs-scroller": {
                    transform: "translateX(50px)",
                  },
                  "& .MuiButtonBase-root ": {
                    marginRight: "15px",
                    borderRadius: "10px",
                  },
                }}
              >
                <Tab
                  onClick={() => handleTabClick("0")}
                  label="Bảng cân đối kế toán"
                  value="0"
                />
                <Tab
                  onClick={() => handleTabClick("1")}
                  label="Báo cáo kết quả kinh doanh"
                  value="1"
                />
                <Tab
                  onClick={() => handleTabClick("2")}
                  label="Báo cáo lưu chuyển tiền tệ"
                  value="2"
                />
                <Tab
                  onClick={() => handleTabClick("3")}
                  label="Chỉ số tài chính"
                  value="3"
                />
              </TabList>
            </Box>
            <TabPanel value="0">
              <BalanceSheet codeUrl={codeUrl} />
            </TabPanel>
            <TabPanel value="1">
              <BusinessReport codeUrl={codeUrl} />
            </TabPanel>
            <TabPanel value="2">
              <StatementsCashFlows codeUrl={codeUrl} />
            </TabPanel>
            <TabPanel value="3">
              <FinancialIndicators codeUrl={codeUrl} />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default BusinessFinance;
