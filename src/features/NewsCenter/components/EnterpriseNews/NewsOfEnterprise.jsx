import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { https } from '../../../../services/config';

const ExchangeFilterHeader = ({ value, onFilterChange }) => {
  const [filterValue, setFilterValue] = useState(value);

  const handleFilterChange = (event) => {
    const newValue = event.target.value;
    setFilterValue(newValue);
    onFilterChange(newValue);
  };

  return (
    <div>
      <span>Sàn:</span>
      <select className={`bg-[#222628] text-[0.9rem] ml-1.5 text-[#0097B2] border-0`} value={filterValue} onChange={handleFilterChange} >
        <option value="all ">Tất cả</option>
        <option value="hose">HSX</option>
        <option value="hnx">HNX</option>
        <option value="upcom">UPCOM</option>
      </select>
    </div>

  );
};

const NewsOfEnterprise = () => {
  const [gridApi, setGridApi] = useState(null);
  const [filterValue, setFilterValue] = useState('all');
  const [filterOptions, setFilterOptions] = useState([]);
  const columnDefs = [
    {
      headerName: 'Mã chứng khoán',
      field: 'code',
      width: 150,
      cellRenderer: params => {
        return <p className='font-bold text-center'> {params.value} </p>;
      }
    },
    {
      headerName: 'Sàn',
      field: 'exchange',
      width: 150,
      headerComponentFramework: ExchangeFilterHeader,
      headerComponentParams: {
        onFilterChange: (newValue) => setFilterValue(newValue)
      },
      cellRenderer: params => {
        return <p className='font-bold  '> {params.value} </p>;
      }
    },
    {
      headerName: 'Ngày GDKHQ',
      field: 'date_gdkhq',
      width: 155,
      cellRenderer: params => {
        return <p className='text-left'> {params.value} </p>;
      }
    },
    {
      headerName: 'Ngày ĐKCC',
      field: 'date_dkcc',
      width: 155,
      cellRenderer: params => {
        return <p className='text-left'> {params.value} </p>;
      }
    },
    {
      headerName: 'Ngày thực hiện',
      field: 'date',
      width: 155,
      cellRenderer: params => {
        return <p className='text-left'> {params.value} </p>;
      }
    },
    {
      headerName: 'Nội dung sự kiện',
      field: 'content',
      width: 330
    },
    { headerName: 'Loại sự kiện', field: 'type' }
  ];

  useEffect(() => {
    if (gridApi) {
      const datasource = {
        getRows: async (params) => {
          try {
            const response = await https.get(
              `/api/v1/news/event?page=${params.startRow / 10 + 1}&limit=20&exchange=${filterValue}`
            );
            params.successCallback(
              response.data.data.list,
              response.data.data.total_record
            );
          } catch (error) {
            console.error("Error:", error);
            params.failCallback();
          }
        },
      };

      gridApi.setDatasource(datasource);
    }
    // ...
  }, [gridApi, filterValue]);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  return (
    <div>
      <div className="ag-theme-alpine-dark" style={{ height: '500px' }}>
        <AgGridReact
          suppressDragLeaveHidesColumns={true}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={20}
          cacheBlockSize={20}
          animateRows={true}
          rowModelType="infinite"
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
};

export default NewsOfEnterprise;
