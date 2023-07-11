import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const NewsOfEnterprise = () => {
  const columnDefs = [
    { headerName: "Mã chứng khoán", field: "code" },
    { headerName: "Sàn", field: "exchange" },
    { headerName: "Ngày GDKHQ", field: "date_gdkhq" },
    { headerName: "Ngày ĐKCC", field: "date_dkcc" },
    { headerName: "Ngày thực hiện", field: "date" },
    { headerName: "Nội dung sự kiện", field: "content" },
    { headerName: "Loại sự kiện", field: "type" }
  ];

  const rowData = [
    { code: "ABC", exchange: "HOSE", date_gdkhq: "01/07/2023", date_dkcc: "15/06/2023", date: "20/06/2023", content: "Cổ tức", type: "Sự kiện chung" },
    { code: "XYZ", exchange: "HNX", date_gdkhq: "02/07/2023", date_dkcc: "16/06/2023", date: "21/06/2023", content: "Phát hành thêm", type: "Sự kiện riêng" },
    { code: "DEF", exchange: "UPCOM", date_gdkhq: "03/07/2023", date_dkcc: "17/06/2023", date: "22/06/2023", content: "Chia cổ phiếu", type: "Sự kiện chung" }
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: '300px', width: '100%' }}>
      <AgGridReact columnDefs={columnDefs} rowData={rowData} />
    </div>
  );
};

export default NewsOfEnterprise;
