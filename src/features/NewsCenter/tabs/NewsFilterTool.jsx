import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import React, { useEffect, useState } from "react";
import {
  BsArrowRepeat,
  BsCardList,
  BsFileEarmarkX,
  BsXOctagonFill,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Chart/utils/Loading";
import ListNewsFilter from "../components/NewsFilterTool/ListNewsFilter";
import { fetchDataStockInfo, fetchNewsTool } from "../thunk";
import "../utils/styles/buttonFilter.css";
import "../utils/styles/buttonNews.css";
import { notification } from "antd";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const NewsFilterTool = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { newsTool, dataStockInfo } = useSelector((state) => state.newsCenter);
  const [selectedExchange, setSelectedExchange] = useState(null);
  const [selectedLV2, setSelectedLV2] = useState([]);
  const [selectedLV4, setSelectedLV4] = useState([]);
  const [selectedCode, setSelectedCode] = useState([]);
  const [codeTranmission, setCodeTranmission] = useState("all");
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message, description) => {
    api.open({
      type: "success",
      message,
      description,
      placement: "topRight",
      showProgress: true,
    });
  };

  useEffect(() => {
    document.title = `B-Info | Bộ lọc tin tức`;
  }, []);
  useEffect(() => {
    dispatch(fetchNewsTool);
    dispatch(fetchDataStockInfo);
  }, [dispatch]);

  const handleFilterExchange = (e) => {
    const exchangeName = e.target.value;
    setSelectedExchange(exchangeName);
    setSelectedLV2([]);
    setSelectedLV4([]);
  };

  const handleFilterLV2 = (lv2Name) => {
    if (selectedLV2.includes(lv2Name)) {
      setSelectedLV2(selectedLV2.filter((name) => name !== lv2Name));
      setSelectedLV4([]);
    } else {
      setSelectedLV2([...selectedLV2, lv2Name]);
    }
  };

  const handleFilterLV4 = (lv4Name) => {
    if (selectedLV4.includes(lv4Name)) {
      setSelectedLV4(selectedLV4.filter((name) => name !== lv4Name));
    } else {
      setSelectedLV4([...selectedLV4, lv4Name]);
    }
  };

  const handleBtnCode = (code) => {
    const stockCodes = dataStockInfo.filter((stock) => stock.code === code);
    setSelectedCode([...selectedCode, ...stockCodes]);
  };
  const handleBtnDel = (code) => {
    setSelectedCode(selectedCode.filter((stock) => stock.code !== code));
    setSelectedLV4([...selectedLV4, code]);
  };
  const handleBtnDelAll = () => {
    setSelectedLV4([
      ...selectedLV4,
      ...selectedCode.map((stock) => stock.code),
    ]);
    setSelectedCode([]);
    setCodeTranmission("all");
  };

  const isCodeSelected = (code) => {
    return selectedCode.some((stock) => stock.code === code);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApply = () => {
    setOpen(false);

    setCodeTranmission(selectedCode?.map((item) => item.code).toString());

    openNotification("Áp dụng bộ lọc thành công", "Tin tức đã được lọc");
  };

  
  return (
    <div className="container mx-auto md:w-[90%] lg:w-[90%] xl:w-[90%] 2xl:w-full pt-2">
      {contextHolder}
      <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
        <button className="Btn" onClick={handleClickOpen}>
          <span className="text">Bộ lọc tin tức</span>
          <span className="svgIcon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
            </svg>
          </span>
        </button>
        <Dialog
          fullW
          idth
          maxWidth="xl"
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Bộ lọc tin tức"}</DialogTitle>
          <DialogContent>
            <div>
              {newsTool?.length > 0 ? (
                <div className="bg-[#151924]">
                  <div
                    className="p-2 grid xl:grid-cols-10 lg:grid-cols-5 md:grid-cols-none gap-y-3"
                    style={{ borderBottom: "solid 1px grey" }}
                  >
                    <div
                      className="exchange__tabs flex flex-col"
                      style={{
                        borderRight: "solid 1px gray",
                        borderTop: "solid 3px #147df5",
                      }}
                    >
                      <div
                        className="bg-[#04013d] w-[100%]"
                        style={{ borderBottom: "solid 1px grey" }}
                      >
                        <p className="text-white font-semibold text-base text-center ">
                          Chọn sàn
                        </p>
                      </div>
                      <div className="h-[150px]">
                        {newsTool.map((exchange, index) => (
                          <div key={index}>
                            <label className="material-checkbox py-2 text-white ">
                              <input
                                type="checkbox"
                                name="exchange"
                                value={exchange.name}
                                id={exchange.name}
                                checked={selectedExchange === exchange.name}
                                onChange={handleFilterExchange}
                              />
                              <span className="checkmark"></span>
                              <span className="text-sm">{exchange.name}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div
                      className="relative industryLv2__tabs overflow-auto scrollbar-thin scrollbar-thumb-[#0050AD] dark:scrollbar-track-[#151924] scrollbar-track-transparent ml-1 lg:col-span-2 md:col-span-full"
                      style={{
                        borderRight: "solid 1px gray",
                        borderTop: "solid 3px #147df5",
                      }}
                    >
                      <div
                        className="sticky top-0 bg-[#04013d] z-10 "
                        style={{ borderBottom: "solid 1px grey" }}
                      >
                        <p className="text-white text-base font-semibold  text-center">
                          Nhóm ngành (ICBID LV2)
                        </p>
                      </div>
                      <div className="h-[300px]">
                        {selectedExchange ? (
                          <div>
                            {selectedExchange &&
                              newsTool
                                .find(
                                  (exchange) =>
                                    exchange.name === selectedExchange,
                                )
                                .LV2.map((lv2, index) => (
                                  <div key={index}>
                                    <label className="material-checkbox py-2 text-white ">
                                      <input
                                        type="checkbox"
                                        name="exchange"
                                        value={lv2.name}
                                        id={lv2.name}
                                        checked={selectedLV2.includes(lv2.name)}
                                        onChange={() =>
                                          handleFilterLV2(lv2.name)
                                        }
                                      />
                                      <span className="checkmark"></span>
                                      <span className="text-sm">
                                        {lv2.name}
                                      </span>
                                    </label>
                                  </div>
                                ))}
                          </div>
                        ) : (
                          <div className="grid place-items-center mt-5">
                            <p className="text-white font-semibold text-base">
                              Vui lòng chọn sàn để tiếp tục
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      className="industryLv4__tabs overflow-auto scrollbar-thin scrollbar-thumb-[#0050AD] dark:scrollbar-track-[#151924] scrollbar-track-transparent ml-2 lg:col-span-2 md:col-span-full"
                      style={{
                        borderRight: "solid 1px gray",
                        borderTop: "solid 3px #147df5",
                      }}
                    >
                      <div
                        className="sticky top-0 bg-[#04013d] z-10 "
                        style={{ borderBottom: "solid 1px grey" }}
                      >
                        <p className="text-white text-base font-semibold text-center ">
                          Ngành nghề (ICBID LV4)
                        </p>
                      </div>

                      <div className="h-[300px]">
                        {selectedLV2.length > 0 &&
                          newsTool
                            .find(
                              (exchange) => exchange.name === selectedExchange,
                            )
                            .LV2.filter((lv2) => selectedLV2.includes(lv2.name))
                            .map((lv2) => lv2.LV4)
                            .flat()
                            .map((lv4, index) => (
                              <div key={index}>
                                <label className="material-checkbox py-2 text-white ">
                                  <input
                                    type="checkbox"
                                    name="exchange"
                                    value={lv4.name}
                                    id={lv4.name}
                                    checked={selectedLV4.includes(lv4.name)}
                                    onChange={() => handleFilterLV4(lv4.name)}
                                  />
                                  <span className="checkmark"></span>
                                  <span className="text-sm">{lv4.name}</span>
                                </label>
                              </div>
                            ))}
                      </div>
                    </div>

                    <div
                      className="code__tabs overflow-auto scrollbar-thin scrollbar-thumb-[#0050AD] dark:scrollbar-track-[#151924] scrollbar-track-transparent  ml-2 lg:col-span-2 md:col-span-full"
                      style={{
                        borderRight: "solid 1px gray",
                        borderTop: "solid 3px #147df5",
                      }}
                    >
                      <div
                        className="sticky top-0 bg-[#04013d] z-10 "
                        style={{ borderBottom: "solid 1px grey" }}
                      >
                        <p className="text-white text-base font-semibold text-center ">
                          Mã cổ phiếu
                        </p>
                      </div>
                      <div className="h-[300px]">
                        {selectedLV4.length > 0 &&
                          newsTool
                            .find(
                              (exchange) => exchange.name === selectedExchange,
                            )
                            .LV2.filter((lv2) => selectedLV2.includes(lv2.name))
                            .flatMap((lv2) => lv2.LV4)
                            .filter((lv4) => selectedLV4.includes(lv4.name))
                            .map((lv4) => (
                              <div key={lv4.name} className="flex flex-col ">
                                {lv4.code.map(
                                  (code, index) =>
                                    !isCodeSelected(code) && ( // Kiểm tra xem mã code đã được chọn chưa
                                      <div
                                        key={index}
                                        className="flex flex-col justify-center items-center"
                                      >
                                        <button
                                          onClick={() => handleBtnCode(code)}
                                          type="button"
                                          className="buttonNews"
                                        >
                                          <span className="buttonNews__text">
                                            {code}
                                          </span>
                                          <span className="buttonNews__icon">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              viewBox="0 0 24 24"
                                              strokeWidth="2"
                                              strokeLinejoin="round"
                                              strokeLinecap="round"
                                              stroke="currentColor"
                                              height="24"
                                              fill="none"
                                              className="svg"
                                            >
                                              <line
                                                y2="19"
                                                y1="5"
                                                x2="12"
                                                x1="12"
                                              ></line>
                                              <line
                                                y2="12"
                                                y1="12"
                                                x2="19"
                                                x1="5"
                                              ></line>
                                            </svg>
                                          </span>
                                        </button>
                                      </div>
                                    ),
                                )}
                              </div>
                            ))}
                      </div>
                    </div>

                    <div
                      className="relative watchList__tabs ml-2 overflow-auto scrollbar-thin scrollbar-thumb-[#0050AD] dark:scrollbar-track-[#151924] scrollbar-track-transparent lg:col-span-3 md:col-span-full"
                      style={{
                        borderRight: "solid 1px gray",
                        borderTop: "solid 3px #147df5",
                      }}
                    >
                      <div
                        className="watchList__tabs-header sticky top-0 flex justify-around text-white bg-[#04013d] p-1"
                        style={{ borderBottom: "solid 1px grey" }}
                      >
                        <div className="">
                          <button className="text-xs px-2 py-1 flex items-center  cursor-pointer  rounded-full border-0 font-semibold">
                            <span>Lưu vào Watchlist</span>
                            <BsCardList className="ml-1" />
                          </button>
                        </div>
                        <div>
                          <button 
                            onClick={() => { setOpen(false); setCodeTranmission("all"); openNotification("Tải lại tin tức", "Tin tức đã được tải lại")}}
                            className="text-xs px-2 py-1  flex items-center cursor-pointer  rounded-full border-0 font-semibold"
                          >
                            <span>Tải lại tin tức</span>
                            <BsArrowRepeat className="ml-1" />
                          </button>
                        </div>
                        <div>
                          <button
                            onClick={handleBtnDelAll}
                            className="btnDelAll text-xs px-2 py-1 flex items-center  cursor-pointer  rounded-full border-0"
                          >
                            <span>Xóa tất cả </span>
                            <BsFileEarmarkX className="ml-1" />
                          </button>
                        </div>
                      </div>
                      <div className="watchList__tabs-body p-2 h-[300px]">
                        {selectedCode?.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className={`${
                                (index + 1) % 2 === 0
                                  ? "bg-[#04013d]"
                                  : "bg-[#023e8a]"
                              }  p-1 text-white`}
                              style={{
                                display: "grid",
                                gridTemplateColumns: "0.5fr 2fr 0.5fr",
                                gap: "5px",
                              }}
                            >
                              <div className="code text-sm ">{item.code}</div>
                              <div className="nameCompany ml-1 text-sm text-center">
                                {item.name}
                              </div>
                              <div
                                onClick={() => handleBtnDel(item.code)}
                                className="btnDel grid place-items-center text-center text-red-500 font-bold cursor-pointer"
                              >
                                <BsXOctagonFill />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-[50%] flex flex-col justify-center">
                  <Loading />
                </div>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Đóng</Button>
            <Button onClick={handleApply}>Áp dụng bộ lọc</Button>
          </DialogActions>
        </Dialog>
        <div className="mt-2">
          <ListNewsFilter codeTranmission={codeTranmission} />
        </div>
      </div>
    </div>
  );
};

export default NewsFilterTool;
