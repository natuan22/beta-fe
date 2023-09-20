import { DatePicker } from '@mui/x-date-pickers'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { FormControl, Input, MenuItem, Select, TextField } from '@mui/material';

const InvestSimulation = () => {
    const color = useSelector((state) => state.color.colorTheme);
    const [theme, setTheme] = useState(localStorage.getItem('theme'))
    const [initialCapital, setInitialCapital] = useState('1000'); // Vốn đầu tư ban đầu
    const [period, setPeriod] = useState('3'); // Khoảng thời gian giả lập
    const [fromMonth, setFromMonth] = useState(dayjs().subtract(13, 'month')) // Từ tháng
    const [toMonth, setToMonth] = useState(dayjs().subtract(1, 'month')) // Đến tháng
    const [readOnlyDateTimePicker, setReadOnlyDateTimePicker] = useState(false);
    const [periodicInvestment, setPeriodicInvestment] = useState(true); // Đầu tư định kỳ
    const [addPeriodically, setAddPeriodically] = useState('10'); // Thêm định kỳ

    useEffect(() => {
        setTheme(color);
        if (period != 5) {
            setReadOnlyDateTimePicker(true)
        }
        else {
            setReadOnlyDateTimePicker(false)
        }
    }, [color, readOnlyDateTimePicker, period]);

    const onPeriodicInvestmentChange = () => {
        setPeriodicInvestment(!periodicInvestment);
    };

    const handleChangePeriod = (event) => {
        setPeriod(event.target.value);
        switch (event.target.value) {
            case 1:
                setFromMonth(toMonth.subtract(3, 'month'))
                break;
            case 2:
                setFromMonth(toMonth.subtract(6, 'month'))
                break;
            case 3:
                setFromMonth(toMonth.subtract(12, 'month'))
                break;
            case 4:
                setFromMonth(toMonth.subtract(36, 'month'))
                break;
            default:
                break;
        }
    };

    const handleChangeInitialCapital = (event) => {
        setInitialCapital(event.target.value);
    };

    const handleChangeAddPeriodically = (event) => {
        setAddPeriodically(event.target.value);
    };

    // DANH MỤC 1
    const [count, setCount] = useState(0);

    const handleMinusClick = () => {
        setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 0));
    };

    const handlePlusClick = () => {
        setCount((prevCount) => prevCount + 1);
    }

    const handleChangeCount = (event) => {
        setCount(+event.target.value);
    }

    // DANH MỤC 2
    const [countCate2, setCountCate2] = useState(0);

    const handleMinusClickCate2 = () => {
        setCountCate2((prevCount) => (prevCount > 1 ? prevCount - 1 : 0));
    };

    const handlePlusClickCate2 = () => {
        setCountCate2((prevCount) => prevCount + 1);
    }

    const handleChangeCountCate2 = (event) => {
        setCountCate2(+event.target.value);
    }

    // DANH MỤC 3
    const [countCate3, setCountCate3] = useState(0);

    const handleMinusClickCate3 = () => {
        setCountCate3((prevCount) => (prevCount > 1 ? prevCount - 1 : 0));
    };

    const handlePlusClickCate3 = () => {
        setCountCate3((prevCount) => prevCount + 1);
    }

    const handleChangeCountCate3 = (event) => {
        setCountCate3(+event.target.value);
    }

    return (
        <div>
            <div className='grid grid-cols-12 gap-8 pt-2'>
                <div className='col-span-4'>
                    <div className='border-solid border-[#9E9E9E] border-b-2 border-t-0 border-x-0'>
                        <div className='dark:text-white text-black font-semibold h-[42px] flex items-center'>Thiết lập thông số</div>
                    </div>

                    <div className='dark:text-white text-black h-[503px]'>
                        {/* Vốn đầu tư ban đầu */}
                        <div className='py-3 flex items-center justify-between'>
                            <span>Vốn đầu tư ban đầu (Tr)</span>
                            <TextField
                                type='number'
                                defaultValue={initialCapital}
                                sx={{
                                    '& .MuiInputBase-root .MuiInputBase-input ': { color: (localStorage.getItem('theme') === 'dark' ? '#fff' : '#000') },
                                    '& .MuiInputBase-root .MuiInputAdornment-root .MuiButtonBase-root  ': { color: (localStorage.getItem('theme') === 'dark' ? '#fff' : '#000') },
                                    '& .MuiInputBase-formControl': { backgroundColor: 'rgba(92, 92, 92, 0.50)' },
                                    '& .MuiOutlinedInput-input': { width: '218px', paddingTop: '5.5px', paddingBottom: '5.5px', textAlign: 'right' },
                                }}
                                onChange={handleChangeInitialCapital} />
                        </div>

                        {/* Khoảng thời gian giả lập */}
                        <div className='py-3 flex items-center justify-between'>
                            <span>Khoảng thời gian giả lập</span>
                            <FormControl>
                                <Select
                                    sx={{
                                        '& .MuiSelect-select': { color: (localStorage.getItem('theme') === 'dark' ? '#fff' : '#000'), width: '200px', textAlign: 'right', paddingTop: '5.5px', paddingBottom: '5.5px' },
                                        '& .MuiSvgIcon-root': { color: (localStorage.getItem('theme') === 'dark' ? '#fff' : '#000') },
                                        '& .MuiInputBase-input': { backgroundColor: 'rgba(92, 92, 92, 0.50)' },
                                    }}
                                    value={period}
                                    onChange={handleChangePeriod}
                                >
                                    <MenuItem value={1}>3 tháng</MenuItem>
                                    <MenuItem value={2}>6 tháng</MenuItem>
                                    <MenuItem value={3}>1 năm</MenuItem>
                                    <MenuItem value={4}>3 năm</MenuItem>
                                    <MenuItem value={5}>Tuỳ chọn</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        {/* Từ tháng */}
                        <div className='py-3 flex items-center justify-between'>
                            <span className='dark:text-white text-black'>Từ tháng</span>
                            <div className='ml-4'>
                                <DatePicker
                                    readOnly={readOnlyDateTimePicker}
                                    format="MM/YYYY"
                                    margin="normal"
                                    views={['year', 'month']} // Chỉ cho phép chọn tháng và năm
                                    openTo="year" // Mở calendar với view là năm
                                    autoOk={true} // Tự động chấp nhận ngày khi chọn tháng và năm
                                    clearable // Cho phép xóa giá trị
                                    sx={{
                                        '& .MuiInputBase-root .MuiInputBase-input ': { color: (localStorage.getItem('theme') === 'dark' ? '#fff' : '#000') },
                                        '& .MuiInputBase-root .MuiInputAdornment-root .MuiButtonBase-root  ': { color: (localStorage.getItem('theme') === 'dark' ? '#fff' : '#000') },
                                        '& .MuiInputBase-formControl': { backgroundColor: 'rgba(92, 92, 92, 0.50)' },
                                        '& .MuiInputBase-input': { padding: '5.5px 0px 5.5px 14px' },
                                        '& .MuiOutlinedInput-input': { textAlign: 'right' }
                                    }}
                                    disableFuture
                                    value={fromMonth}
                                    onChange={(newValue) => {
                                        setFromMonth(newValue)
                                    }} />
                            </div>
                        </div>

                        {/* Đến tháng */}
                        <div className='py-3 flex items-center justify-between'>
                            <span className='dark:text-white text-black'>Đến tháng</span>
                            <div className='ml-4'>
                                <DatePicker
                                    readOnly={readOnlyDateTimePicker}
                                    format="MM/YYYY"
                                    margin="normal"
                                    views={['year', 'month']} // Chỉ cho phép chọn tháng và năm
                                    openTo="year" // Mở calendar với view là năm
                                    autoOk={true} // Tự động chấp nhận ngày khi chọn tháng và năm
                                    clearable // Cho phép xóa giá trị
                                    sx={{
                                        '& .MuiInputBase-root .MuiInputBase-input ': { color: (localStorage.getItem('theme') === 'dark' ? '#fff' : '#000') },
                                        '& .MuiInputBase-root .MuiInputAdornment-root .MuiButtonBase-root  ': { color: (localStorage.getItem('theme') === 'dark' ? '#fff' : '#000') },
                                        '& .MuiInputBase-formControl': { backgroundColor: 'rgba(92, 92, 92, 0.50)' },
                                        '& .MuiInputBase-input': { padding: '5.5px 0px 5.5px 14px' },
                                        '& .MuiOutlinedInput-input': { textAlign: 'right' }
                                    }}
                                    disableFuture
                                    value={toMonth}
                                    onChange={(newValue) => {
                                        setToMonth(newValue)
                                    }} />
                            </div>
                        </div>

                        {/* Chỉ số tham chiếu */}
                        <div className='py-3 flex items-center justify-between'>
                            <span>Chỉ số tham chiếu</span>
                            <div>
                                <TextField
                                    inputProps={
                                        { readOnly: true, }
                                    }
                                    defaultValue={'VN-INDEX'}
                                    sx={{
                                        '& .MuiInputBase-root .MuiInputBase-input ': { color: (localStorage.getItem('theme') === 'dark' ? '#fff' : '#000') },
                                        '& .MuiInputBase-root .MuiInputAdornment-root .MuiButtonBase-root  ': { color: (localStorage.getItem('theme') === 'dark' ? '#fff' : '#000') },
                                        '& .MuiInputBase-formControl': { backgroundColor: 'rgba(92, 92, 92, 0.50)' },
                                        '& .MuiOutlinedInput-input': { width: '218px', paddingTop: '5.5px', paddingBottom: '5.5px', textAlign: 'right' },
                                    }} />
                            </div>
                        </div>

                        {/* Đầu tư định kỳ */}
                        <div className='py-3'>
                            <label className="material-checkbox text-white">
                                <input
                                    type="checkbox"
                                    name="periodic-investment"
                                    checked={periodicInvestment}
                                    onChange={onPeriodicInvestmentChange}
                                />
                                <span className="checkmark"></span>
                                <span>Đầu tư định kỳ</span>
                            </label>
                        </div>
                        {periodicInvestment ? (
                            <div>
                                {/* Kỳ hạn: */}
                                <div className='py-3 flex items-center justify-between'>
                                    <span>Kỳ hạn:</span>
                                    <TextField
                                        inputProps={
                                            { readOnly: true, }
                                        }
                                        defaultValue={'Hằng tháng'}
                                        sx={{
                                            '& .MuiInputBase-root .MuiInputBase-input ': { color: (localStorage.getItem('theme') === 'dark' ? '#fff' : '#000') },
                                            '& .MuiInputBase-root .MuiInputAdornment-root .MuiButtonBase-root  ': { color: (localStorage.getItem('theme') === 'dark' ? '#fff' : '#000') },
                                            '& .MuiInputBase-formControl': { backgroundColor: 'rgba(92, 92, 92, 0.50)' },
                                            '& .MuiOutlinedInput-input': { width: '218px', paddingTop: '5.5px', paddingBottom: '5.5px', textAlign: 'right' },
                                        }} />
                                </div>

                                {/* Thêm định kỳ (Tr): */}
                                <div className='py-3 flex items-center justify-between'>
                                    <span>Thêm định kỳ (Tr):</span>
                                    <TextField
                                        type='number'
                                        defaultValue={addPeriodically}
                                        onChange={handleChangeAddPeriodically}
                                        sx={{
                                            '& .MuiInputBase-root .MuiInputBase-input ': { color: (localStorage.getItem('theme') === 'dark' ? '#fff' : '#000') },
                                            '& .MuiInputBase-root .MuiInputAdornment-root .MuiButtonBase-root  ': { color: (localStorage.getItem('theme') === 'dark' ? '#fff' : '#000') },
                                            '& .MuiInputBase-formControl': { backgroundColor: 'rgba(92, 92, 92, 0.50)' },
                                            '& .MuiOutlinedInput-input': { width: '218px', paddingTop: '5.5px', paddingBottom: '5.5px', textAlign: 'right' },
                                        }} />
                                </div>
                            </div>
                        ) : (
                            <div></div>
                        )}

                        {/* Phân bổ đều */}
                        <div className='py-3'>
                            <label className="material-checkbox text-white">
                                <input
                                    type="checkbox"
                                    name="allocation"
                                />
                                <span className="checkmark"></span>
                                <span>Phân bổ đều</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className='col-span-8'>
                    <div className='grid grid-cols-12 border-solid border-[#9E9E9E] border-b-2 border-t-0 border-x-0'>
                        <span className='dark:text-white text-black font-semibold col-span-4 py-1 flex items-center'>Phân bổ danh mục</span>
                        <div className='dark:text-white text-black font-semibold col-span-8 py-1 flex items-center justify-between w-[400px]'>
                            <span>Chọn mã cổ phiếu</span>
                            <TextField
                                inputProps={
                                    { readOnly: true, }
                                }
                                placeholder='Thêm mã'
                                sx={{
                                    '& .MuiInputBase-root .MuiInputBase-input ': { color: (localStorage.getItem('theme') === 'dark' ? '#fff' : '#000') },
                                    '& .MuiInputBase-root .MuiInputAdornment-root .MuiButtonBase-root  ': { color: (localStorage.getItem('theme') === 'dark' ? '#fff' : '#000') },
                                    '& .MuiInputBase-formControl': { backgroundColor: 'rgba(92, 92, 92, 0.50)' },
                                    '& .MuiOutlinedInput-input': { width: '218px', paddingTop: '5.5px', paddingBottom: '5.5px' },
                                    '& .MuiInputBase-root': { borderRadius: '10px' }
                                }} />
                        </div>
                    </div>
                    <div className='pt-3'>
                        <table className='w-full border-collapse text-white'>
                            <thead className='bg-[#13476B]'>
                                <tr>
                                    <th className='px-3 py-2 text-center border border-solid border-[#9E9E9E] w-[357px]'>Mã</th>
                                    <th className='px-3 py-2 text-center border border-solid border-[#9E9E9E]'>Danh mục 1</th>
                                    <th className='px-3 py-2 text-center border border-solid border-[#9E9E9E]'>Danh mục 2</th>
                                    <th className='px-3 py-2 text-center border border-solid border-[#9E9E9E]'>Danh mục 3</th>
                                </tr>
                            </thead>
                            <tbody className='bg-[#5C5C5C]'>
                                <tr>
                                    <td className='border border-solid border-[#9E9E9E]'>
                                        <div className='flex justify-between p-2'>
                                            <span className='text-sm'>HPG - Công ty Cổ phần Tập đoàn Hòa Phát</span>
                                            <button className="btn btn-del">
                                                <svg
                                                    viewBox="0 0 15 17.5"
                                                    height="17.5"
                                                    width="15"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="icon"
                                                    fill="white"
                                                >
                                                    <path
                                                        transform="translate(-2.5 -1.25)"
                                                        d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z"
                                                        id="Fill"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                    <td className='border border-solid border-[#9E9E9E]'>
                                        <div className="number flex justify-between p-2">
                                            <span className="minus cursor-pointer bg-black/25 px-2" onClick={handleMinusClick}>
                                                -
                                            </span>
                                            <input type="text" className='bg-transparent border-0 px-2 w-[50px] text-center' value={count} onChange={handleChangeCount} />
                                            <span className="plus cursor-pointer bg-black/25 px-2" onClick={handlePlusClick}>
                                                +
                                            </span>
                                        </div>
                                    </td>
                                    <td className='border border-solid border-[#9E9E9E]'>
                                        <div className="number flex justify-between p-2">
                                            <span className="minus cursor-pointer bg-black/25 px-2" onClick={handleMinusClickCate2}>
                                                -
                                            </span>
                                            <input type="text" className='bg-transparent border-0 px-2 w-[50px] text-center' value={countCate2} onChange={handleChangeCountCate2} />
                                            <span className="plus cursor-pointer bg-black/25 px-2" onClick={handlePlusClickCate2}>
                                                +
                                            </span>
                                        </div>
                                    </td>
                                    <td className='border border-solid border-[#9E9E9E]'>
                                        <div className="number flex justify-between p-2">
                                            <span className="minus cursor-pointer bg-black/25 px-2" onClick={handleMinusClickCate3}>
                                                -
                                            </span>
                                            <input type="text" className='bg-transparent border-0 px-2 w-[50px] text-center' value={countCate3} onChange={handleChangeCountCate3} />
                                            <span className="plus cursor-pointer bg-black/25 px-2" onClick={handlePlusClickCate3}>
                                                +
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='border border-solid border-[#9E9E9E]'>
                                        <div className='flex justify-between p-2'>
                                            <span className='text-sm'>VIC - Tập đoàn VINGROUP - CTCP</span>
                                            <button className="btn btn-del">
                                                <svg
                                                    viewBox="0 0 15 17.5"
                                                    height="17.5"
                                                    width="15"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="icon"
                                                    fill="white"
                                                >
                                                    <path
                                                        transform="translate(-2.5 -1.25)"
                                                        d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z"
                                                        id="Fill"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                    <td className='border border-solid border-[#9E9E9E]'>
                                        <div className="number flex justify-between p-2">
                                            <span className="minus cursor-pointer bg-black/25 px-2" onClick={handleMinusClick}>
                                                -
                                            </span>
                                            <input type="text" className='bg-transparent border-0 px-2 w-[50px] text-center' value={count} onChange={handleChangeCount} />
                                            <span className="plus cursor-pointer bg-black/25 px-2" onClick={handlePlusClick}>
                                                +
                                            </span>
                                        </div>
                                    </td>
                                    <td className='border border-solid border-[#9E9E9E]'>
                                        <div className="number flex justify-between p-2">
                                            <span className="minus cursor-pointer bg-black/25 px-2" onClick={handleMinusClickCate2}>
                                                -
                                            </span>
                                            <input type="text" className='bg-transparent border-0 px-2 w-[50px] text-center' value={countCate2} onChange={handleChangeCountCate2} />
                                            <span className="plus cursor-pointer bg-black/25 px-2" onClick={handlePlusClickCate2}>
                                                +
                                            </span>
                                        </div>
                                    </td>
                                    <td className='border border-solid border-[#9E9E9E]'>
                                        <div className="number flex justify-between p-2">
                                            <span className="minus cursor-pointer bg-black/25 px-2" onClick={handleMinusClickCate3}>
                                                -
                                            </span>
                                            <input type="text" className='bg-transparent border-0 px-2 w-[50px] text-center' value={countCate3} onChange={handleChangeCountCate3} />
                                            <span className="plus cursor-pointer bg-black/25 px-2" onClick={handlePlusClickCate3}>
                                                +
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='border border-solid border-[#9E9E9E]'>
                                        <div className='flex justify-between p-2'>
                                            <span className='text-sm'>VRE - Công ty Cổ phần Vincom Retail</span>
                                            <button className="btn btn-del">
                                                <svg
                                                    viewBox="0 0 15 17.5"
                                                    height="17.5"
                                                    width="15"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="icon"
                                                    fill="white"
                                                >
                                                    <path
                                                        transform="translate(-2.5 -1.25)"
                                                        d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z"
                                                        id="Fill"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                    <td className='border border-solid border-[#9E9E9E]'>
                                        <div className="number flex justify-between p-2">
                                            <span className="minus cursor-pointer bg-black/25 px-2" onClick={handleMinusClick}>
                                                -
                                            </span>
                                            <input type="text" className='bg-transparent border-0 px-2 w-[50px] text-center' value={count} onChange={handleChangeCount} />
                                            <span className="plus cursor-pointer bg-black/25 px-2" onClick={handlePlusClick}>
                                                +
                                            </span>
                                        </div>
                                    </td>
                                    <td className='border border-solid border-[#9E9E9E]'>
                                        <div className="number flex justify-between p-2">
                                            <span className="minus cursor-pointer bg-black/25 px-2" onClick={handleMinusClickCate2}>
                                                -
                                            </span>
                                            <input type="text" className='bg-transparent border-0 px-2 w-[50px] text-center' value={countCate2} onChange={handleChangeCountCate2} />
                                            <span className="plus cursor-pointer bg-black/25 px-2" onClick={handlePlusClickCate2}>
                                                +
                                            </span>
                                        </div>
                                    </td>
                                    <td className='border border-solid border-[#9E9E9E]'>
                                        <div className="number flex justify-between p-2">
                                            <span className="minus cursor-pointer bg-black/25 px-2" onClick={handleMinusClickCate3}>
                                                -
                                            </span>
                                            <input type="text" className='bg-transparent border-0 px-2 w-[50px] text-center' value={countCate3} onChange={handleChangeCountCate3} />
                                            <span className="plus cursor-pointer bg-black/25 px-2" onClick={handlePlusClickCate3}>
                                                +
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='border border-solid border-[#9E9E9E] text-right p-2 font-bold'>Tổng:</td>
                                    <td className='border border-solid border-[#9E9E9E] text-center text-[#0BFFC4] p-2 font-bold'>100%</td>
                                    <td className='border border-solid border-[#9E9E9E] text-center text-[#0BFFC4] p-2 font-bold'>100%</td>
                                    <td className='border border-solid border-[#9E9E9E] text-center text-[#0BFFC4] p-2 font-bold'>100%</td>
                                </tr>

                                <tr>
                                    <td className='border border-solid border-[#9E9E9E] h-[106px] text-center font-bold' colSpan={4}>Chưa có mã nào trong danh mục</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='grid place-items-center pt-5'>
                        <button className='w-[188px] h-[32px] bg-[#9E9E9E] rounded-[10px] text-[15px] text-center uppercase font-bold grid place-items-center cursor-pointer'>Kiểm thử</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvestSimulation