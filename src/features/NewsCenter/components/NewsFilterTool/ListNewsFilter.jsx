import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { https } from "../../../../services/config";
import { useSelector } from "react-redux";

const ListNewsFilter = ({ codeTranmission }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [gridApi, setGridApi] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const color = useSelector((state) => state.color.colorTheme);
  useEffect(() => {
    setTheme(color);
  }, [color]);

  useEffect(() => {
    if (gridApi) {
      const datasource = {
        getRows: async (params) => {
          try {
            const response = await https.get(
              `/api/v1/news/bo-loc-tin-tuc?page=${
                params.startRow / 10 + 1
              }&limit=20&code=${codeTranmission}`
            );

            if (response.data.data.list.length === 0) {
              gridApi.showNoRowsOverlay();
            } else {
              gridApi.hideOverlay();
              params.successCallback(
                response.data.data.list,
                response.data.data.total_record
              );
            }
          } catch (error) {
            console.error("Error:", error);
            params.failCallback();
          }
        },
      };

      gridApi.setDatasource(datasource);
    }
  }, [gridApi, codeTranmission]);
  const columnDefs = [
    {
      headerName: "Cổ phiếu",
      field: "code",
      suppressMovable: true,
      width: 100,
      cellRenderer: (params) => {
        return <p className="font-bold text-center"> {params.value} </p>;
      },
    },
    {
      headerName: "Ngày đăng",
      field: "date",
      width: 110,
      suppressMovable: true,
      cellRenderer: (params) => {
        return <p className="font-bold text-center"> {params.value} </p>;
      },
    },
    {
      headerName: "Tiêu đề",
      field: "title",
      width: 480,
      suppressMovable: true,
      autoHeight: true,
      cellStyle: {
        whiteSpace: "normal",
        lineHeight: "1.1rem",
        display: "flex",
        alignItems: "center",
      },
      cellRenderer: (params) => {
        return <p className="font-bold"> {params.value}</p>;
      },
    },
  ];

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const handleItemClick = (params) => {
    setSelectedItem(params.data);
  };

  const handleCloseIframe = () => {
    setSelectedItem(null);
  };
  const localeText = {
    // ...
    noRowsToShow:
      "Mã cổ phiếu này không có tin tức. Vui lòng chọn mã cổ phiếu khác.",
  };

  return (
    <div className="grid xl:grid-cols-2 lg:grid-cols-none">
      <div
        className={`${
          localStorage.getItem("theme") === "dark"
            ? "ag-theme-alpine-dark"
            : "ag-theme-alpine"
        }`}
        style={{ height: "800px" }}
      >
        <AgGridReact
          rowClass="pointer-cursor"
          onRowClicked={handleItemClick}
          suppressDragLeaveHidesColumns={true}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={20}
          cacheBlockSize={20}
          animateRows={true}
          rowModelType="infinite"
          onGridReady={onGridReady}
          localeText={localeText}
        />
      </div>
      <div className="">
        {selectedItem ? (
          <div className="relative">
            <div
              class="close cursor-pointer md:block sm:hidden xs:hidden xxs:hidden"
              onClick={handleCloseIframe}
            />
            <iframe
              src={selectedItem.href}
              title={selectedItem.title}
              className="2xl:w-[704px] xl:w-[632px] lg:w-[890px] md:w-[660px] sm:w-[393px] xs:w-[343px] xxs:w-[290px] h-[796px]"
            />
          </div>
        ) : (
          <div className="h-[800px] flex items-center justify-center dark:text-white text-black uppercase font-bold">
            Chọn tin để đọc
          </div>
        )}
      </div>
    </div>
  );
};

export default ListNewsFilter;
