import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { FaArrowUp, FaAngleUp } from "react-icons/fa";
import "./utils/backToTop.scss";
import { useLocation } from "react-router-dom";
import socket from "../features/Chart/utils/socket";
import { specificKeys, specificKeysV2 } from "../features/InvestTool/components/SignalWarning/utils/hashTb";
import { getModifiedSignalName, getModifiedSignalNameRsiOrMA, getSignalNameByKey } from "../helper/modifiedSignalName";
import { stockGr } from "../features/InvestTool/components/SignalWarning/utils/stock-gr";
import { notification } from "antd";
import { getApi } from "../helper/getApi";
const LayOut = (props) => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const scriptZalo = document.createElement("script");
    scriptZalo.src = "https://sp.zalo.me/plugins/sdk.js";
    document.body.appendChild(scriptZalo);

    return () => {
      document.body.removeChild(scriptZalo);
    };
  }, []);

  const [isLogin, setIsLogin] = useState(localStorage.getItem(process.env.REACT_APP_IS_LG));
  const location = useLocation();

  const [yourSignalWarningsPopup, setYourSignalWarningsPopup] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    if (location.pathname !== "/cong-cu-dau-tu/danh-muc-theo-doi" && location.pathname !== "/cong-cu-dau-tu/canh-bao-tin-hieu" && isLogin === process.env.REACT_APP_LG_T) {
      const fetchDataYourSignalWarnings = async () => {
        try {
          const data = await getApi("/api/v1/signal-warning/your-signal");
          const filteredSignals = data.filter((item) => item.value.popupNotification === true);

          setYourSignalWarningsPopup(filteredSignals);
        } catch (error) {
          console.error(error);
        }
      };

      const fetchData = async () => {
        try {
          const data = await getApi("/api/v1/signal-warning");

          setData(data);
          setSocketConnected(true);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
      fetchDataYourSignalWarnings();
    }
  }, [isLogin, location.pathname]);

  const [api, contextHolder] = notification.useNotification({ stack: { threshold: 7 } });

  const openNotification = (description) => {
    api.open({
      message: `${description.code}`,
      description: `${description.nameByKey}`,
      placement: "topRight",
      showProgress: true,
    });
  };

  const fetchStockGroup = (group) => {
    const groupData = stockGr.find((item) => item.name === group);
    return groupData ? groupData.data : [];
  };

  const prepareValidCodes = (scopes) => {
    const relevantScopes = scopes.filter((scope) => ["VNDIAMOND", "VNFINLEAD"].includes(scope));
    if (relevantScopes.length > 0) {
      const codesArray = relevantScopes.map(fetchStockGroup);
      return codesArray.flat();
    }
    return [];
  };

  const filterDataBySignalWarnings = (dataItem, yourSignalWarnings) => {
    const validCodes = prepareValidCodes(yourSignalWarnings.flatMap((signal) => signal.value.scope || []));

    return yourSignalWarnings.flatMap((signal) => {
      const { value } = signal;

      const isLongShortSMA = ["sma_ngan_han_cat_len_sma_dai_han", "sma_ngan_han_cat_xuong_sma_dai_han"].includes(value.key);
      const isRsiOrMa = ["gia_hien_tai_cat_len_ma", "gia_hien_tai_cat_xuong_ma", "gia_hien_tai_cat_len_ema", "gia_hien_tai_cat_xuong_ema", "rsi_di_vao_vung_qua_mua_", "rsi_thoat_khoi_vung_qua_mua_", "rsi_thoat_khoi_vung_qua_ban_", "rsi_di_vao_vung_qua_ban_"].includes(value.key);

      const nameByKey = isLongShortSMA
        ? getModifiedSignalName(value.key, value.value)
        : isRsiOrMa
        ? getModifiedSignalNameRsiOrMA(value.key, value.value)
        : getSignalNameByKey(value.key);

      const isValidKey = (() => {
        if (specificKeysV2.includes(value.key)) {
          if (specificKeys.includes(value.key)) {
            return dataItem[`${value.key}${value.value}`] === 1;
          } else {
            return dataItem[value.key]?.[value.value] === 1;
          }
        }
        return dataItem[value.key] === 1;
      })();

      const isValidScope = (() => {
        if (!value.scope.length || value.scope.includes("ALL")) return true;

        const floorScopes = value.scope.filter((scope) => ["HOSE", "HNX", "UPCOM"].includes(scope));
        const stockGroupScopes = value.scope.filter((scope) => ["VNDIAMOND", "VNFINLEAD"].includes(scope));

        if (floorScopes.length && floorScopes.includes(dataItem.floor)) return true;
        if (stockGroupScopes.length && validCodes.includes(dataItem.code)) return true;
        if (value.scope.includes("VN30") && value.scope.includes(dataItem.indexCode)) return true;
        if (value.scope.includes("watchlists") && value.codes.includes(dataItem.code)) return true;

        return false;
      })();

      const isValidMarketCap = (() => {
        if (!value.marketCap || value.marketCap === "0") return true;

        const [operator, threshold] = value.marketCap.split(" ");
        const numericThreshold = parseFloat(threshold);
        if (!numericThreshold) return true;

        if (operator === ">") return dataItem.marketCap > numericThreshold;
        if (operator === "<") return dataItem.marketCap < numericThreshold;
        return true;
      })();

      const isValidLiquidity = (() => {
        if (!value.liquidity || value.liquidity === "0") return true;

        const [key, threshold] = value.liquidity.split(" ");
        const numericThreshold = parseFloat(threshold);
        if (!numericThreshold) return true;

        return dataItem[key] >= numericThreshold;
      })();

      if (isValidKey && isValidScope && isValidMarketCap && isValidLiquidity) {
        return { ...dataItem, nameByKey, value };
      }

      return null;
    }).filter(Boolean);
  };

  useEffect(() => {
    if (
      location.pathname === "/cong-cu-dau-tu/danh-muc-theo-doi" ||
      location.pathname === "/cong-cu-dau-tu/canh-bao-tin-hieu" ||
      !socketConnected ||
      yourSignalWarningsPopup?.length === 0
    ) {
      return;
    }

    const initialHandler = (response) => {
      if (response?.message === "Client registered for signal-warning.") {
        socket.on("signal-warning-response", handleSignalWarning);
      }
    };

    // Xử lý dữ liệu khi có tín hiệu từ server
    const handleSignalWarning = (receivedData) => {
      const result = filterDataBySignalWarnings(receivedData?.data?.[0], yourSignalWarningsPopup);
      if (result.length === 0) return;
  
      setData((prevData) => {
        const newData = prevData.map((item) => {
          if (item.code !== result[0].code) return item;
  
          const { key, value } = result[0].value;
          const getValue = (dataItem) =>
            specificKeysV2.includes(key)
              ? specificKeys.includes(key)
                ? dataItem?.[`${key}${value}`]
                : dataItem?.[key]?.[value]
              : dataItem?.[key];
  
          const oldValue = getValue(item);
          const newValue = getValue(result[0]);
  
          if (oldValue === 0 && newValue === 1) {
            openNotification(result[0]);
          }
  
          return { ...item, ...result[0] };
        });
  
        return newData;
      });
    };
  
    socket.on("signal-warning-response", initialHandler);
    socket.emit("signal-warning", { message: "signal-emit" });
  
    return () => {
      socket.off("signal-warning-response", initialHandler);
      socket.off("signal-warning-response", handleSignalWarning);
    };
  }, [socketConnected, yourSignalWarningsPopup, location.pathname]);

  return (
    <div className="relative">
      {contextHolder}
      <header className="sticky top-0 z-40">
        <Header />
      </header>
      <section className="relative">{props.children}</section>
      {showScrollButton && (
        <div className="btnBackToTop-container z-30 fixed bottom-[120px] md:right-[66px] sm:right-[35px] xs:right-[30px] xxs:right-[30px] opacity-80 transition-all duration-500 hover:opacity-100">
          <button
            style={{ backgroundColor: "orange" }}
            className="cursor-pointer text-xl text-white rounded-full border-0 z-30 px-2 py-1 bg-transparent"
            onClick={handleScrollToTop}
          >
            <FaArrowUp />
          </button>
          <div className="icon-container text-white z-[-1] absolute right-[10%] xxs:hidden">
            <div className="flex flex-col justify-center items-center relative translate-x-[-14px] ">
              <FaAngleUp className="icon-1 text-xl absolute bottom-0" />
              <FaAngleUp className="icon-2 text-2xl absolute bottom-0" />
              <FaAngleUp className="icon-3 text-3xl absolute bottom-0" />
            </div>
          </div>
        </div>
      )}
      <div
        className="zalo-chat-widget !bottom-[52px] md:!right-[52px] sm:!right-[25px] xs:!right-[20px] xxs:!right-[20px]"
        data-oaid="1623670409453822014"
        data-welcome-message="Rất vui khi được hỗ trợ bạn!"
        data-autopopup="0"
        data-width="300"
        data-height="300"
      ></div>
    </div>
  );
};

export default LayOut;
