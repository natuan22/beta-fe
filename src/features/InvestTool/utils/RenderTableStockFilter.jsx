import React, { useEffect } from 'react'
import { hashTbStockFilter } from './hashTb'
import Loading from '../../Chart/utils/Loading';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    evenRow: {
        backgroundColor: 'lightgray', // Màu nền cho hàng index chẵn
    },
    oddRow: {
        backgroundColor: 'lightblue', // Màu nền cho hàng index lẻ
    },
    'custom-header': {
        color: '#0BFFC4',
    },
});

const RenderTableStockFilter = ({ data, arrSliderCheckbox }) => {
    const [columnsTable, setColumnsTable] = useState([])
    const [dataRender, setDataRender] = useState([])
    const classes = useStyles();

    useEffect(() => {
        if (data) {
            const dataWithKey = Array.isArray(data) && data?.map((item, index) => ({
                ...item,
                id: index
            }));
            setDataRender(dataWithKey)
        }
    }, [data]);

    useEffect(() => {
        if (arrSliderCheckbox?.length > 0) {
            const columnCode = [{
                field: 'code',
                headerName: 'Mã cổ phiếu',
                width: 150,
            }]

            const columns = arrSliderCheckbox?.map((key, index) => {
                return (
                    {
                        field: key,
                        width: 200,
                        headerName: Object.values(hashTbStockFilter)
                            .flatMap((items) => items)
                            .find((item) => item.key === key)?.name,
                        valueFormatter: (params) => params.value.toLocaleString('en-US', { maximumFractionDigits: 2 }),
                    }
                )
            })
            const columnsWithCode = [...columnCode, ...columns];
            setColumnsTable(columnsWithCode)
        }
    }, [arrSliderCheckbox])

    if (arrSliderCheckbox.length === 0) {
        return (
            <div className='h-[150px] dark:text-white text-black font-semibold items-center justify-center flex'>
                Xin hãy chọn tiêu chí
            </div>
        )
    }

    return (
        <div>
            {data && columnsTable.length > 0 ? (
                <div>
                    <DataGrid
                        rows={dataRender}
                        columns={columnsTable}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[10]}
                        getRowClassName={(params) =>
                            params.row.id % 2 === 0 ? classes.evenRow : classes.oddRow
                        } // Áp dụng màu nền dựa trên index chẵn/lẻ của hàng
                    />
                </div>
            ) : (
                <div className="h-[300px] flex items-center justify-center"><Loading /></div>
            )}
        </div>
    )
}

export default RenderTableStockFilter