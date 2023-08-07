import React, { useEffect, useLayoutEffect, useState } from "react";
import LayOut from "../../HOCs/Layout";
import StockInfo from "./components/StockInfo";
import BusinessFinance from "./tabs/BusinessFinance";
import NewsAndEvent from "./tabs/NewsAndEvent";
import Overview from "./tabs/Overview";
import QuickAnalysis from "./tabs/QuickAnalysis";
import TransactionStatistics from "./tabs/TransactionStatistics";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "./utils/style/muiTabHeader.css";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import test from './utils/style/muiTabHeader.module.css'

const StockDetail = () => {
    const defaultStock = 'HPG-CTCP'
    const { code } = useParams();
    const [width, setWidth] = useState();
    const [codeVal, setCodeVal] = useState(code || defaultStock);
    const [theme, setTheme] = useState(localStorage.getItem('theme'))
    const color = useSelector((state) => state.color.colorTheme);
    const [activeTab, setActiveTab] = useState('1');

    useEffect(() => {
        setTheme(color);
    }, [color]);

    useEffect(() => {
        if (code) {
            setCodeVal(code);
        } else {
            setCodeVal(defaultStock)
        }
    }, [code, defaultStock]);

    const handleTabClick = (value) => {
        setActiveTab(value);
    };

    useLayoutEffect(() => {
        const breakpoints = [
            { size: 1920, width: '1350px' },
            { size: 1440, width: '1200px' },
            { size: 1024, width: '960px' },
            { size: 768, width: '960px' },
            { size: 425, width: '960px' },
            { size: 375, width: '960px' },
            { size: 0, width: '960px' } // Giá trị mặc định nếu màn hình nhỏ hơn tất cả các giá trị trên
        ];

        function handleResize() {
            const currentWidth = window.innerWidth;
            let newWidth = breakpoints[breakpoints.length - 1].width; // Giá trị mặc định
            for (const breakpoint of breakpoints) {
                if (currentWidth >= breakpoint.size) {
                    newWidth = breakpoint.width;
                    break;
                }
            }
            setWidth(newWidth);
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <LayOut>
            <div className="tab container mx-auto md:w-[90%] lg:w-[90%] xl:w-[90%]">
                <StockInfo codeUrl={codeVal} />
                <div className="pt-4">
                    <Box
                        sx={{ width: "100%", typography: "body1", bgcolor: "transparent" }}
                        className="pt-1"
                        id="stockDetail"
                    >
                        <TabContext value={activeTab}>
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <TabList
                                    className={
                                        `${test.stockDetail}`
                                    }
                                    variant="scrollable"
                                    scrollButtons
                                    allowScrollButtonsMobile
                                    sx={{
                                        '& .MuiTab-root': {
                                            color: (localStorage.getItem('theme') === 'dark' ? '#fff' : '#000'),
                                        },
                                        '& .MuiTab-root .Mui-selected': {
                                            color: (localStorage.getItem('theme') === 'dark' ? '#fff' : '#000'),
                                        },
                                        '& .MuiTabs-indicator': {
                                            backgroundColor: '#0055b6', height: '200px', zIndex: '-1',
                                        },
                                        '& .MuiTabs-flexContainer': {
                                            width: width,
                                            flex: 1,  /* Chia chiều rộng đều cho các tab */
                                            display: 'flex', /* Sử dụng flexbox để canh đều các tab */
                                            justifyContent: 'space-evenly',
                                        },
                                        '& .MuiSvgIcon-root': {
                                            color: (localStorage.getItem('theme') === 'dark' ? '#fff' : '#000'),
                                        }
                                    }}
                                >
                                    <Tab onClick={() => handleTabClick('0')} label='PHÂN TÍCH NHANH' value='0' />
                                    <Tab onClick={() => handleTabClick('1')} label='TỔNG QUAN' value='1' />
                                    <Tab onClick={() => handleTabClick('2')} label='THỐNG KÊ GIAO DỊCH' value='2' />
                                    <Tab onClick={() => handleTabClick('3')} label='TÀI CHÍNH DOANH NGHIỆP' value='3' />
                                    <Tab onClick={() => handleTabClick('4')} label='TIN TỨC VÀ SỰ KIỆN' value='4' />
                                </TabList>
                            </Box>
                            <TabPanel value="0"><QuickAnalysis /></TabPanel>
                            <TabPanel value="1"><Overview codeUrl={codeVal} handleTabClick={handleTabClick} /></TabPanel>
                            <TabPanel value="2"><TransactionStatistics codeUrl={codeVal} /></TabPanel>
                            <TabPanel value="3"><BusinessFinance codeUrl={codeVal} /></TabPanel>
                            <TabPanel value="4"><NewsAndEvent codeUrl={codeVal} /></TabPanel>
                        </TabContext>
                    </Box>
                </div>
                <Footer />
            </div >
        </LayOut >
    );
};

export default StockDetail;
