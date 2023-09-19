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

    return (
        <div>
            <div className='grid grid-cols-12 gap-8 pt-5'>
                <div className='col-span-4'>
                    <div className='border-solid border-[#9E9E9E] border-b-2 border-t-0 border-x-0'>
                        <span className='dark:text-white text-black font-semibold'>Thiết lập thông số</span>
                    </div>
                    {/* Vốn đầu tư ban đầu */}
                    <div className='dark:text-white text-black'>
                        <div className='py-3 flex items-center justify-between'>
                            <span>Vốn đầu tư ban đầu (Tr)</span>
                            <TextField
                                type='number'
                                defaultValue={initialCapital}
                                sx={{
                                    '& .MuiInputBase-root .MuiInputBase-input ': { color: (localStorage.getItem('theme') === 'dark' ? '#fff' : '#000') },
                                    '& .MuiInputBase-root .MuiInputAdornment-root .MuiButtonBase-root  ': { color: (localStorage.getItem('theme') === 'dark' ? '#fff' : '#000') },
                                    '& .MuiInputBase-formControl': { backgroundColor: 'rgba(92, 92, 92, 0.50)' },
                                    '& .MuiOutlinedInput-input': { width: '218px', paddingTop: '6px', paddingBottom: '6px', textAlign: 'right' },
                                }}
                                onChange={handleChangeInitialCapital} />
                        </div>
                        <div className='py-3 flex items-center justify-between'>
                            <span>Khoảng thời gian giả lập</span>
                            <FormControl>
                                <Select
                                    sx={{
                                        '& .MuiSelect-select': { color: (localStorage.getItem('theme') === 'dark' ? '#fff' : '#000'), width: '200px', textAlign: 'right', paddingTop: '6px', paddingBottom: '6px' },
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
                                        '& .MuiInputBase-input': { padding: '6px 0px 6px 14px' },
                                        '& .MuiOutlinedInput-input': { textAlign: 'right' }
                                    }}
                                    disableFuture
                                    value={fromMonth}
                                    onChange={(newValue) => {
                                        setFromMonth(newValue)
                                    }} />
                            </div>
                        </div>
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
                                        '& .MuiInputBase-input': { padding: '6px 0px 6px 14px' },
                                        '& .MuiOutlinedInput-input': { textAlign: 'right' }
                                    }}
                                    disableFuture
                                    value={toMonth}
                                    onChange={(newValue) => {
                                        setToMonth(newValue)
                                    }} />
                            </div>
                        </div>
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
                                        '& .MuiOutlinedInput-input': { width: '218px', paddingTop: '6px', paddingBottom: '6px', textAlign: 'right' },
                                    }} />
                            </div>
                        </div>
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
                                            '& .MuiOutlinedInput-input': { width: '218px', paddingTop: '6px', paddingBottom: '6px', textAlign: 'right' },
                                        }} />
                                </div>
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
                                            '& .MuiOutlinedInput-input': { width: '218px', paddingTop: '6px', paddingBottom: '6px', textAlign: 'right' },
                                        }} />
                                </div>
                            </div>
                        ) : (
                            <div></div>
                        )}
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
                <div className='col-span-8'></div>
            </div>
        </div>
    )
}

export default InvestSimulation