import React, { useEffect, useState } from "react";
import ExportAndImportTransferChart from "./ExportAndImportTransferChart";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataMapImportAndExport } from "../../thunk";
import Loading from "../../../Chart/utils/Loading";

const ExportAndImportTransfer = () => {
  const { dataMapExImport } = useSelector((state) => state.macro);
  const dispatch = useDispatch();
  const [queryApi, setQueryApi] = useState({
    order: "0",
    type: "0",
  });
  useEffect(() => {
    dispatch(fetchDataMapImportAndExport(queryApi.order, queryApi.type));
  }, [queryApi, dispatch]);
  const handleOnchangeTime = (order) => {
    setQueryApi((prev) => ({ ...prev, order }));
  };
  const handleOnchangeType = (type) => {
    setQueryApi((prev) => ({ ...prev, type }));
  };
  return (
    <div>
      <div className="md:flex sm:block items-center justify-between border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0">
        <span className="dark:text-white text-black font-semibold sm:text-base xs:text-[15px] xxs:text-[12px]">
          Lưu chuyển xuất nhập khẩu một số thị trường chính
        </span>
        <div className="flex items-center justify-center">
          <select
            className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0`}
            onChange={(e) => {
              handleOnchangeTime(e.target.value);
            }}
          >
            <option value={"0"}>Tháng</option>
            <option value={"1"}>Quý</option>
            <option value={"2"}>Năm</option>
          </select>
          <select
            className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0 ml-2`}
            onChange={(e) => {
              handleOnchangeType(e.target.value);
              localStorage.setItem("typeTransfer", e.target.value);
            }}
          >
            <option value={"0"}>Xuất khẩu</option>
            <option value={"1"}>Nhập khẩu</option>
          </select>
        </div>
      </div>
      <div>
        {dataMapExImport?.length > 0 ? (
          <ExportAndImportTransferChart dataMapExImport={dataMapExImport} />
        ) : (
          <div className="h-[335px] flex items-center justify-center">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportAndImportTransfer;
