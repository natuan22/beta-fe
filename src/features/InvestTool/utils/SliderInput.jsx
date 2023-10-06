import React, { useEffect, useState } from "react";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { NumericFormat } from "react-number-format";
import { TextField } from "@mui/material";

const AirbnbSlider = styled(Slider)(({ theme }) => ({
    color: "#3a8589",
    height: 3,
    padding: "13px 0",
    "& .MuiSlider-thumb": {
        height: 27,
        width: 27,
        backgroundColor: "#fff",
        border: "1px solid currentColor",
        "&:hover": {
            boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
        },
        "& .airbnb-bar": {
            height: 9,
            width: 1,
            backgroundColor: "currentColor",
            marginLeft: 1,
            marginRight: 1,
        },
    },
    "& .MuiSlider-track": {
        height: 3,
    },
    "& .MuiSlider-rail": {
        color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
        opacity: theme.palette.mode === "dark" ? undefined : 1,
        height: 3,
    },
}));

function AirbnbThumbComponent(props) {
    const { children, ...other } = props;
    return (
        <SliderThumb style={{ width: "12px", height: "12px" }} {...other}>
            {children}
            <span className="airbnb-bar " />
            <span className="airbnb-bar" />
            <span className="airbnb-bar" />
        </SliderThumb>
    );
}
function valuetext(value) {
    return `${value}`;
}

