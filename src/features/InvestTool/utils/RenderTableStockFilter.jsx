import React, { useEffect } from 'react'
import { hashTbStockFilter } from './hashTb'
import Loading from '../../Chart/utils/Loading';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const customLocaleText = {
    noRowsLabel: 'Không có dữ liệu',
    columnMenuLabel: 'Menu cột',
    filterPanelPlaceholder: 'Tìm kiếm',
    filterOperator: {
        AND: 'Và',
        OR: 'Hoặc',
        NOT: 'Không',
    },
    filterActions: {
        reset: 'Đặt lại',
        filter: 'Lọc',
    },
    filterSelectAll: 'Chọn tất cả',
    filterRowsLabel: 'Dữ liệu lọc',
    filterBetweenText: 'từ',
    filterOoo: 'Không',
    filterOom: 'Không phù hợp',
    filterContains: 'Chứa',
    filterStartsWith: 'Bắt đầu với',
    filterEndsWith: 'Kết thúc bằng',
    filterEQ: 'Bằng',
    filterNEQ: 'Khác',
};

const useStyles = makeStyles({
    evenRow: {
        backgroundColor: '#00000', // Màu nền cho hàng index chẵn
    },
    oddRow: {
        backgroundColor: '#2e2e2e', // Màu nền cho hàng index lẻ
    },

});
const theme = createTheme({
    components: {
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: 'lightgrey', // Màu nền khi hover
                        '& .MuiDataGrid-cell': {
                            color: 'black'
                        },
                        transitionDuration: '500ms'
                    },
                },
            },
        },
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

                <div >
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
                            pageSizeOptions={[10]}
                            sx={{
                                '& .MuiDataGrid-root': {
                                    border: 'none'
                                },
                                '& .MuiDataGrid-cell': {
                                    color: 'white', // Màu chữ cho ô trong bảng
                                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)', // Hiển thị border cho cột (column)
                                },
                                '& .MuiDataGrid-columnHeaders ': {
                                    color: 'white', // Màu chữ cho tiêu đề cột
                                },
                                '& .MuiTablePagination-root': {
                                    color: 'white'
                                },
                                '& .MuiDataGrid-row': {
                                    border: 'none', // Tắt border cho hàng (row)
                                },
                                '& .MuiSvgIcon-root': {
                                    color: 'white'
                                },
                            }}
                            getRowClassName={(params) =>
                                params.row.id % 2 === 0 ? classes.evenRow : classes.oddRow
                            } // Áp dụng màu nền dựa trên index chẵn/lẻ của hàng
                        />
                    </ThemeProvider>
                </div>
            ) : (
                <div className="h-[300px] flex items-center justify-center"><Loading /></div>
            )}
        </div>
    )
}

export default RenderTableStockFilter