import React, { useEffect, useRef, useState } from 'react'
import LayOut from '../../HOCs/Layout'
import StockInfo from './components/StockInfo'
import BusinessFinance from './tabs/BusinessFinance'
import NewsAndEvent from './tabs/NewsAndEvent'
import Overview from './tabs/Overview'
import QuickAnalysis from './tabs/QuickAnalysis'
import TransactionStatistics from './tabs/TransactionStatistics'
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import './utils/style/muiTabHeader.css'
import { useParams } from 'react-router-dom'
export const hashTb = {
    'PHÂN TÍCH NHANH': '0',
    'TỔNG QUAN': '1',
    'THỐNG KÊ GIAO DỊCH': '2',
    'TÀI CHÍNH DOANH NGHIỆP': '3',
    'TIN TỨC VÀ SỰ KIỆN': '4',
}

const StockDetail = () => {
    const [value, setValue] = useState(localStorage.getItem('userTabStockDetail'));
    const { code } = useParams()

    const handleChange = (event, newValue) => {
        setValue(newValue);
        localStorage.setItem('userTabStockDetail', newValue)
    };
    const [activeTab, setActiveTab] = useState(localStorage.getItem('userTabStockDetail'));
    const tabsRef = useRef([]);

    const handleTabClick = (value) => {
        setActiveTab(value);
        localStorage.setItem('userTabStockDetail', value)
    };

    useEffect(() => {
        const activeButton = tabsRef.current[activeTab];
        const movingBackground = document.querySelector('.moving-background');
        if (activeButton && movingBackground) {
            movingBackground.style.left = `${activeButton.offsetLeft}px`;
            movingBackground.style.width = `${activeButton.offsetWidth}px`;
        }
    }, [activeTab]);

    return (
        <LayOut>
            <div className="container mx-auto">
                <StockInfo codeSearch={code.split('-')[0]} />
                <div className='pt-4'>
                    <Box sx={{ width: '100%', typography: 'body1', bgcolor: 'transparent' }} className='pt-1' id='stockDetail'>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList
                                    onChange={handleChange}
                                    variant="scrollable"
                                    scrollButtons
                                    allowScrollButtonsMobile
                                >
                                    <div className="moving-background absolute h-full top-0 bg-[#0055B6] transition-all duration-500"></div>
                                    {Object.entries(hashTb).map(([label, value]) => (
                                        <Tab
                                            ref={el => tabsRef.current[value] = el}
                                            onClick={() => handleTabClick(value)} className='btn' key={value} label={label} value={value} />
                                    ))}
                                </TabList>
                            </Box>

                            <TabPanel value="0"><QuickAnalysis /></TabPanel>
                            <TabPanel value="1"><Overview /></TabPanel>
                            <TabPanel value="2"><TransactionStatistics /></TabPanel>
                            <TabPanel value="3"><BusinessFinance /></TabPanel>
                            <TabPanel value="4"><NewsAndEvent /></TabPanel>
                        </TabContext>
                    </Box>
                </div>
            </div>
        </LayOut>
    )
}

export default StockDetail