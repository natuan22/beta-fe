import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataTableEvents } from '../../thunk';

const NewsOfEnterprise = () => {
  const dispatch = useDispatch();
  const { dataTableEvents } = useSelector(state => state.newsCenter)

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    dispatch(fetchDataTableEvents(currentPage, pageSize, 'all'))
  }, [currentPage, pageSize]);



  const columnDefs = [
    { headerName: "Mã chứng khoán", field: "code" },
    { headerName: "Sàn", field: "exchange" },
    { headerName: "Ngày GDKHQ", field: "date_gdkhq" },
    { headerName: "Ngày ĐKCC", field: "date_dkcc" },
    { headerName: "Ngày thực hiện", field: "date" },
    { headerName: "Nội dung sự kiện", field: "content" },
    { headerName: "Loại sự kiện", field: "type" }
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: '300px' }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={dataTableEvents}
        pagination={true}
        paginationPageSize={pageSize}
        onPaginationChanged={(params) => {
          setCurrentPage(params.api.paginationGetCurrentPage() + 1);
          setPageSize(params.api.paginationGetPageSize());
        }}
      />
    </div>
  );
};

export default NewsOfEnterprise;
