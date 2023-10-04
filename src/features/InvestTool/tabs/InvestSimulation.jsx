import { DatePicker } from "@mui/x-date-pickers";
import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "react-use";
import { fetchDataInvestSimulation, fetchStockList } from "../thunk";
import { message } from "antd";
import TestResults from "../components/InvestSimulation/TestResults";
import InvestEffectsCategory from "../components/InvestSimulation/InvestEffectsCategory";
import InvestEffectsStock from "../components/InvestSimulation/InvestEffectsStock";
import ProfitChart from "../components/InvestSimulation/ProfitChart";

const InvestSimulation = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const dispatch = useDispatch();
    const { dataStockList } = useSelector((state) => state.investTool);
    const { dataInvestSimulation } = useSelector((state) => state.investTool);
    const { data_1, data_2, data_3, data_4 } = dataInvestSimulation

    const color = useSelector((state) => state.color.colorTheme);
    const [theme, setTheme] = useState(localStorage.getItem("theme"));

    const [initialCapital, setInitialCapital] = useState(1000); // Vốn đầu tư ban đầu
    const [period, setPeriod] = useState("2"); // Khoảng thời gian giả lập
    const [fromMonth, setFromMonth] = useState(dayjs().subtract(6, "month")); // Từ tháng
    const [toMonth, setToMonth] = useState(dayjs().subtract(1, "month")); // Đến tháng
    const [readOnlyDateTimePicker, setReadOnlyDateTimePicker] = useState(false);
    const [periodicInvestment, setPeriodicInvestment] = useState(false); // Đầu tư định kỳ
    const [addPeriodically, setAddPeriodically] = useState(10); // Thêm định kỳ

    const [allocation, setAllocation] = useState(false) // Phân bổ đều
    const [sameMonthYear, setSameMonthYear] = useState(false) // Cùng tháng cùng năm

    const [debouncedValue, setDebouncedValue] = useState("");
    const [val, setVal] = useState("");
    const [dataSearch, setDataSearch] = useState([]);
    const [arrCode, setArrCode] = useState([]);
    const [isFocus, setIsFocus] = useState(false);

    const [formData, setFormData] = useState({
        value: 1000,
        from: dayjs().subtract(13, "month").format("MM/YYYY"),
        to: dayjs().subtract(1, "month").format("MM/YYYY"),
        isPeriodic: periodicInvestment ? 1 : 0,
        period: 1,
        value_period: 10,
        category: [],
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
            const mappedArrCode = arrCode.map((item) => {
                return {
                    code: item.code,
                    category_1: item.category_1,
                    category_2: item.category_2,
                    category_3: item.category_3,
                };
            });
            setFormData((prevData) => ({
                ...prevData,
                category: mappedArrCode,
            }));
        }
    }, [arrCode]);

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

    useEffect(() => {
        if (fromMonth.month() === toMonth.month() && fromMonth.year() === toMonth.year()) {
            setPeriodicInvestment(false)
            setSameMonthYear(true)
            setFormData((prevData) => ({
                ...prevData,
                'isPeriodic': 0,
            }));
            setShowData(false)
        }
        else {
            setSameMonthYear(false)
        }
    }, [fromMonth, toMonth, sameMonthYear])

    const onPeriodicInvestmentChange = () => {
        setPeriodicInvestment(!periodicInvestment);
        setFormData((prevData) => ({
            ...prevData,
            isPeriodic: !periodicInvestment ? 1 : 0,
        }));
        setShowData(false)
    };

    const handleChangePeriod = (event) => {
        setPeriod(event.target.value);
        switch (event.target.value) {
            case 1:
                setFromMonth(dayjs().subtract(3, "month"));
                setFormData((prevData) => ({
                    ...prevData,
                    'from': dayjs().subtract(3, "month").format('MM/YYYY'),
                    'to': dayjs().subtract(1, "month").format('MM/YYYY'),
                }))
                break;
            case 2:
                setFromMonth(dayjs().subtract(6, "month"));
                setFormData((prevData) => ({
                    ...prevData,
                    'from': dayjs().subtract(6, "month").format('MM/YYYY'),
                    'to': dayjs().subtract(1, "month").format('MM/YYYY'),
                }))
                break;
            case 3:
                setFromMonth(dayjs().subtract(13, "month"));
                setFormData((prevData) => ({
                    ...prevData,
                    'from': dayjs().subtract(13, "month").format('MM/YYYY'),
                    'to': dayjs().subtract(1, "month").format('MM/YYYY'),
                }))
                break;
            case 4:
                setFromMonth(dayjs().subtract(37, "month"));
                setFormData((prevData) => ({
                    ...prevData,
                    'from': dayjs().subtract(37, "month").format('MM/YYYY'),
                    'to': dayjs().subtract(1, "month").format('MM/YYYY'),
                }))
                break;
            default:
                break;
        }
        setShowData(false)
    };

    const handleChangeInitialCapital = (event) => {
        const formattedValue = event.target.value.replace(/,/g, ""); // Loại bỏ tất cả dấu phẩy
        const numericValue = parseFloat(formattedValue); // Chuyển đổi thành số

        setInitialCapital(numericValue);

        setFormData((prevData) => ({
            ...prevData,
            value: numericValue,
        }));

        setShowData(false)
    };

    const handleChangeAddPeriodically = (event) => {
        const formattedValue = event.target.value.replace(/,/g, ""); // Loại bỏ tất cả dấu phẩy
        const numericValue = parseFloat(formattedValue); // Chuyển đổi thành số

        setAddPeriodically(numericValue);

        setFormData((prevData) => ({
            ...prevData,
            value_period: numericValue,
        }));
        setShowData(false)
    };

    // DANH MỤC 1
    const handleMinusClick = (text, index) => {
        const updatedArrCode = [...arrCode]; // Tạo một bản sao của mảng arrCode để cập nhật giá trị

        switch (text) {
            case "category_1":
                updatedArrCode[index].category_1 =
                    updatedArrCode[index].category_1 > 1
                        ? updatedArrCode[index].category_1 - 1
                        : 0;
                break;
            case "category_2":
                updatedArrCode[index].category_2 =
                    updatedArrCode[index].category_2 > 1
                        ? updatedArrCode[index].category_2 - 1
                        : 0;
                break;
            case "category_3":
                updatedArrCode[index].category_3 =
                    updatedArrCode[index].category_3 > 1
                        ? updatedArrCode[index].category_3 - 1
                        : 0;
                break;
            default:
                break;
        }

        // Cập nhật giá trị trong mảng arrCode và kích hoạt việc cập nhật giao diện
        setArrCode(updatedArrCode);
        setShowData(false)
    };

    const handlePlusClick = (text, index) => {
        const updatedArrCode = [...arrCode]; // Tạo một bản sao của mảng arrCode để cập nhật giá trị

        switch (text) {
            case "category_1":
                updatedArrCode[index].category_1 = updatedArrCode[index].category_1 + 1;
                break;
            case "category_2":
                updatedArrCode[index].category_2 = updatedArrCode[index].category_2 + 1;
                break;
            case "category_3":
                updatedArrCode[index].category_3 = updatedArrCode[index].category_3 + 1;
                break;
            default:
                break;
        }

        // Cập nhật giá trị trong mảng arrCode và kích hoạt việc cập nhật giao diện
        setArrCode(updatedArrCode);
        setShowData(false)
    };

    const handleChangeCount = (event, text, index) => {
        const updatedArrCode = [...arrCode]; // Tạo một bản sao của mảng arrCode để cập nhật giá trị
        switch (text) {
            case "category_1":
                updatedArrCode[index].category_1 = +event.target.value;
                break;
            case "category_2":
                updatedArrCode[index].category_2 = +event.target.value;
                break;
            case "category_3":
                updatedArrCode[index].category_3 = +event.target.value;

                break;
            default:
                break;
        }
        setArrCode(updatedArrCode);
        setShowData(false)
    };

    const totalCategory_1 = Math.ceil(arrCode.reduce((total, item) => total + item.category_1, 0));
    const totalCategory_2 = Math.ceil(arrCode.reduce((total, item) => total + item.category_2, 0));
    const totalCategory_3 = Math.ceil(arrCode.reduce((total, item) => total + item.category_3, 0));

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
                    const remainingCategories = 100 - baseValue * (lengthArr - 1);

                    const updateCateValue = updatedArrCode.map((item, index) => {
                        return {
                            ...item,
                            category_1:
                                index === lengthArr - 1
                                    ? +remainingCategories.toFixed(2)
                                    : baseValue,
                            category_2:
                                index === lengthArr - 1
                                    ? +remainingCategories.toFixed(2)
                                    : baseValue,
                            category_3:
                                index === lengthArr - 1
                                    ? +remainingCategories.toFixed(2)
                                    : baseValue,
                        };
                    });

                    setArrCode(updateCateValue);
                } else {
                    setArrCode(updatedArrCode);
                }
            } else {
                warning(`Được chọn tối đa là 10 mã cổ phiếu !!`);
            }
        } else {
            warning(`Mã này đã có trong danh sách !!`);
        }
        setShowData(false)
    };

    const handleDelArrCode = (code) => {
        const updatedArr = arrCode.filter((key) => key.code !== code);

        if (allocation) {
            const lengthArr = updatedArr.length;
            const baseValue = +(100 / lengthArr).toFixed(2);
            const remainingCategories = 100 - baseValue * (lengthArr - 1);

            const updateCateValue = updatedArr.map((item, index) => {
                return {
                    ...item,
                    category_1:
                        index === lengthArr - 1
                            ? +remainingCategories.toFixed(2)
                            : baseValue,
                    category_2:
                        index === lengthArr - 1
                            ? +remainingCategories.toFixed(2)
                            : baseValue,
                    category_3:
                        index === lengthArr - 1
                            ? +remainingCategories.toFixed(2)
                            : baseValue,
                };
            });
            setArrCode(updateCateValue);
        } else {
            setArrCode(updatedArr)
        }
        setShowData(false)
    };

    const [showData, setShowData] = useState(false)

    const callApi = () => {
        setShowData(true)
        dispatch(fetchDataInvestSimulation(formData));
    };

    const onAllocationChange = () => {
        setAllocation(!allocation);

        const lengthArr = arrCode.length;

        const updateCateValue = arrCode.map((item, index) => {
            if (!allocation) {
                const isLastItem = arrCode.length - 1 === index;
                const baseValue = +(100 / lengthArr).toFixed(2);

                return {
                    ...item,
                    category_1: isLastItem
                        ? +(100 - baseValue * (lengthArr - 1)).toFixed(2)
                        : baseValue,
                    category_2: isLastItem
                        ? +(100 - baseValue * (lengthArr - 1)).toFixed(2)
                        : baseValue,
                    category_3: isLastItem
                        ? +(100 - baseValue * (lengthArr - 1)).toFixed(2)
                        : baseValue,
                };
            } else {
                return {
                    ...item,
                    category_1: 0,
                    category_2: 0,
                    category_3: 0,
                };
            }
        });

        setArrCode(updateCateValue);
        setShowData(false)
    };

    return (
        <div className="p-2">
            {contextHolder}
            <div className="grid xl:grid-cols-12 lg:grid-cols-none gap-8 pt-2">
                <div className="xl:col-span-4 lg:col-span-full">
                    <div className="border-solid border-[#9E9E9E] border-b-2 border-t-0 border-x-0">
                        <div className="dark:text-white text-black font-semibold h-[42px] flex items-center uppercase">
                            Thiết lập thông số
                        </div>
                    </div>

                    <div className="dark:text-white text-black ">
                        {/* Vốn đầu tư ban đầu */}
                        <div className="py-3 md:flex sm:block items-center justify-between">
                            <span>Vốn đầu tư ban đầu (Tr)</span>
                            <div className="flex justify-center pt-2">
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
                        </div>

                        {/* Khoảng thời gian giả lập */}
                        <div className="py-3 md:flex sm:block items-center justify-between">
                            <span>Khoảng thời gian giả lập</span>
                            <div className="flex justify-center pt-2">
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
                        </div>


                        {/* Từ tháng */}
                        <div className="py-3 md:flex sm:block items-center justify-between">
                            <span className="dark:text-white text-black">Từ tháng</span>
                            <div className="ml-4 flex justify-center pt-2">
                                <DatePicker
                                    maxDate={dayjs().subtract(1, 'month')}
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
                                            from: dayjs(newValue).format("MM/YYYY"),
                                        }));
                                        setShowData(false)
                                    }}
                                />
                            </div>
                        </div>

                        {/* Đến tháng */}
                        <div className="py-3 md:flex sm:block items-center justify-between">
                            <span className="dark:text-white text-black">Đến tháng</span>
                            <div className="ml-4 flex justify-center pt-2">
                                <DatePicker
                                    maxDate={dayjs().subtract(1, 'month')}
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
                                            to: dayjs(newValue).format("MM/YYYY"),
                                        }));
                                        setShowData(false)
                                    }}
                                />
                            </div>
                        </div>

                        {/* Chỉ số tham chiếu */}
                        <div className="py-3 md:flex sm:block items-center justify-between">
                            <span>Chỉ số tham chiếu</span>
                            <div className="flex justify-center pt-2">
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
                                    disabled={sameMonthYear ? true : false}
                                />
                                <span className="checkmark"></span>
                                <span className={`${sameMonthYear ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}>Đầu tư định kỳ</span>
                            </label>
                        </div>
                        {periodicInvestment ? (
                            <div>
                                {/* Kỳ hạn: */}
                                <div className="py-3 md:flex sm:block items-center justify-between">
                                    <span>Kỳ hạn:</span>
                                    <div className="flex justify-center pt-2">
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
                                </div>

                                {/* Thêm định kỳ (Tr): */}
                                <div className="py-3 md:flex sm:block items-center justify-between">
                                    <span>Thêm định kỳ (Tr):</span>
                                    <div className="flex justify-center pt-2">
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
                                <span className={`${arrCode.length === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}>Phân bổ đều</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-8 lg:col-span-full">
                    <div className="grid md:grid-cols-12 sm:grid-cols-none border-solid border-[#9E9E9E] border-b-2 border-t-0 border-x-0 relative">
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
                        <span className="dark:text-white text-black font-semibold col-span-4 py-1 flex items-center uppercase">
                            Phân bổ danh mục
                        </span>
                        <div className="dark:text-white text-black font-semibold col-span-8 py-1 sm:flex xs:block items-center justify-between sm:w-[400px] xs:w-full">
                            <span>Chọn mã cổ phiếu</span>
                            <div className="flex items-center justify-center pt-2">
                                <TextField
                                    placeholder="Thêm mã"
                                    onFocus={() => {
                                        setIsFocus(true);
                                    }}
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
                    </div>
                    <div className="pt-3">
                        <div className="w-full">
                            <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
                                <div className="block w-full scrollbar-thin scrollbar-thumb-[#436FB5] dark:scrollbar-track-[#151924] scrollbar-track-transparent overflow-x-scroll bg-transparent">
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
                                                                        <span className="text-sm font-bold">
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
                                                                            className="minus cursor-pointer bg-black/25 px-2 sm:block xs:hidden xxs:hidden"
                                                                            onClick={() => {
                                                                                handleMinusClick("category_1", index);
                                                                            }}
                                                                        >
                                                                            -
                                                                        </span>
                                                                        <input
                                                                            type="text"
                                                                            className="bg-transparent border-0 w-[40px] text-center text-white"
                                                                            value={item.category_1}
                                                                            onChange={(event) => {
                                                                                handleChangeCount(event, "category_1", index);
                                                                            }}
                                                                        />
                                                                        <span
                                                                            className="plus cursor-pointer bg-black/25 px-2 sm:block xs:hidden xxs:hidden"
                                                                            onClick={() => {
                                                                                handlePlusClick("category_1", index);
                                                                            }}
                                                                        >
                                                                            +
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td className="border border-solid border-[#9E9E9E]">
                                                                    <div className="number flex justify-between p-2">
                                                                        <span
                                                                            className="minus cursor-pointer bg-black/25 px-2 sm:block xs:hidden xxs:hidden"
                                                                            onClick={() => {
                                                                                handleMinusClick("category_2", index);
                                                                            }}
                                                                        >
                                                                            -
                                                                        </span>
                                                                        <input
                                                                            type="text"
                                                                            className="bg-transparent border-0 w-[40px] text-center text-white"
                                                                            value={item.category_2}
                                                                            onChange={(event) => {
                                                                                handleChangeCount(event, "category_2", index);
                                                                            }}
                                                                        />
                                                                        <span
                                                                            className="plus cursor-pointer bg-black/25 px-2 sm:block xs:hidden xxs:hidden"
                                                                            onClick={() => {
                                                                                handlePlusClick("category_2", index);
                                                                            }}
                                                                        >
                                                                            +
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td className="border border-solid border-[#9E9E9E]">
                                                                    <div className="number flex justify-between p-2">
                                                                        <span
                                                                            className="minus cursor-pointer bg-black/25 px-2 sm:block xs:hidden xxs:hidden"
                                                                            onClick={() => {
                                                                                handleMinusClick("category_3", index);
                                                                            }}
                                                                        >
                                                                            -
                                                                        </span>
                                                                        <input
                                                                            type="text"
                                                                            className="bg-transparent border-0 w-[40px] text-center text-white"
                                                                            value={item.category_3}
                                                                            onChange={(event) => {
                                                                                handleChangeCount(event, "category_3", index);
                                                                            }}
                                                                        />
                                                                        <span
                                                                            className="plus cursor-pointer bg-black/25 px-2 sm:block xs:hidden xxs:hidden"
                                                                            onClick={() => {
                                                                                handlePlusClick("category_3", index);
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
                                                        <td
                                                            className={`border border-solid border-[#9E9E9E] text-center ${totalCategory_1 === 100
                                                                ? "text-[#0BFFC4]"
                                                                : "text-red-500"
                                                                } p-2 font-bold`}
                                                        >
                                                            {totalCategory_1}%
                                                        </td>
                                                        <td
                                                            className={`border border-solid border-[#9E9E9E] text-center ${totalCategory_2 === 100
                                                                ? "text-[#0BFFC4]"
                                                                : "text-red-500"
                                                                } p-2 font-bold`}
                                                        >
                                                            {totalCategory_2}%
                                                        </td>
                                                        <td
                                                            className={`border border-solid border-[#9E9E9E] text-center ${totalCategory_3 === 100
                                                                ? "text-[#0BFFC4]"
                                                                : "text-red-500"
                                                                } p-2 font-bold`}
                                                        >
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
                            </div>
                        </div>
                    </div>
                    <div className="grid place-items-center pt-5">
                        <button
                            disabled={
                                totalCategory_1 === 100 &&
                                    totalCategory_2 === 100 &&
                                    totalCategory_3 === 100
                                    ? false
                                    : true
                            }
                            className={`${totalCategory_1 === 100 &&
                                totalCategory_2 === 100 &&
                                totalCategory_3 === 100 ? 'cursor-pointer' : 'cursor-not-allowed'} w-[188px] h-[32px] bg-[#9E9E9E] rounded-[10px] text-[15px] text-center uppercase font-bold grid place-items-center `}
                            onClick={callApi}
                        >
                            Kiểm thử
                        </button>
                    </div>
                </div>
            </div>
            {showData ? (
                <div className="pt-2">
                    <TestResults data={data_1} />
                    <br />
                    <br />
                    <InvestEffectsCategory data={data_2} />
                    <br />
                    <br />
                    <InvestEffectsStock data={data_3} />
                    <br />
                    <br />
                    <ProfitChart data={data_4} />
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default InvestSimulation;
