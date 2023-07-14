import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { https } from '../../../../services/config';



const ListNewsFilter = ({ codeTranmission }) => {
    console.log(codeTranmission)
    const [gridApi, setGridApi] = useState(null);
    useEffect(() => {
        if (gridApi) {
            const datasource = {
                getRows: async (params) => {
                    try {
                        const response = await https.get(
                            `/api/v1/news/bo-loc-tin-tuc?page=${params.startRow / 10 + 1}&limit=20&code=${codeTranmission}`
                        );
                        console.log(response)
                        params.successCallback(
                            response.data.data,
                            response.data.data
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
    }, [gridApi, codeTranmission]);
    const columnDefs = [
        {
            headerName: 'Cổ phiếu',
            field: 'code',
            suppressMovable: true,
            cellRenderer: params => {
                return <p className='font-bold text-center'> {params.value} </p>;
            }
        },
        {
            headerName: 'Ngày đăng',
            field: 'date',
            suppressMovable: true,
            cellRenderer: params => {
                return <p className='font-bold text-center'> {params.value} </p>;
            }
        },
        {
            headerName: 'Tiêu đề',
            field: 'title',
            suppressMovable: true,
            cellRenderer: params => {
                return <p className='font-bold text-center'> {params.value} </p>;
            }
        },
    ]

    const onGridReady = (params) => {
        setGridApi(params.api);
    };

    return (
        <div className='mt-2'>
            <div className={`ag-theme-alpine-dark`} style={{ height: '500px' }}>
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
    )
}

export default ListNewsFilter