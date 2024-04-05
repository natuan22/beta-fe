import React, { useEffect } from "react";
import { hashTbStockFilter } from "./hashTb";
import Loading from "../../Chart/utils/Loading";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const customLocaleText = {
  noRowsLabel: "Không có dữ liệu",
  columnMenuLabel: "Menu cột",
  filterPanelPlaceholder: "Tìm kiếm",
  filterOperator: {
    AND: "Và",
    OR: "Hoặc",
    NOT: "Không",
  },
  filterActions: {
    reset: "Đặt lại",
    filter: "Lọc",
  },
  filterSelectAll: "Chọn tất cả",
  filterRowsLabel: "Dữ liệu lọc",
  filterBetweenText: "từ",
  filterOoo: "Không",
  filterOom: "Không phù hợp",
  filterContains: "Chứa",
  filterStartsWith: "Bắt đầu với",
  filterEndsWith: "Kết thúc bằng",
  filterEQ: "Bằng",
  filterNEQ: "Khác",
};

const useStyles = makeStyles({
  evenRow: {
    backgroundColor: "#00000", // Màu nền cho hàng index chẵn
  },
  oddRow: {
    backgroundColor: "#2e2e2e", // Màu nền cho hàng index lẻ
  },
});
const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "lightgrey", // Màu nền khi hover
            "& .MuiDataGrid-cell": {
              color: "black",
            },
            transitionDuration: "500ms",
          },
        },
      },
    },
  },
});

const RenderTableStockFilter = ({ data, arrSliderCheckbox, activeButton }) => {
  const [columnsTable, setColumnsTable] = useState([]);
  const [dataRender, setDataRender] = useState([]);
  const classes = useStyles();
  const isNull = (value) => value || 0;
  useEffect(() => {
    if (data) {
      const dataWithKey =
        Array.isArray(data) &&
        data?.map((item, index) => ({
          ...item,
          id: index,
        }));
      setDataRender(dataWithKey);
    }
  }, [data]);

  useEffect(() => {
    const columnCode = [
      {
        field: "code",
        headerName: "Mã cổ phiếu",
        width: 150,
      },
    ];

    if (activeButton === 0) {
      if (arrSliderCheckbox?.length > 0) {
        const columns = arrSliderCheckbox?.map((key, index) => {
          return {
            field: key,
            width: 200,
            headerName: Object.values(hashTbStockFilter)
              .flatMap((items) => items)
              .find((item) => item.key === key)?.name,
            valueFormatter: (params) =>
              isNull(params.value).toLocaleString("vi-VN", {
                maximumFractionDigits: 2,
              }),
          };
        });
        const columnsWithCode = [...columnCode, ...columns];
        setColumnsTable(columnsWithCode);
      }
    } else if (activeButton === 1) {
      const columns = [
        {
          field: "closePrice",
          headerName: "Thị giá (x1000 vnđ)",
          width: 150,
          valueFormatter: (params) =>
            isNull(params.value).toLocaleString("vi-VN", {
              maximumFractionDigits: 2,
            }),
        },
        {
          field: "floor",
          headerName: "Sàn",
          width: 100,
        },
        {
          field: "LV2",
          headerName: "Ngành cấp 2",
          width: 250,
        },
        {
          field: "marketCap",
          headerName: "Vốn hoá (tỷ VNĐ)",
          width: 200,
          valueFormatter: (params) =>
            isNull(params.value).toLocaleString("vi-VN", {
              maximumFractionDigits: 2,
            }),
        },
      ];
      var columnsWithCode = [...columnCode, ...columns];
      setColumnsTable(columnsWithCode);
    } else if (activeButton === 2) {
      const columns = [
        {
          field: "closePrice",
          headerName: "Thị giá (x1000 vnđ)",
          width: 150,
          valueFormatter: (params) =>
            isNull(params.value).toLocaleString("vi-VN", {
              maximumFractionDigits: 2,
            }),
        },
        {
          field: "PE",
          headerName: "P/E (lần)",
          width: 100,
          valueFormatter: (params) =>
            isNull(params.value).toLocaleString("vi-VN", {
              maximumFractionDigits: 2,
            }),
        },
        {
          field: "PB",
          headerName: "P/B (lần)",
          width: 100,
          valueFormatter: (params) =>
            isNull(params.value).toLocaleString("vi-VN", {
              maximumFractionDigits: 2,
            }),
        },
        {
          field: "EPS",
          headerName: "EPS (vnđ/cp)",
          width: 150,
          valueFormatter: (params) =>
            isNull(params.value).toLocaleString("vi-VN", {
              maximumFractionDigits: 2,
            }),
        },
        {
          field: "BVPS",
          headerName: "BVPS (vnđ/cp)",
          width: 150,
          valueFormatter: (params) =>
            isNull(params.value).toLocaleString("vi-VN", {
              maximumFractionDigits: 2,
            }),
        },
        {
          field: "ROA",
          headerName: "ROA (%)",
          width: 100,
          valueFormatter: (params) =>
            isNull(params.value).toLocaleString("vi-VN", {
              maximumFractionDigits: 2,
            }),
        },
        {
          field: "ROE",
          headerName: "ROE (%)",
          width: 100,
          valueFormatter: (params) =>
            isNull(params.value).toLocaleString("vi-VN", {
              maximumFractionDigits: 2,
            }),
        },
        {
          field: "growthRevenueSamePeriod",
          headerName: "Tăng trưởng doanh thu 4Q (%)",
          width: 150,
          valueFormatter: (params) =>
            isNull(params.value).toLocaleString("vi-VN", {
              maximumFractionDigits: 2,
            }),
        },
        {
          field: "growthProfitAfterRevenueSamePeriod",
          headerName: "Tăng trưởng lợi nhuận ST 4Q (%)",
          width: 150,
          valueFormatter: (params) =>
            isNull(params.value).toLocaleString("vi-VN", {
              maximumFractionDigits: 2,
            }),
        },
        {
          field: "EVdivEBITDA",
          headerName: "EV/EBITDA",
          width: 100,
          valueFormatter: (params) =>
            isNull(params.value).toLocaleString("vi-VN", {
              maximumFractionDigits: 2,
            }),
        },
        {
          field: "basicGeneralReview",
          headerName: "Sức khoẻ tài chính chung",
          width: 150,
          valueFormatter: (params) =>
            isNull(params.value).toLocaleString("vi-VN", {
              maximumFractionDigits: 2,
            }),
        },
      ];
      var columnsWithCode = [...columnCode, ...columns];
      setColumnsTable(columnsWithCode);
    } else if (activeButton === 3) {
      const columns = [
        {
          field: "closePrice",
          headerName: "Thị giá (x1000 vnđ)",
          width: 150,
          valueFormatter: (params) =>
            isNull(params.value).toLocaleString("vi-VN", {
              maximumFractionDigits: 2,
            }),
        },
        {
          field: "rsi",
          headerName: "RSI",
          width: 150,
          valueFormatter: (params) =>
            isNull(params.value).toLocaleString("vi-VN", {
              maximumFractionDigits: 2,
            }),
        },
        {
          field: "macd",
          headerName: "MACD",
          width: 150,
          valueFormatter: (params) =>
            isNull(params.value).toLocaleString("vi-VN", {
              maximumFractionDigits: 2,
            }),
        },
        {
          field: "trendLines",
          headerName: "Đường xu hướng",
          width: 150,
          valueFormatter: (params) =>
            isNull(params.value).toLocaleString("vi-VN", {
              maximumFractionDigits: 2,
            }),
        },
        {
          field: "technicalIndicators",
          headerName: "Chỉ báo kỹ thuật",
          width: 150,
          valueFormatter: (params) =>
            isNull(params.value).toLocaleString("vi-VN", {
              maximumFractionDigits: 2,
            }),
        },
        {
          field: "technicalOverview",
          headerName: "Đánh giá kỹ thuật chung",
          width: 200,
          valueFormatter: (params) =>
            isNull(params.value).toLocaleString("vi-VN", {
              maximumFractionDigits: 2,
            }),
        },
      ];
      var columnsWithCode = [...columnCode, ...columns];
      setColumnsTable(columnsWithCode);
    }
  }, [arrSliderCheckbox, activeButton]);

  return (
    <div>
      {data && columnsTable.length > 0 ? (
        <div className="bg-black rounded-md">
          <ThemeProvider theme={theme}>
            <DataGrid
              localeText={customLocaleText}
              rows={dataRender}
              columns={columnsTable}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              disableColumnSelector
              disableRowSelectionOnClick
              pageSizeOptions={[10]}
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  color: "white", // Màu chữ cho ô trong bảng
                  borderBottom: "1px solid rgba(0, 0, 0, 0.12)", // Hiển thị border cho cột (column)
                },
                "& .MuiDataGrid-columnHeaders ": {
                  color: "#0BFFC4", // Màu chữ cho tiêu đề cột
                },
                "& .MuiTablePagination-root": {
                  color: "white",
                },
                "& .MuiDataGrid-row": {
                  border: "none", // Tắt border cho hàng (row)
                },
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
              }}
              getRowClassName={(params) =>
                params.row.id % 2 === 0 ? classes.oddRow : classes.evenRow
              } // Áp dụng màu nền dựa trên index chẵn/lẻ của hàng
            />
          </ThemeProvider>
        </div>
      ) : (
        <div className="h-[300px] flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default RenderTableStockFilter;
