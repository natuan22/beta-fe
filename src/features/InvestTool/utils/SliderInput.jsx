import React, { useEffect, useState } from 'react'
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";


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
            boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)"
        },
        "& .airbnb-bar": {
            height: 9,
            width: 1,
            backgroundColor: "currentColor",
            marginLeft: 1,
            marginRight: 1
        }
    },
    "& .MuiSlider-track": {
        height: 3
    },
    "& .MuiSlider-rail": {
        color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
        opacity: theme.palette.mode === "dark" ? undefined : 1,
        height: 3
    }
}));

function AirbnbThumbComponent(props) {
    const { children, ...other } = props;
    return (
        <SliderThumb
            style={{ width: '12px', height: '12px' }}
            {...other}>
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

const SliderInput = ({ sliderKey, min, max, formData, setFormData, arrCheckbox }) => {

    const [value, setValue] = useState([min, max])
    console.log(arrCheckbox)
    const [isSliding, setIsSliding] = useState(false);
    const [pendingValue, setPendingValue] = useState(value);

    console.log(formData)
    const handleChange = (e, newVal) => {
        setValue(newVal);
        setIsSliding(true);

        // Cập nhật giá trị sau khi dừng kéo slider
        setPendingValue(newVal);
    }


    // Hàm để tính giá trị nhân dựa vào sliderKey
    const calculateMultiplier = (sliderKey) => {
        if (sliderKey.includes('marketCap')) {
            return 1000000000;
        } else if (sliderKey.includes('shareout')) {
            return 1000000;
        } else if (sliderKey.includes('totalVol')) {
            return 1000000;
        } else if (sliderKey.includes('EBIT')) {
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
                    to: pendingValue[1] * multiplier,   // Giá trị max sau khi ngừng kéo slider
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



    return (
        <div className='flex justify-between items-center w-[400px] rounded-md' >
            <div className='text-white w-[5%] mr-5'>
                {value[0]}
            </div>
            <div className='w-[65%]'>
                <AirbnbSlider
                    slots={{ thumb: AirbnbThumbComponent }}
                    onChange={handleChange}
                    defaultValue={value}
                    getAriaValueText={valuetext}
                    min={min}
                    max={max}
                    sx={{
                        '& .MuiSlider-thumb': {
                            width: '20px',
                            height: '25px',
                            borderRadius: '5px'
                        },

                        '& .MuiSlider-rail': {
                            height: '15px'
                        },
                        '& .MuiSlider-track': {
                            height: '15px'
                        }

                    }}
                />
            </div>
            <div className='text-white w-[5%] ml-5'>
                {value[1]}
            </div>
        </div>
    )
}

export default SliderInput