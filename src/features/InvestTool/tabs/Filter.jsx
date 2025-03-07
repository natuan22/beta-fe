import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { FiFilePlus } from "react-icons/fi";
import { getApi } from "../../../helper/getApi";
import "../../../utils/style/skeletonLoading.css";
import AddCodeToWatchlist from "./Filter/components/AddCodeToWatchlist";
import ComponentConditions from "./Filter/components/ComponentConditions";
import DialogAddConditions from "./Filter/components/DialogAddConditions";
import ListFilters from "./Filter/components/ListFilters";
import SaveFilter from "./Filter/components/SaveFilter";
import TableResultsFilter from "./Filter/components/TableResultsFilter";
import "./Filter/components/styles/styleLoading.css";
import { hashTbStockFilter } from "./Filter/utils/hashTb";

const flatFilter = Object.values(hashTbStockFilter).flat();

const theme = createTheme({
  palette: {
    mau: {
      light: "#25558d",
      main: "#0D4381",
      dark: "#0b3c74",
    },
    xanh: {
      light: "#a9c7f5",
      main: "#9DC4FF",
      dark: "##647ca1",
    },
  },
});

const Filter = () => {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem(process.env.REACT_APP_IS_LG)
  );

  const [selectedItems, setSelectedItems] = useState([
    "floor",
    "gia_hien_tai_cat_len_ma",
    "PE",
    "marketCap",
    "totalVol",
  ]);
  const [components, setComponents] = useState([]);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filteredResults, setFilteredResults] = useState([]);
  const [totalFilteredData, setTotalFilteredData] = useState([]);
  const [watchlists, setWatchlists] = useState();
  const [filteredDataMap, setFilteredDataMap] = useState({});
  const [selectParameters, setSelectParameters] = useState("5d");
  const [filters, setFilters] = useState();
  const [filtersActive, setFiltersActive] = useState("");

  useEffect(() => {
    document.title = `B-Info | Bộ lọc cổ phiếu`;
  }, []);
  
  useEffect(() => {
    if (isLogin === process.env.REACT_APP_LG_T) {
      const fetchDataWatchList = async () => {
        try {
          const data = await getApi("/api/v1/watchlist");

          setWatchlists(data);
        } catch (error) {
          console.error(error);
        }
      };

      const fetchDataFilters = async () => {
        try {
          const data = await getApi("/api/v1/investment/your-filter");

          setFilters(data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchDataFilters();
      fetchDataWatchList();
    }
  }, [isLogin]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getApi("/api/v1/filter");
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const initialComponents = selectedItems
      .map((itemKey) => {
        const filter = flatFilter.find((f) => f.key === itemKey);
        if (filter) {
          return (
            <ComponentConditions
              handleFilterData={handleFilterData}
              data={data}
              isLogin={isLogin}
              itemKey={itemKey}
              filter={filter}
              handleDelKey={handleDelKey}
              watchlists={watchlists}
              onHandleSelectParameters={handleSelectParameters}
              filteredData={filteredDataMap[itemKey] || []}
            />
          );
        }
        return null;
      })
      .filter((component) => component !== null);
    setComponents(initialComponents);
  }, [selectedItems, data, isLogin, watchlists, filteredDataMap]);

  const handleCheckboxChange = (itemKey, isChecked) => {
    setSelectedItems((prevItems) => {
      if (isChecked) {
        return [...prevItems, itemKey];
      } else {
        return prevItems.filter((item) => item !== itemKey);
      }
    });

    setTotalFilteredData((prevResults) =>
      prevResults.filter((result) => result.key !== itemKey)
    );

    setFilteredDataMap((prevDataMap) => {
      const newDataMap = { ...prevDataMap };
      if (isChecked) {
        newDataMap[itemKey] = [];
      } else {
        delete newDataMap[itemKey];
      }
      return newDataMap;
    });

    setComponents((prevComponents) => {
      if (isChecked) {
        const filter = flatFilter.find((f) => f.key === itemKey);
        if (filter) {
          const newComponent = (
            <ComponentConditions
              handleFilterData={handleFilterData}
              data={data}
              isLogin={isLogin}
              itemKey={itemKey}
              filter={filter}
              watchlists={watchlists}
              handleDelKey={handleDelKey}
              onHandleSelectParameters={handleSelectParameters}
              filteredData={filteredDataMap[itemKey] || []}
            />
          );
          return [...prevComponents, newComponent];
        }
        return prevComponents;
      } else {
        return prevComponents.filter(
          (component) => component.props.itemKey !== itemKey
        );
      }
    });
  };

  const handleDelKey = (key) => {
    setSelectedItems((prevItems) => prevItems.filter((item) => item !== key));

    setComponents((prevComponents) =>
      prevComponents.filter((component) => component.props.itemKey !== key)
    );

    setTotalFilteredData((prevResults) =>
      prevResults.filter((result) => result.key !== key)
    );

    setFilteredDataMap((prevDataMap) => {
      const newDataMap = { ...prevDataMap };
      delete newDataMap[key];
      return newDataMap;
    });
  };

  const handleFilterData = (itemKey, filteredData) => {
    if (data) {
      setTotalFilteredData((prevResults) => {
        // Filter out entries with keys not present in selectedItems
        const updatedResults = prevResults.filter((result) =>
          selectedItems.includes(result.key)
        );

        // Remove entry if filteredData length is 0
        if (filteredData?.length === 0) {
          return updatedResults.filter((result) => result.key !== itemKey);
        }

        // Check if the key already exists
        let keyExists = false;
        updatedResults.forEach((result) => {
          if (result.key === itemKey) {
            // If the key already exists, update its data
            result.data = filteredData;
            keyExists = true;
          }
        });

        // If the key doesn't exist, add a new entry
        if (!keyExists) {
          updatedResults.push({ key: itemKey, data: filteredData });
        }

        return updatedResults;
      });
    } else {
      setTotalFilteredData([]);
    }
  };

  const [loadingTb, setLoadingTb] = useState(false); // Thêm state loading

  const findCommonCodes = (data) => {
    let commonCodes = [];

    // Lặp qua mỗi đối tượng trong mảng
    data.forEach((obj) => {
      // Lặp qua mỗi đối tượng dữ liệu của từng đối tượng
      obj.data.forEach((item) => {
        // Kiểm tra xem mã code đã tồn tại trong mảng chưa
        if (!commonCodes.includes(item)) {
          // Kiểm tra xem mã code có tồn tại trong tất cả các đối tượng không
          let allExist = data.every((obj) =>
            obj.data.some((dataItem) => dataItem.code === item.code)
          );
          if (allExist) {
            commonCodes.push(item);
          }
        }
      });
    });

    return commonCodes;
  };
  
  useEffect(() => {
    setLoadingTb(true);

    const timer = setTimeout(() => {
      let commonCodes = findCommonCodes(totalFilteredData);
      const dataWithKey =
        Array.isArray(commonCodes) &&
        commonCodes.map((item, index) => ({
          ...item,
          key: index,
        }));

      setFilteredResults(dataWithKey);
      setLoadingTb(false);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [totalFilteredData]);

  const catchWatchlists = (arrText) => {
    setWatchlists(arrText);
  };

  const clearConditions = () => {
    setSelectedItems([]);
    setFilteredResults([]);
    setFiltersActive("");
  };

  const handleSelectParameters = (value) => {
    setSelectParameters(value);
  };

  const catchFiler = (selectedItems) => {
    setSelectedItems(selectedItems);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="container mx-auto md:w-[90%] lg:w-[90%] xl:w-[90%] 2xl:w-full pt-2 font-[Roboto]">
        <div className="dark:text-[#278AFF] text-[#0D4381] pt-[12px] font-bold text-[15px]">
          Điều kiện lọc:
        </div>
        {!loading ? (
          <div>
            <div className="2xl:flex xl:block lg:block">
              <div className="2xl:w-[75%] xl:w-full my-2 mr-1 h-[200px] overflow-y-auto">
                {components.length > 0 ? (
                  components.map((component, index) => (
                    <div
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-[#80b7f84d]" : ""
                      } overflow-x-auto xl:w-full lg:w-[1030px] md:w-[1030px] sm:w-[1030px] xs:w-[1030px] xxs:w-[1030px]`}
                    >
                      {component}
                    </div>
                  ))
                ) : (
                  <div>
                    <div className="bg-[#80b7f84d] h-[40px]"></div>
                    <div className="flex items-center h-[120px] ml-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        class="stroke-[#0D4381] dark:stroke-[#278AFF]"
                      >
                        <path
                          d="M26 32H24V24H22M24 16H24.02M42 24C42 33.9411 33.9411 42 24 42C14.0589 42 6 33.9411 6 24C6 14.0589 14.0589 6 24 6C33.9411 6 42 14.0589 42 24Z"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="dark:text-[#278AFF] text-[#0D4381] text-[18px] font-[700] ml-1">
                        Chưa có điều kiện nào, hãy thêm các điều kiện lọc vào
                      </div>
                    </div>
                    <div className="bg-[#80b7f84d] h-[40px]"></div>
                  </div>
                )}
              </div>
              <div className="2xl:w-[25%] xl:w-full bg-[#E6EFF9] border-[#0D4381] border-solid rounded-md my-2 ml-1 h-[200px]">
                <div className="flex flex-col items-center pt-[17px] py-[11px]">
                  <div className="text-[#0D4381] font-[750] xs:text-[16px] xxs:text-[13px] pb-[2px]">
                    Số mã thỏa mãn tất cả các điều kiện
                  </div>
                  <div className="text-[#0D4381] font-bold text-[130px] leading-[110px]">
                    {filteredResults?.length === 0
                      ? 0
                      : filteredResults?.length.toLocaleString("vi-VN") || 0}
                  </div>
                  <div className="h-[30px] flex flex-col justify-center text-[#0D4381] font-bold pt-[6px]">
                    <AddCodeToWatchlist
                      watchlists={watchlists}
                      filteredResults={filteredResults}
                      catchWatchlists={catchWatchlists}
                      isLogin={isLogin}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="2xl:w-[70%] xl:w-full flex justify-end -ml-1">
              <DialogAddConditions
                selectedItems={selectedItems}
                handleCheckboxChange={handleCheckboxChange}
              />
            </div>
            <div className="2xl:w-[35%] xl:w-[50%] lg:w-[60%] md:w-full flex md:flex-row md:justify-between sm:flex-col xs:flex-col xxs:flex-col sm:items-end xs:items-end xxs:items-end pl-10">
              <div className="mt-1">
                <SaveFilter
                  filtersActive={filtersActive}
                  selectedItems={selectedItems}
                  setFilters={setFilters}
                  isLogin={isLogin}
                />
              </div>
              <div className="mt-1">
                <Button
                  variant="contained"
                  color="mau"
                  onClick={clearConditions}
                >
                  <FiFilePlus className="w-[25px] h-[25px] text-white" />
                  <span className="normal-case pl-1 text-[14px] font-semibold text-white">
                    Tạo bộ lọc mới
                  </span>
                </Button>
              </div>
              <div className="mt-1">
                <ListFilters
                  setFilters={setFilters}
                  filters={filters}
                  filtersActive={filtersActive}
                  catchFiler={catchFiler}
                  setFiltersActive={setFiltersActive}
                  selectedItems={selectedItems}
                />
              </div>
            </div>
            <div className="mt-2">
              <TableResultsFilter
                loadingTb={loadingTb}
                isLogin={isLogin}
                selectParameters={selectParameters}
                filteredResults={filteredResults}
                watchlists={watchlists}
                catchWatchlists={catchWatchlists}
                selectedItems={selectedItems}
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="2xl:flex xl:block lg:block">
              <div className="2xl:w-[70%] xl:w-full">
                <Skeleton.Input active block className="mt-1" />
                <Skeleton.Input active block className="mt-1" />
                <Skeleton.Input active block className="mt-1" />
                <Skeleton.Input active block className="mt-1" />
                <Skeleton.Input active block className="mt-1" />
              </div>
              <div className="2xl:w-[30%] xl:w-full ml-1">
                <Skeleton.Input active block size="large" className="mt-1" />
              </div>
            </div>
            <div className="2xl:w-[70%] xl:w-full flex justify-end -ml-1">
              <Skeleton.Input active className="mt-1" />
            </div>
            <div className="2xl:w-[35%] xl:w-full flex md:flex-row sm:flex-col sm:justify-end xs:flex-col xs:justify-end xxs:flex-col xxs:justify-end justify-between -ml-1 2xl:pl-[60px] xl:pl-4">
              <Skeleton.Input active className="mt-1 mx-2" />
              <Skeleton.Input active className="mt-1 mx-2" />
              <Skeleton.Input active className="mt-1 mx-2" />
            </div>
            <div className="h-[471px] mt-4">
              <Skeleton.Input active block size="large" className="mt-1" />
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Filter;
