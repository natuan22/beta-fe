import { DatePicker } from "@mui/x-date-pickers";
import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "react-use";
import { fetchDataInvestSimulation, fetchStockList } from "../thunk";
import { Button, message, Space } from "antd";

const InvestSimulation = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const dispatch = useDispatch();
    const { dataStockList } = useSelector((state) => state.investTool);
    const color = useSelector((state) => state.color.colorTheme);
    const [theme, setTheme] = useState(localStorage.getItem("theme"));

    const [initialCapital, setInitialCapital] = useState(1000); // Vốn đầu tư ban đầu
    const [period, setPeriod] = useState("3"); // Khoảng thời gian giả lập
    const [fromMonth, setFromMonth] = useState(dayjs().subtract(13, "month")); // Từ tháng
    const [toMonth, setToMonth] = useState(dayjs().subtract(1, "month")); // Đến tháng
    const [readOnlyDateTimePicker, setReadOnlyDateTimePicker] = useState(false);
    const [periodicInvestment, setPeriodicInvestment] = useState(false); // Đầu tư định kỳ
    const [addPeriodically, setAddPeriodically] = useState(10); // Thêm định kỳ
    const [allocation, setAllocation] = useState(false) // Phân bổ đều

    const [debouncedValue, setDebouncedValue] = useState("");
    const [val, setVal] = useState("");
    const [dataSearch, setDataSearch] = useState([]);
    const [arrCode, setArrCode] = useState([]);
    const [isFocus, setIsFocus] = useState(false);

    const [formData, setFormData] = useState({
        "value": 1000,
        "from": dayjs().subtract(13, "month").format('MM/YYYY'),
        "to": dayjs().subtract(1, "month").format('MM/YYYY'),
        "isPeriodic": periodicInvestment ? 1 : 0,
        "period": 1,
        "value_period": 10,
        "category": [],
    });

    const wrapperRef = useRef(null); // Ref cho phần div chứa dữ liệu
    useEffect(() => {
        function handleClickOutside(event) {
            // Kiểm tra xem người dùng có click ra ngoài giao diện không
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsFocus(false); // Nếu click ra ngoài, ẩn div chứa dữ liệu
            }
        }

        // Thêm sự kiện click vào document
        document.addEventListener("mousedown", handleClickOutside);

        // Xóa sự kiện khi component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (arrCode.length > 0) {
            const mappedArrCode = arrCode.map(item => {
                return {
                    'code': item.code,
                    'category_1': item.category_1,
                    'category_2': item.category_2,
                    'category_3': item.category_3
                }
            })
            setFormData((prevData) => ({
                ...prevData,
                'category': mappedArrCode,
            }));
        }
    }, [arrCode])

    useEffect(() => {
        setTheme(color);
        if (period != 5) {
            setReadOnlyDateTimePicker(true);
        } else {
            setReadOnlyDateTimePicker(false);
        }
    }, [color, readOnlyDateTimePicker, period]);

    useEffect(() => {
        if (debouncedValue === "") {
            setDataSearch([]);
            return;
        }
        dispatch(fetchStockList(debouncedValue));
    }, [dispatch, debouncedValue]);
    // debounce
    const [, cancel] = useDebounce(
        () => {
            setDebouncedValue(val);
        },
        500,
        [val]
    );
    useEffect(() => {
        if (dataStockList && debouncedValue) setDataSearch(dataStockList);
    }, [dataStockList]);

    const onPeriodicInvestmentChange = () => {
        setPeriodicInvestment(!periodicInvestment);

        setFormData((prevData) => ({
            ...prevData,
            'isPeriodic': !periodicInvestment ? 1 : 0,
        }));
    };

    const handleChangePeriod = (event) => {
        setPeriod(event.target.value);
        switch (event.target.value) {
            case 1:
                setFromMonth(dayjs().subtract(3, "month"));
                break;
            case 2:
                setFromMonth(dayjs().subtract(6, "month"));
                break;
            case 3:
                setFromMonth(dayjs().subtract(13, "month"));
                break;
            case 4:
                setFromMonth(dayjs().subtract(37, "month"));
                break;
            default:
                break;
        }
    };

    const handleChangeInitialCapital = (event) => {
        const formattedValue = event.target.value.replace(/,/g, ''); // Loại bỏ tất cả dấu phẩy
        const numericValue = parseFloat(formattedValue); // Chuyển đổi thành số

        setInitialCapital(numericValue);

        setFormData((prevData) => ({
            ...prevData,
            'value': numericValue,
        }));
    };

    const handleChangeAddPeriodically = (event) => {
        const formattedValue = event.target.value.replace(/,/g, ''); // Loại bỏ tất cả dấu phẩy
        const numericValue = parseFloat(formattedValue); // Chuyển đổi thành số

        setAddPeriodically(numericValue);

        setFormData((prevData) => ({
            ...prevData,
            'value_period': numericValue,
        }));
    };

    // DANH MỤC 1
    const handleMinusClick = (text, index) => {
        const updatedArrCode = [...arrCode]; // Tạo một bản sao của mảng arrCode để cập nhật giá trị

        switch (text) {
            case 'category_1':
                updatedArrCode[index].category_1 = updatedArrCode[index].category_1 > 1 ? updatedArrCode[index].category_1 - 1 : 0;
                break;
            case 'category_2':
                updatedArrCode[index].category_2 = updatedArrCode[index].category_2 > 1 ? updatedArrCode[index].category_2 - 1 : 0;
                break;
            case 'category_3':
                updatedArrCode[index].category_3 = updatedArrCode[index].category_3 > 1 ? updatedArrCode[index].category_3 - 1 : 0;
                break;
            default:
                break;
        }

        // Cập nhật giá trị trong mảng arrCode và kích hoạt việc cập nhật giao diện
        setArrCode(updatedArrCode);
    };


    const handlePlusClick = (text, index) => {
        const updatedArrCode = [...arrCode]; // Tạo một bản sao của mảng arrCode để cập nhật giá trị

        switch (text) {
            case 'category_1':
                updatedArrCode[index].category_1 = updatedArrCode[index].category_1 + 1
                break;
            case 'category_2':
                updatedArrCode[index].category_2 = updatedArrCode[index].category_2 + 1
                break;
            case 'category_3':
                updatedArrCode[index].category_3 = updatedArrCode[index].category_3 + 1
                break;
            default:
                break;
        }

        // Cập nhật giá trị trong mảng arrCode và kích hoạt việc cập nhật giao diện
        setArrCode(updatedArrCode);
    };

    const handleChangeCount = (event, text, index) => {
        const updatedArrCode = [...arrCode]; // Tạo một bản sao của mảng arrCode để cập nhật giá trị

        switch (text) {
            case 'category_1':
                updatedArrCode[index].category_1 = +event.target.value
                break;
            case 'category_2':
                updatedArrCode[index].category_2 = +event.target.value
                break;
            case 'category_3':
                updatedArrCode[index].category_3 = +event.target.value

                break;
            default:
                break;
        }
        setArrCode(updatedArrCode);
    };

    const totalCategory_1 = arrCode.reduce((total, item) => total + item.category_1, 0);
    const totalCategory_2 = arrCode.reduce((total, item) => total + item.category_2, 0);
    const totalCategory_3 = arrCode.reduce((total, item) => total + item.category_3, 0);

    const warning = (value) => {
        messageApi.open({
            type: "warning",
            content: value,
        });
    };

    const handleAddCode = (index) => {
        const newItem = dataSearch[index];

        // Kiểm tra xem phần tử đã tồn tại trong mảng arrCode chưa
        const isItemExist = arrCode.some((item) => item.code === newItem.code);

        if (!isItemExist) {
            if (arrCode.length < 10) {
                // Thêm phần tử mới vào mảng arrCode
                const updatedArrCode = [
                    ...arrCode,
                    {
                        ...newItem,
                        category_1: 0,
                        category_2: 0,
                        category_3: 0,
                    },
                ];

                // Kiểm tra và cập nhật category nếu allocation là true
                if (allocation) {
                    const lengthArr = updatedArrCode.length;
                    const baseValue = +(100 / lengthArr).toFixed(2);
                    const remainingCategories = 100 - (baseValue * (lengthArr - 1));

                    const updateCateValue = updatedArrCode.map((item, index) => {
                        return {
                            ...item,
                            'category_1': index === lengthArr - 1 ? +(remainingCategories).toFixed(2) : baseValue,
                            'category_2': index === lengthArr - 1 ? +(remainingCategories).toFixed(2) : baseValue,
                            'category_3': index === lengthArr - 1 ? +(remainingCategories).toFixed(2) : baseValue,
                        };
                    });

                    setArrCode(updateCateValue);
                } else {
                    setArrCode(updatedArrCode);
                }
            } else {
                warning(`Tối đa là 10 mã thôi nhé bae !!`);
            }
        } else {
            warning(`Mã này đã có trong danh sách rồi bạn nhé !!`);
        }
    };

    const handleDelArrCode = (code) => {
        const updatedArr = arrCode.filter((key) => key.code !== code);

        if (allocation) {
            const lengthArr = updatedArr.length;
            const baseValue = +(100 / lengthArr).toFixed(2);
            const remainingCategories = 100 - (baseValue * (lengthArr - 1));

            const updateCateValue = updatedArr.map((item, index) => {
                return {
                    ...item,
                    'category_1': index === lengthArr - 1 ? +(remainingCategories).toFixed(2) : baseValue,
                    'category_2': index === lengthArr - 1 ? +(remainingCategories).toFixed(2) : baseValue,
                    'category_3': index === lengthArr - 1 ? +(remainingCategories).toFixed(2) : baseValue,
                };
            });
            setArrCode(updateCateValue);
        }
    };

    const callApi = () => {
        dispatch(fetchDataInvestSimulation(formData))
    }

    const onAllocationChange = () => {
        setAllocation(!allocation)

        const lengthArr = arrCode.length

        const updateCateValue = arrCode.map((item, index) => {
            if (!allocation) {
                const isLastItem = arrCode.length - 1 === index;
                const baseValue = +(100 / lengthArr).toFixed(2);

                return {
                    ...item,
                    'category_1': isLastItem ? +(100 - baseValue * (lengthArr - 1)).toFixed(2) : baseValue,
                    'category_2': isLastItem ? +(100 - baseValue * (lengthArr - 1)).toFixed(2) : baseValue,
                    'category_3': isLastItem ? +(100 - baseValue * (lengthArr - 1)).toFixed(2) : baseValue,
                };
            } else {
                return {
                    ...item,
                    'category_1': 0,
                    'category_2': 0,
                    'category_3': 0,
                };
            }
        });

        setArrCode(updateCateValue);
    };

    console.log({ arrCode })
    return (
        <div>
            {contextHolder}
            <div className="grid grid-cols-12 gap-8 pt-2">
                <div className="col-span-4">
                    <div className="border-solid border-[#9E9E9E] border-b-2 border-t-0 border-x-0">
                        <div className="dark:text-white text-black font-semibold h-[42px] flex items-center">
                            Thiết lập thông số
                        </div>
                    </div>

                    <div className="dark:text-white text-black h-[503px]">
                        {/* Vốn đầu tư ban đầu */}
                        <div className="py-3 flex items-center justify-between">
                            <span>Vốn đầu tư ban đầu (Tr)</span>
                            <NumericFormat
                                value={initialCapital}
                                customInput={TextField}
                                onChange={handleChangeInitialCapital}
                                sx={{
                                    "& .MuiInputBase-root .MuiInputBase-input ": {
                                        color:
                                            localStorage.getItem("theme") === "dark"
                                                ? "#fff"
                                                : "#000",
                                    },
                                    "& .MuiInputBase-root .MuiInputAdornment-root .MuiButtonBase-root  ":
                                    {
                                        color:
                                            localStorage.getItem("theme") === "dark"
                                                ? "#fff"
                                                : "#000",
                                    },
                                    "& .MuiInputBase-formControl": {
                                        backgroundColor: "rgba(92, 92, 92, 0.50)",
                                    },
                                    "& .MuiOutlinedInput-input": {
                                        width: "218px",
                                        paddingTop: "5.5px",
                                        paddingBottom: "5.5px",
                                        textAlign: "right",
                                    },
                                }}
                                thousandSeparator
                            />
                        </div>

                        {/* Khoảng thời gian giả lập */}
                        <div className="py-3 flex items-center justify-between">
                            <span>Khoảng thời gian giả lập</span>
                            <FormControl>
                                <Select
                                    sx={{
                                        "& .MuiSelect-select": {
                                            color:
                                                localStorage.getItem("theme") === "dark"
                                                    ? "#fff"
                                                    : "#000",
                                            width: "200px",
                                            textAlign: "right",
                                            paddingTop: "5.5px",
                                            paddingBottom: "5.5px",
                                        },
                                        "& .MuiSvgIcon-root": {
                                            color:
                                                localStorage.getItem("theme") === "dark"
                                                    ? "#fff"
                                                    : "#000",
                                        },
                                        "& .MuiInputBase-input": {
                                            backgroundColor: "rgba(92, 92, 92, 0.50)",
                                        },
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
                        <div className="py-3 flex items-center justify-between">
                            <span className="dark:text-white text-black">Từ tháng</span>
                            <div className="ml-4">
                                <DatePicker
                                    readOnly={readOnlyDateTimePicker}
                                    format="MM/YYYY"
                                    margin="normal"
                                    views={["year", "month"]} // Chỉ cho phép chọn tháng và năm
                                    openTo="year" // Mở calendar với view là năm
                                    autoOk={true} // Tự động chấp nhận ngày khi chọn tháng và năm
                                    clearable // Cho phép xóa giá trị
                                    sx={{
                                        "& .MuiInputBase-root .MuiInputBase-input ": {
                                            color:
                                                localStorage.getItem("theme") === "dark"
                                                    ? "#fff"
                                                    : "#000",
                                        },
                                        "& .MuiInputBase-root .MuiInputAdornment-root .MuiButtonBase-root  ":
                                        {
                                            color:
                                                localStorage.getItem("theme") === "dark"
                                                    ? "#fff"
                                                    : "#000",
                                        },
                                        "& .MuiInputBase-formControl": {
                                            backgroundColor: "rgba(92, 92, 92, 0.50)",
                                        },
                                        "& .MuiInputBase-input": {
                                            padding: "5.5px 0px 5.5px 14px",
                                        },
                                        "& .MuiOutlinedInput-input": { textAlign: "right" },
                                    }}
                                    disableFuture
                                    value={fromMonth}
                                    onChange={(newValue) => {
                                        setFromMonth(newValue);
                                        setFormData((prevData) => ({
                                            ...prevData,
                                            'from': dayjs(newValue).format('MM/YYYY'),
                                        }));
                                    }}
                                />
                            </div>
                        </div>

                        {/* Đến tháng */}
                        <div className="py-3 flex items-center justify-between">
                            <span className="dark:text-white text-black">Đến tháng</span>
                            <div className="ml-4">
                                <DatePicker
                                    readOnly={readOnlyDateTimePicker}
                                    format="MM/YYYY"
                                    margin="normal"
                                    views={["year", "month"]} // Chỉ cho phép chọn tháng và năm
                                    openTo="year" // Mở calendar với view là năm
                                    autoOk={true} // Tự động chấp nhận ngày khi chọn tháng và năm
                                    clearable // Cho phép xóa giá trị
                                    sx={{
                                        "& .MuiInputBase-root .MuiInputBase-input ": {
                                            color:
                                                localStorage.getItem("theme") === "dark"
                                                    ? "#fff"
                                                    : "#000",
                                        },
                                        "& .MuiInputBase-root .MuiInputAdornment-root .MuiButtonBase-root  ":
                                        {
                                            color:
                                                localStorage.getItem("theme") === "dark"
                                                    ? "#fff"
                                                    : "#000",
                                        },
                                        "& .MuiInputBase-formControl": {
                                            backgroundColor: "rgba(92, 92, 92, 0.50)",
                                        },
                                        "& .MuiInputBase-input": {
                                            padding: "5.5px 0px 5.5px 14px",
                                        },
                                        "& .MuiOutlinedInput-input": { textAlign: "right" },
                                    }}
                                    disableFuture
                                    value={toMonth}
                                    onChange={(newValue) => {
                                        setToMonth(newValue);
                                        setFormData((prevData) => ({
                                            ...prevData,
                                            'to': dayjs(newValue).format('MM/YYYY'),
                                        }));
                                    }}
                                />
                            </div>
                        </div>

                        {/* Chỉ số tham chiếu */}
                        <div className="py-3 flex items-center justify-between">
                            <span>Chỉ số tham chiếu</span>
                            <div>
                                <TextField
                                    inputProps={{ readOnly: true }}
                                    defaultValue={"VN-INDEX"}
                                    sx={{
                                        "& .MuiInputBase-root .MuiInputBase-input ": {
                                            color:
                                                localStorage.getItem("theme") === "dark"
                                                    ? "#fff"
                                                    : "#000",
                                        },
                                        "& .MuiInputBase-root .MuiInputAdornment-root .MuiButtonBase-root  ":
                                        {
                                            color:
                                                localStorage.getItem("theme") === "dark"
                                                    ? "#fff"
                                                    : "#000",
                                        },
                                        "& .MuiInputBase-formControl": {
                                            backgroundColor: "rgba(92, 92, 92, 0.50)",
                                        },
                                        "& .MuiOutlinedInput-input": {
                                            width: "218px",
                                            paddingTop: "5.5px",
                                            paddingBottom: "5.5px",
                                            textAlign: "right",
                                        },
                                    }}
                                />
                            </div>
                        </div>

                        {/* Đầu tư định kỳ */}
                        <div className="py-3">
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
                                <div className="py-3 flex items-center justify-between">
                                    <span>Kỳ hạn:</span>
                                    <TextField
                                        inputProps={{ readOnly: true }}
                                        defaultValue={"Hằng tháng"}
                                        sx={{
                                            "& .MuiInputBase-root .MuiInputBase-input ": {
                                                color:
                                                    localStorage.getItem("theme") === "dark"
                                                        ? "#fff"
                                                        : "#000",
                                            },
                                            "& .MuiInputBase-root .MuiInputAdornment-root .MuiButtonBase-root  ":
                                            {
                                                color:
                                                    localStorage.getItem("theme") === "dark"
                                                        ? "#fff"
                                                        : "#000",
                                            },
                                            "& .MuiInputBase-formControl": {
                                                backgroundColor: "rgba(92, 92, 92, 0.50)",
                                            },
                                            "& .MuiOutlinedInput-input": {
                                                width: "218px",
                                                paddingTop: "5.5px",
                                                paddingBottom: "5.5px",
                                                textAlign: "right",
                                            },
                                        }}
                                    />
                                </div>

                                {/* Thêm định kỳ (Tr): */}
                                <div className="py-3 flex items-center justify-between">
                                    <span>Thêm định kỳ (Tr):</span>
                                    <NumericFormat
                                        value={addPeriodically}
                                        customInput={TextField}
                                        onChange={handleChangeAddPeriodically}
                                        sx={{
                                            "& .MuiInputBase-root .MuiInputBase-input ": {
                                                color:
                                                    localStorage.getItem("theme") === "dark"
                                                        ? "#fff"
                                                        : "#000",
                                            },
                                            "& .MuiInputBase-root .MuiInputAdornment-root .MuiButtonBase-root  ":
                                            {
                                                color:
                                                    localStorage.getItem("theme") === "dark"
                                                        ? "#fff"
                                                        : "#000",
                                            },
                                            "& .MuiInputBase-formControl": {
                                                backgroundColor: "rgba(92, 92, 92, 0.50)",
                                            },
                                            "& .MuiOutlinedInput-input": {
                                                width: "218px",
                                                paddingTop: "5.5px",
                                                paddingBottom: "5.5px",
                                                textAlign: "right",
                                            },
                                        }}
                                        thousandSeparator
                                    />
                                </div>
                            </div>
                        ) : (
                            <div></div>
                        )}

                        {/* Phân bổ đều */}
                        <div className="py-3">
                            <label className="material-checkbox text-white">
                                <input
                                    type="checkbox"
                                    name="allocation"
                                    checked={allocation}
                                    disabled={arrCode.length === 0 ? true : false}
                                    onChange={onAllocationChange}
                                />
                                <span className="checkmark"></span>
                                <span>Phân bổ đều</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="col-span-8">
                    <div className="grid grid-cols-12 border-solid border-[#9E9E9E] border-b-2 border-t-0 border-x-0 relative">
                        {dataSearch?.length > 0 && isFocus && (
                            <div
                                ref={wrapperRef}
                                className="absolute w-[400px] h-[200px] top-[40px] right-[230px] bg-[#2e2e2e] shadow-lg z-[30] rounded-xl p-3 overflow-y-auto"
                            >
                                {dataSearch?.map((item, index) => {
                                    return (
                                        <div
                                            onClick={() => {
                                                handleAddCode(index);
                                            }}
                                            key={index}
                                            className="text-white flex justify-between items-center border-solid border border-b-2 border-t-0 border-x-0 border-white/50  p-2 hover:bg-gray-600 duration-500 cursor-cell"
                                        >
                                            <span className="w-[20px]">{item.code}</span>
                                            <div className="w-[10px] h-[2px] bg-white"></div>
                                            <span className="w-[300px] text-sm">
                                                {item.company_name}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        <span className="dark:text-white text-black font-semibold col-span-4 py-1 flex items-center">
                            Phân bổ danh mục
                        </span>
                        <div className="dark:text-white text-black font-semibold col-span-8 py-1 flex items-center justify-between w-[400px]">
                            <span>Chọn mã cổ phiếu</span>
                            <TextField
                                onFocus={() => {
                                    setIsFocus(true);
                                }}
                                placeholder="Thêm mã"
                                onChange={({ currentTarget }) => {
                                    setVal(currentTarget.value);
                                }}
                                sx={{
                                    "& .MuiInputBase-root .MuiInputBase-input ": {
                                        color:
                                            localStorage.getItem("theme") === "dark"
                                                ? "#fff"
                                                : "#000",
                                    },
                                    "& .MuiInputBase-root .MuiInputAdornment-root .MuiButtonBase-root  ":
                                    {
                                        color:
                                            localStorage.getItem("theme") === "dark"
                                                ? "#fff"
                                                : "#000",
                                    },
                                    "& .MuiInputBase-formControl": {
                                        backgroundColor: "rgba(92, 92, 92, 0.50)",
                                    },
                                    "& .MuiOutlinedInput-input": {
                                        width: "218px",
                                        paddingTop: "5.5px",
                                        paddingBottom: "5.5px",
                                    },
                                    "& .MuiInputBase-root": { borderRadius: "10px" },
                                }}
                            />
                        </div>
                    </div>
                    <div className="pt-3">
                        <table className="w-full border-collapse text-white">
                            <thead className="bg-[#13476B]">
                                <tr>
                                    <th className="px-3 py-2 text-center border border-solid border-[#9E9E9E] w-[357px]">
                                        Mã
                                    </th>
                                    <th className="px-3 py-2 text-center border border-solid border-[#9E9E9E]">
                                        Danh mục 1
                                    </th>
                                    <th className="px-3 py-2 text-center border border-solid border-[#9E9E9E]">
                                        Danh mục 2
                                    </th>
                                    <th className="px-3 py-2 text-center border border-solid border-[#9E9E9E]">
                                        Danh mục 3
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-[#5C5C5C]">
                                {arrCode?.length > 0 ? (
                                    <>
                                        {arrCode?.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="border border-solid border-[#9E9E9E]">
                                                        <div className="flex justify-between p-2">
                                                            <span className="text-sm">
                                                                {item.code} - {item.company_name}
                                                            </span>
                                                            <button
                                                                onClick={() => {
                                                                    handleDelArrCode(item.code);
                                                                }}
                                                                className="btn btn-del"
                                                            >
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
                                                    <td className="border border-solid border-[#9E9E9E]">
                                                        <div className="number flex justify-between p-2">
                                                            <span
                                                                className="minus cursor-pointer bg-black/25 px-2"
                                                                onClick={() => {
                                                                    handleMinusClick('category_1', index)
                                                                }}
                                                            >
                                                                -
                                                            </span>
                                                            <input
                                                                type="text"
                                                                className="bg-transparent border-0 px-2 w-[50px] text-center"
                                                                value={item.category_1}
                                                                onChange={(event) => {
                                                                    handleChangeCount(event, 'category_1', index)
                                                                }}
                                                            />
                                                            <span
                                                                className="plus cursor-pointer bg-black/25 px-2"
                                                                onClick={() => {
                                                                    handlePlusClick('category_1', index)
                                                                }}
                                                            >
                                                                +
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="border border-solid border-[#9E9E9E]">
                                                        <div className="number flex justify-between p-2">
                                                            <span
                                                                className="minus cursor-pointer bg-black/25 px-2"
                                                                onClick={() => {
                                                                    handleMinusClick('category_2', index)
                                                                }}

                                                            >
                                                                -
                                                            </span>
                                                            <input
                                                                type="text"
                                                                className="bg-transparent border-0 px-2 w-[50px] text-center"
                                                                value={item.category_2}
                                                                onChange={(event) => {
                                                                    handleChangeCount(event, 'category_2', index)
                                                                }}

                                                            />
                                                            <span
                                                                className="plus cursor-pointer bg-black/25 px-2"
                                                                onClick={() => {
                                                                    handlePlusClick('category_2', index)
                                                                }}
                                                            >
                                                                +
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="border border-solid border-[#9E9E9E]">
                                                        <div className="number flex justify-between p-2">
                                                            <span
                                                                className="minus cursor-pointer bg-black/25 px-2"
                                                                onClick={() => {
                                                                    handleMinusClick('category_3', index)
                                                                }}
                                                            >
                                                                -
                                                            </span>
                                                            <input
                                                                type="text"
                                                                className="bg-transparent border-0 px-2 w-[50px] text-center"
                                                                value={item.category_3}
                                                                onChange={(event) => {
                                                                    handleChangeCount(event, 'category_3', index)
                                                                }}


                                                            />
                                                            <span
                                                                className="plus cursor-pointer bg-black/25 px-2"
                                                                onClick={() => {
                                                                    handlePlusClick('category_3', index)
                                                                }}
                                                            >
                                                                +
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        <tr>
                                            <td className="border border-solid border-[#9E9E9E] text-right p-2 font-bold">
                                                Tổng:
                                            </td>
                                            <td className={`border border-solid border-[#9E9E9E] text-center ${totalCategory_1 === 100 ? 'text-[#0BFFC4]' : 'text-red-500'} p-2 font-bold`}>
                                                {totalCategory_1}%
                                            </td>
                                            <td className={`border border-solid border-[#9E9E9E] text-center ${totalCategory_2 === 100 ? 'text-[#0BFFC4]' : 'text-red-500'} p-2 font-bold`}>
                                                {totalCategory_2}%
                                            </td>
                                            <td className={`border border-solid border-[#9E9E9E] text-center ${totalCategory_3 === 100 ? 'text-[#0BFFC4]' : 'text-red-500'} p-2 font-bold`}>
                                                {totalCategory_3}%
                                            </td>
                                        </tr>
                                    </>
                                ) : (
                                    <tr>
                                        <td
                                            className="border border-solid border-[#9E9E9E] h-[106px] text-center font-bold"
                                            colSpan={4}
                                        >
                                            Chưa có mã nào trong danh mục
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="grid place-items-center pt-5">
                        <button className="w-[188px] h-[32px] bg-[#9E9E9E] rounded-[10px] text-[15px] text-center uppercase font-bold grid place-items-center cursor-pointer"
                            onClick={callApi}>
                            Kiểm thử
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestSimulation;
