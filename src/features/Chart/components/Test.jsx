import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import socket from '../utils/socket';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
const Test = () => {
  const {dataTableDetail} = useSelector(state => state.chart)
  const [data, setData] = useState()
  const [oldData, setOldData] = useState()
  useEffect(()=> {
    if(dataTableDetail?.data?.length > 0)
    setData(dataTableDetail.data)
    
    setOldData(dataTableDetail.data)
  },[dataTableDetail])
  useEffect(()=> {

    socket.on('listen-domestic-index', (newData)=> {
      setData(newData)
    } )
  },[])
  console.log('newData', data)
  console.log('oldData', oldData)
  const [columnDefs, setColumnDefs] = useState([
    { field: 'comGroupCode', headerName: 'Chỉ số' },
    { field: 'indexValue', headerName: 'Điểm' },
    { field: 'indexChange', headerName: 'Thay đổi (điểm)' },
    { field: 'percentIndexChange', headerName: 'Thay đổi (%)' },
  ]);

  return (
    <div className="ag-theme-alpine" style={{width:'500px', height:"500px"}}> <AgGridReact
    rowData={data}
    columnDefs={columnDefs}
  ></AgGridReact></div>
  )
}

export default Test