import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../Chart/utils/Loading";
import { getColor } from "../../../Chart/utils/utils";
import { fetchDataExchangeRateIndex } from "../../thunk";
import "../../utils/style/antDesTable.css";
const ExchangeRateIndex = () => {
  const dispatch = useDispatch();
  const { dataExchangeRateIndex } = useSelector((state) => state.macro);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(fetchDataExchangeRateIndex);
  }, [dispatch]);

  useEffect(() => {
    if (dataExchangeRateIndex) {
      const dataWithKey =
        Array.isArray(dataExchangeRateIndex) &&
        dataExchangeRateIndex?.map((item, index) => ({
          ...item,
          key: index,
        }));
      setData(dataWithKey);
    }
  }, [dataExchangeRateIndex]);

  const columns = [
    {
      title: "Tỷ giá",
      dataIndex: "name",
      render: (_, record) => {
        return (
          <p className={`dark:text-white text-black font-semibold`}>
            {record.name}
          </p>
        );
      },
    },
    {
      title: "Giá trị hiện tại",
      dataIndex: "day_price",
      render: (_, record) => {
        return (
          <p
            className={`${getColor(
              record.day_change,
            )} text-center font-semibold`}
          >
            {record.day_price.toLocaleString("vi-VN", {
              maximumFractionDigits: 2,
            })}
          </p>
        );
      },
    },
    {
      title: "Thay đổi gần nhất",
      dataIndex: "day_change",
      render: (_, record) => {
        return (
          <p
            className={`${getColor(
              record.day_change,
            )} text-center font-semibold`}
          >
            {record.day_change.toLocaleString("vi-VN", {
              maximumFractionDigits: 2,
            })}
            %
          </p>
        );
      },
    },
    {
      title: "Bình quân trong tháng",
      dataIndex: "month_price",
      render: (_, record) => {
        // Thực hiện tính toán dựa trên dữ liệu và trả về giá trị tùy chỉnh
        return (
          <p
            className={`${getColor(
              record.month_change,
            )} text-center font-semibold`}
          >
            {record.month_price.toLocaleString("vi-VN", {
              maximumFractionDigits: 2,
            })}
          </p>
        );
      },
    },
    {
      title: "Bình quân trong quý",
      dataIndex: "quarter_price",
      render: (_, record) => {
        return (
          <p
            className={`${getColor(
              record.quarter_change,
            )} text-center font-semibold`}
          >
            {record.quarter_price.toLocaleString("vi-VN", {
              maximumFractionDigits: 2,
            })}
          </p>
        );
      },
    },
    {
      title: "Bình quân trong năm",
      dataIndex: "year_price",
      render: (_, record) => {
        return (
          <p
            className={`${getColor(
              record.year_change,
            )} text-center font-semibold`}
          >
            {record.year_price.toLocaleString("vi-VN", {
              maximumFractionDigits: 2,
            })}
          </p>
        );
      },
    },
  ];

  return (
    <div>
      {Array.isArray(data) ? (
        <div className="mt-2">
          <Table
            scroll={{ x: 400 }}
            rowClassName="pointer-events-none "
            bordered={false}
            columns={columns}
            dataSource={data}
            pagination={{ defaultPageSize: 5, showSizeChanger: false }}
            className="tableIndex"
          />
        </div>
      ) : (
        <div className="h-[300px] flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default ExchangeRateIndex;