const SliderInput = ({
    sliderKey,
    min,
    max,
    formData,
    setFormData,
    arrCheckbox,
}) => {
    const [value, setValue] = useState([min, max]);
    const [isSliding, setIsSliding] = useState(false);
    const [pendingValue, setPendingValue] = useState([min, max]);
    const [minValue, setMinValue] = useState(min);
    const [maxValue, setMaxValue] = useState(max);
    const handleChange = (e, newVal) => {
        setValue(newVal);
        setIsSliding(true);
        setMinValue(newVal[0]);
        setMaxValue(newVal[1]);
        // Cập nhật giá trị sau khi dừng kéo slider
        setPendingValue(newVal);
    };

    // Hàm để tính giá trị nhân dựa vào sliderKey
    const calculateMultiplier = (sliderKey) => {
        if (sliderKey.includes("marketCap")) {
            return 1000000000;
        } else if (sliderKey.includes("shareout")) {
            return 1000000;
        } else if (sliderKey.includes("totalVol")) {
            return 1000000;
        } else if (sliderKey.includes("EBIT")) {
            return 1000000000;
        }
        return 1; // Mặc định nếu không có điều kiện nào khớp
    };

    useEffect(() => {
        // Kiểm tra xem key có trong arrCheckbox không
        const keyIsInCheckbox = arrCheckbox.includes(sliderKey);

        // Nếu key không nằm trong arrCheckbox, không gọi API
        if (!keyIsInCheckbox) {
            return;
        }

        let updateTimeout; // Khai báo biến timeout ở ngoài để có thể xóa nó sau khi unmount

        // Nếu user ngừng kéo slider sau 0.3 giây, cập nhật giá trị value
        updateTimeout = setTimeout(() => {
            if (!isSliding) {
                // Tạo một bản sao mới của formData
                const newFormData = { ...formData };
                const multiplier = calculateMultiplier(sliderKey);
                // Tạo một object mới cho mảng filter
                const newFilterObject = {
                    key: sliderKey,
                    from: pendingValue[0] * multiplier, // Giá trị min sau khi ngừng kéo slider
                    to: pendingValue[1] * multiplier, // Giá trị max sau khi ngừng kéo slider
                };
                // Cập nhật hoặc thêm key vào formData
                const existingFilterIndex = newFormData.filter.findIndex(
                    (filterItem) => filterItem.key === sliderKey
                );
                if (existingFilterIndex !== -1) {
                    // Nếu key đã tồn tại, cập nhật giá trị của nó
                    newFormData.filter[existingFilterIndex] = newFilterObject;
                } else {
                    // Nếu key chưa tồn tại, thêm một object mới
                    newFormData.filter.push(newFilterObject);
                }
                // Cập nhật giá trị formData trong component cha
                setFormData(newFormData);
            }

            setIsSliding(false);
        }, 300); // Tăng thời gian delay lên 300ms cho 0.3 giây

        // Xóa timeout khi component unmount hoặc khi sliderKey thay đổi
        return () => {
            clearTimeout(updateTimeout);
        };
    }, [sliderKey, value, pendingValue, isSliding, arrCheckbox]);

    const handleChangeInputMin = (e) => {
        const inputValue = e.target.value.replace(/,/g, "");
        console.log(inputValue)
        console.log(typeof (inputValue))
        const regex = /^[0-9]*$/; // Biểu thức chính quy cho số nguyên dương

        if (regex.test(inputValue)) {
            // Nếu giá trị nhập vào là số, cập nhật state
            const minValueInput = +inputValue;
            setMinValue(minValueInput);
            setValue([minValueInput, maxValue]); // Cập nhật giá trị của slider khi giá trị min thay đổi
            setPendingValue([minValueInput, maxValue]); // Cập nhật giá trị của slider khi giá trị max thay đổi
        }
    };

    const handleChangeInputMax = (e) => {
        const inputValue = e.target.value.replace(/,/g, "");
        const regex = /^[0-9]*$/; // Biểu thức chính quy cho số nguyên dương

        if (regex.test(inputValue)) {
            // Nếu giá trị nhập vào là số, cập nhật state
            const maxValueInput = +inputValue;
            setMaxValue(maxValueInput);
            setValue([minValue, maxValueInput]);
            setPendingValue([minValue, maxValueInput]); // Cập nhật giá trị của slider khi giá trị max thay đổi
        }
    };

    useEffect(() => {
        setValue([minValue, maxValue]);
    }, [minValue, maxValue]);
    const formatNumber = (number) => {
        // Định dạng số và loại bỏ dấu phẩy ngăn cách
        return number.toLocaleString("vi-VN", { maximumFractionDigits: 0 });
    };
    return (
        <div className="flex justify-evenly items-center md:w-[460px] sm:w-[270px] rounded-md">
            <div className="dark:text-white text-black w-[55px] mr-[40px] text-sm">
                {/* <input
                    type="text"
                    numberonly
                    max={max}
                    min={min}
                    value={minValue}
                    className="bg-[#2b2b2b]  w-[67px] text-white font-semibold border-0 p-2 rounded-lg focus:outline-0"
                    onChange={handleChangeInputMin}
                /> */}
                <NumericFormat
                    customInput={TextField}
                    max={max}
                    min={min}
                    value={minValue}
                    onChange={handleChangeInputMin}
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
                            width: "60px",
                            paddingTop: "5.5px",
                            paddingBottom: "5.5px",
                            textAlign: "right",
                        },
                    }}
                    thousandSeparator
                />
            </div>
            <div className="w-[50%]">
                <AirbnbSlider
                    slots={{ thumb: AirbnbThumbComponent }}
                    onChange={handleChange}
                    value={[minValue, maxValue]}
                    getAriaValueText={valuetext}
                    min={min}
                    max={max}
                    sx={{
                        "& .MuiSlider-thumb": {
                            width: "20px",
                            height: "25px",
                            borderRadius: "5px",
                        },
                        "& .MuiSlider-rail": {
                            height: "15px",
                        },
                        "& .MuiSlider-track": {
                            height: "15px",
                        },
                    }}
                />
            </div>
            <div className="dark:text-white text-black w-[55px] ml-3 text-sm">
                {/* <input
                    type="text"
                    numberonly
                    min={min}
                    max={max}
                    value={maxValue}
                    className="bg-[#2b2b2b] w-[67px] text-white font-semibold border-0 p-2 rounded-lg focus:outline-0"
                    onChange={handleChangeInputMax}
                /> */}
                <NumericFormat
                    customInput={TextField}
                    min={min}
                    max={max}
                    value={maxValue}
                    onChange={handleChangeInputMax}
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
                            width: "60px",
                            paddingTop: "5.5px",
                            paddingBottom: "5.5px",
                            textAlign: "right",
                        },
                    }}
                    thousandSeparator
                />
            </div>
        </div>
    );
};

export default SliderInput;
