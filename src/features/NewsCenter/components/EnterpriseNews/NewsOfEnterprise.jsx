import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { https } from '../../../../services/config';
import '../../utils/styles/styleHeader.css'
import { useSelector } from "react-redux";

const ExchangeFilterHeader = ({ value, onFilterChange }) => {
  const [filterValue, setFilterValue] = useState(value);

  const handleFilterChange = (event) => {
    const newValue = event.target.value;
    setFilterValue(newValue);
    onFilterChange(newValue);
  };

  return (
    <div>
      <span className='text-white'>Sàn:</span>
      <select className={`bg-[#1E5D8B] text-[0.9rem] ml-1.5 text-white border-0 font-bold`} value={filterValue} onChange={handleFilterChange} >
        <option value="all">Tất cả</option>
        <option value="hose">HSX</option>
        <option value="hnx">HNX</option>
        <option value="upcom">UPCOM</option>
      </select>
    </div>

  );
};
const TypeEventFilterHeader = ({ value, onFilterChange }) => {
  const [typeEventValue, setTypeEventValue] = useState(value);

  const handleFilterChange = (event) => {
    const newValue = event.target.value;
    setTypeEventValue(newValue);
    onFilterChange(newValue);
  };
  return (
    <div>
      <span className='text-white'>Loại sự kiện:</span>
      <select className={`bg-[#1E5D8B] text-[0.9rem] ml-1.5 text-white border-0 font-bold`} value={typeEventValue} onChange={handleFilterChange} >
        <option value="0 ">Tất cả</option>
        <option value="1">Trả cổ tức bằng tiền mặt</option>
        <option value="2">Trả cổ tức bằng cổ phiếu</option>
        <option value="3">Thưởng cổ phiếu</option>
        <option value="4">Phát hành thêm</option>
      </select>
    </div>

  );
};
const NewsOfEnterprise = () => {
  const [gridApi, setGridApi] = useState(null);
  const [filterValue, setFilterValue] = useState('all');
  const [typeEventValue, setTypeEventValue] = useState('0');

  const [theme, setTheme] = useState(localStorage.getItem('theme'))
  const color = useSelector((state) => state.color.colorTheme);

  useEffect(() => {
    setTheme(color);
  }, [color]);
  const columnDefs = [
    {
      headerName: 'Mã chứng khoán',
      field: 'code',
      width: 150,
      suppressMovable: true,
      cellRenderer: params => {
        return <p className='font-bold text-center'> {params.value} </p>;
      }
    },
    {
      headerName: 'Sàn',
      field: 'exchange',
      width: 150,
      suppressMovable: true,
      headerComponentFramework: ExchangeFilterHeader,
      headerComponentParams: {
        onFilterChange: (newValue) => setFilterValue(newValue)
      },
      cellRenderer: params => {
        return <p className='font-bold text-center'> {params.value} </p>;
      }
    },
    {
      headerName: 'Ngày GDKHQ',
      field: 'date_gdkhq',
      width: 130,
      cellRenderer: params => {
        return <p className='text-center'> {params.value} </p>;
      }
    },
    {
      headerName: 'Ngày ĐKCC',
      field: 'date_dkcc',
      width: 125,
      suppressMovable: true,
      cellRenderer: params => {
        return <p className='text-center'> {params.value} </p>;
      }
    },
    {
      headerName: 'Ngày thực hiện',
      field: 'date',
      width: 130,
      suppressMovable: true,
      cellRenderer: params => {
        return <p className='text-center'> {params.value} </p>;
      }
    },
    {
      headerName: 'Nội dung sự kiện',
      field: 'content',
      suppressMovable: true,
      width: 404,
      autoHeight: true,
      cellStyle: { whiteSpace: 'normal', lineHeight: '1.1rem', display: 'flex', alignItems: 'center' },
      cellRenderer: params => {
        return <p> {params.value}</p>;
      }
    },
    {
      headerName: 'Loại sự kiện', field: 'type',
      headerComponentFramework: TypeEventFilterHeader,
      width: 310,
      suppressMovable: true,
      headerComponentParams: {
        onFilterChange: (newValue) => setTypeEventValue(newValue)
      }, cellRenderer: params => {
        return <p className=''> {params.value} </p>;
      }

    }
  ];

  useEffect(() => {
    if (gridApi) {
      const datasource = {
        getRows: async (params) => {
          try {
            const response = await https.get(
              `/api/v1/news/event?page=${params.startRow / 10 + 1}&limit=20&exchange=${filterValue}&type=${typeEventValue}`
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
  }, [gridApi, filterValue, typeEventValue]);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  return (
    <div className='mt-2'>
      <div className={`${localStorage.getItem('theme') === 'dark' ? "ag-theme-alpine-dark" : "ag-theme-alpine"}`} style={{ height: '500px' }}>
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
