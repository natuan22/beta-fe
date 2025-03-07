import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../Chart/utils/Loading";
import { fetchDataSameIndustry } from "../../thunk";
import "../../utils/style/antDesignTableStock.css";
import formatNumberCurrency from "../../../../helper/formatNumberCurrency";
const SameIndustry = ({ queryApi }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const { dataSameIndustry } = useSelector((state) => state.stock);

  useEffect(() => {
    dispatch(fetchDataSameIndustry(queryApi.stock, queryApi.exchange));
  }, [dispatch, queryApi]);

  useEffect(() => {
    // Hàm thêm style trực tiếp vào các phần tử có class 'ant-dropdown'
    const applyCustomStyles = () => {
      const dropdowns = document.querySelectorAll(".ant-dropdown-menu-light");
      dropdowns.forEach((dropdown) => {
        dropdown.style.removeProperty("background-color");
        // Áp dụng các style trực tiếp nếu chưa có
        if (!dropdown.style.getPropertyValue("inset")) {
          dropdown.style.setProperty("background-color", "white", "important");
        }
      });
    };

    // Gọi hàm applyCustomStyles lần đầu tiên khi component mount
    applyCustomStyles();

    // Nếu bạn muốn lắng nghe sự thay đổi DOM (khi phần tử mới xuất hiện)
    const observer = new MutationObserver(applyCustomStyles);
    observer.observe(document.body, { childList: true, subtree: true });

    // Dọn dẹp observer và xóa style khi component unmount
    return () => {
      const dropdowns = document.querySelectorAll(".ant-dropdown-menu-light");
      dropdowns.forEach((dropdown) => {
        // Xóa style khi component unmount
        dropdown.style.removeProperty("background-color");
      });
      // Dừng việc quan sát DOM khi component unmount
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (dataSameIndustry) {
      const dataWithKey =
        Array.isArray(dataSameIndustry) &&
        dataSameIndustry?.map((item, index) => ({
          ...item,
          key: index,
        }));
      setData(dataWithKey);
    }
  }, [dataSameIndustry]);

  const mappedData =
    Array.isArray(dataSameIndustry) &&
    dataSameIndustry?.map((item) => ({
      text: item.code,
      value: item.code,
    }));

  const columns = [
    {
      title: "Mã CK",
      dataIndex: "code",
      align: "center",
      filters: mappedData,
      filterSearch: true,
      onFilter: (value, record) => record.code.includes(value),
      render: (_, record) => {
        return (
          <p className={`dark:text-white text-black text-center font-semibold`}>
            {record.code}
          </p>
        );
      },
    },
    {
      title: "Giá",
      dataIndex: "closePrice",
      align: "center",
      render: (_, record) => {
        return (
          <p className={`dark:text-white text-black text-center font-semibold`}>
            {record.closePrice === 0
              ? "-"
              : (record.closePrice * 1000).toLocaleString("vi-VN", {
                  maximumFractionDigits: 2,
                })}
          </p>
        );
      },
      sorter: (a, b) => a.closePrice - b.closePrice,
    },
    {
      title: "Khối lượng",
      dataIndex: "kl",
      align: "center",
      render: (_, record) => {
        return (
          <p className={`dark:text-white text-black text-center font-semibold`}>
            {record.kl === 0 ? "-" : formatNumberCurrency(record.kl)}
          </p>
        );
      },
      sorter: (a, b) => a.kl - b.kl,
    },
    {
      title: "P/E",
      dataIndex: "pe",
      align: "center",
      render: (_, record) => {
        return (
          <p className={`dark:text-white text-black text-center font-semibold`}>
            {record.pe === 0
              ? "-"
              : record.pe.toLocaleString("vi-VN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
          </p>
        );
      },
      sorter: (a, b) => a.pe - b.pe,
    },
    {
      title: "P/B",
      dataIndex: "pb",
      align: "center",
      render: (_, record) => {
        return (
          <p className={`dark:text-white text-black text-center font-semibold`}>
            {record.pb === 0
              ? "-"
              : record.pb.toLocaleString("vi-VN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
          </p>
        );
      },
      sorter: (a, b) => a.pb - b.pb,
    },
    {
      title: "Vốn hoá",
      dataIndex: "vh",
      align: "center",
      render: (_, record) => {
        return (
          <p className={`dark:text-white text-black text-center font-semibold`}>
            {record.vh === 0
              ? "-"
              : formatNumberCurrency(record.vh / 1000000000)}
          </p>
        );
      },
      sorter: (a, b) => a.vh - b.vh,
    },
  ];

  return (
    <div>
      {Array.isArray(data) ? (
        <div className="mt-4 md:h-[620px] sm:h-[670px] xs:h-[670px] xxs:h-[670px]">
          <Table
            scroll={{ x: 400 }}
            rowClassName="pointer-events-none"
            bordered={false}
            columns={columns}
            dataSource={data}
            className="table-stock-detail table-stock-sameIndustry"
            pagination={{ defaultPageSize: 9, showSizeChanger: false }}
          />
        </div>
      ) : (
        <div className="h-[620px] flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default SameIndustry;
