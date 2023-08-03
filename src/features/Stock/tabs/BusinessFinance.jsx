import React, { useEffect, useRef, useState } from 'react'
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import StatementsCashFlows from '../components/BusinessFinance/StatementsCashFlows';
import BusinessReport from '../components/BusinessFinance/BusinessReport';

const BusinessFinance = ({ codeUrl }) => {
  const [activeTab, setActiveTab] = useState('0');

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
                  '& .MuiTab-root': { color: (localStorage.getItem('theme') === 'dark' ? '#fff' : '#000') },
                  '& .MuiSvgIcon-root': { color: (localStorage.getItem('theme') === 'dark' ? '#fff' : '#000') }
                }}
              >
                <Tab onClick={() => handleTabClick('0')} label='Bảng cân đối kế toán' value='0' />
                <Tab onClick={() => handleTabClick('1')} label='Báo cáo kết quả kinh doanh' value='1' />
                <Tab onClick={() => handleTabClick('2')} label='Báo cáo lưu chuyển tiền tệ' value='2' />
                <Tab onClick={() => handleTabClick('3')} label='Chỉ số tài chính' value='3' />
              </TabList>
            </Box>
            <TabPanel value="0"><div className='dark:text-white text-black'>Bảng cân đối kế toán</div></TabPanel>
            <TabPanel value="1"><BusinessReport codeUrl={codeUrl} /></TabPanel>
            <TabPanel value="2"><StatementsCashFlows codeUrl={codeUrl} /></TabPanel>
            <TabPanel value="3"><div className='dark:text-white text-black'>Chỉ số tài chính</div></TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  )
}

export default BusinessFinance