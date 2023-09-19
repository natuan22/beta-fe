import React, { useState } from 'react'
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

const SliderInput = ({ min, max }) => {

    const [value, setValue] = useState([min, max])
    const handleChange = (e, newVal) => {
        setValue(newVal)
    }

    return (
        <div className='flex justify-between items-center w-[400px] rounded-md' >
            <div className='text-white w-[5%] mr-5'>
                {value[0]}
            </div>
            <div className='w-[65%]'>
                <AirbnbSlider
                    slots={{ thumb: AirbnbThumbComponent }}
                    onChange={handleChange}
                    value={value}
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