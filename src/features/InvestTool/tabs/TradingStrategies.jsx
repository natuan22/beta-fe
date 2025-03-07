import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Checkbox } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { PiChartLineUpBold } from "react-icons/pi";
import StrategyMA from "./TradingStrategies/components/StrategyMA";
import StrategyMAVVIP from "./TradingStrategies/components/StrategyMAVVIP";
import { selectTradingStrategy } from "./TradingStrategies/utils/hashTb";
import "./TradingStrategies/utils/styles/cssDatePicker.css";

const theme = createTheme({
  palette: {
    primary: {
      light: "#25558d",
      main: "#096CB7",
      dark: "#0761a6",
    },
  },
});

const TradingStrategies = () => {
  const [role, setRole] = useState(
    localStorage.getItem(process.env.REACT_APP_USER_ROLE)
  );

  const [selectedStrategy, setSelectedStrategy] = useState("");
  const [selectedMainCategory, setSelectedMainCategory] = useState("");

  const handleMainCategoryChange = (key) => {
    setSelectedMainCategory((prev) => (prev === key ? "" : key));
    setSelectedStrategy("");
  };

  const handleStrategyChange = (key) => {
    setSelectedStrategy((prev) => (prev === key ? "" : key));
  };

  useEffect(() => {
    document.title = `B-Info | Chiến lược giao dịch`;
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="container mx-auto md:w-[90%] lg:w-[90%] xl:w-[90%] 2xl:w-full pt-2 font-[Roboto]">
        <div className="xl:flex lg:block">
          <div className="xl:w-[25%] lg:w-full m-2 border-[#0050AD] border-solid border-[2px] h-fit">
            <div className="uppercase text-[#0050AD] font-semibold text-[18px] text-center mt-1">
              Chọn chiến lược giao dịch
            </div>
            <div className="px-4">
              {Object.keys(selectTradingStrategy).map((key, mainIndex) => (
                <div key={mainIndex}>
                  <Checkbox
                    className="font-bold text-[16px]"
                    checked={selectedMainCategory === key}
                    onChange={() => handleMainCategoryChange(key)}
                  >
                    <span className="dark:text-white text-black">{key}</span>
                  </Checkbox>
                  {selectedMainCategory === key &&
                    selectTradingStrategy[key]
                      .filter((strategy) => {
                        if (
                          role === process.env.REACT_APP_ADMIN ||
                          role === process.env.REACT_APP_PREMIUM_USER
                        ) {
                          // Show both "MA VVIP" and "MA đại pháp"
                          return true;
                        } else {
                          // Show only "MA đại pháp"
                          return strategy.name !== "MA VVIP";
                        }
                      })
                      .map((strategy, strategyIndex) => (
                        <div key={strategyIndex} className="pl-4">
                          <Checkbox
                            checked={selectedStrategy === strategy.key}
                            value={strategy.key}
                            onChange={() => handleStrategyChange(strategy.key)}
                          >
                            <span className="dark:text-white text-black">
                              {strategy.name === "MA VVIP"
                                ? "MA VVIP"
                                : strategy.name}
                            </span>
                          </Checkbox>
                        </div>
                      ))}
                </div>
              ))}
            </div>
          </div>

          <div className="xl:w-[75%] lg:w-full m-2">
            <AnimatePresence>
              {selectedStrategy === "" && (
                <motion.div
                  className="grid place-content-center h-[577px] font-medium text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <div className="flex flex-col justify-center items-center bg-[#D6EBFF] bg-opacity-70 w-[500px] h-[250px] border-solid border-[#0669FC] border-opacity-20 rounded-[25px] mr-[300px]">
                    <PiChartLineUpBold className="w-[60px] h-[60px]" />
                    <div className="p-7">
                      Xin chào quý nhà đầu tư
                      <span className="font-bold"></span>
                    </div>
                    <div>Vui lòng chọn chiến lược giao dịch</div>
                  </div>
                </motion.div>
              )}
              {selectedStrategy === "StrategyMAVip" && (
                <motion.div
                  key="StrategyMAVip"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <StrategyMAVVIP />
                </motion.div>
              )}
              {selectedStrategy === "StrategyMA" && (
                <motion.div
                  key="StrategyMA"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <StrategyMA />
                </motion.div>
              )}
              {selectedStrategy === "2" && (
                <motion.div
                  key="2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  2
                </motion.div>
              )}
              {selectedStrategy === "3" && (
                <motion.div
                  key="3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  3
                </motion.div>
              )}
              {selectedStrategy === "4" && (
                <motion.div
                  key="4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  4
                </motion.div>
              )}
              {selectedStrategy === "5" && (
                <motion.div
                  key="5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  5
                </motion.div>
              )}
              {selectedStrategy === "6" && (
                <motion.div
                  key="6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  6
                </motion.div>
              )}
              {selectedStrategy === "7" && (
                <motion.div
                  key="7"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  7
                </motion.div>
              )}
              {selectedStrategy === "8" && (
                <motion.div
                  key="8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  8
                </motion.div>
              )}
              {selectedStrategy === "9" && (
                <motion.div
                  key="9"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  9
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default TradingStrategies;
