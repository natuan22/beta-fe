import { Button, Popover } from 'antd'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../../../Chart/utils/Loading';
const hashTb = {
    'Bảo hiểm': 'baoHiem',
    'Bất động sản': 'batDongSan',
    'Công nghệ': 'congNghe',
    'Dầu khí': 'dauKhi',
    'Dịch vụ bán lẻ': 'banLe',
    'Dịch vụ tài chính': 'taiChinh',
    'Dịch vụ tiện ích': 'tienIch',
    'Đồ dùng cá nhân và đồ gia dụng': 'doGiaDung',
    'Du lịch & Giải trí': 'duLich',
    'Hàng hóa và dịch vụ công nghiệp': 'hangHoa',
    'Hóa chất': 'hoaChat',
    'Ngân hàng': 'nganHang',
    'Ôtô & linh kiện phụ tùng ': 'oto',
    'Phương tiện truyền thông': 'truyenThong',
    'Thực phẩm & Đồ uống': 'thucPham',
    'Viễn thông': 'vienThong',
    'Xây dựng & Vật liệu': 'xayDung',
    'Tài nguyên': 'taiNguyen',
    'Y tế': 'yTe',
}
const apiUrl = process.env.REACT_APP_BASE_URL;

const FilterIndusty = ({ onSelectedNamesChange }) => {
    const { dataHotIndustry } = useSelector(state => state.market)
    const [selectedNames, setSelectedNames] = useState([]);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (dataHotIndustry?.length > 0) {
            setSelectedNames(dataHotIndustry.map(item => item.industry))
        }
    }, [dataHotIndustry])
    const createHotImage = (industry) => {
        if (dataHotIndustry?.length > 0 && dataHotIndustry?.some(item => hashTb[item.industry] === industry)) {
            if (industry === 'hangHoa' || industry === 'oto' || industry === 'truyenThong' || industry === 'thucPham') {
                return (
                    <img className='relative w-[50px] h-[30px]  ml-4 md:left-[-15px] sm:left-0'
                        src={`${apiUrl}/resources/icons/hot.png`}
                        alt='icon'
                    />
                );
            } else {
                return (
                    <img className='relative w-[50px] h-[30px] ml-2 '
                        src={`${apiUrl}/resources/icons/hot.png`}
                        alt='icon'
                    />
                );
            }

        }
        return null;
    };
    const handleClick = (name) => {
        // Xử lý khi người dùng chọn một mục
        if (selectedNames.includes(name)) {
            setSelectedNames(selectedNames.filter(item => item !== name));
        } else {
            setSelectedNames([...selectedNames, name]);
        }

    };
    useEffect(() => {
        onSelectedNamesChange(selectedNames)
    }, [selectedNames])
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    console.log({ selectedNames })
    return (
        <div>
            <Popover
                content={
                    <div className='h-[200px] overflow-auto'>
                        {Object.keys(hashTb).map((industry, index) => (
                            <div key={index} >
                                <label className="material-checkbox py-2 text-black">
                                    <input
                                        type="checkbox"
                                        name="exchange"
                                        value={industry}
                                        id={industry}
                                        checked={selectedNames.includes(industry)}
                                        onChange={() => handleClick(industry)}
                                    />
                                    <span className="checkmark"></span>
                                    <span className='text-sm'>{industry}</span>
                                    {createHotImage(hashTb[industry])}
                                </label>
                            </div>
                        ))}
                    </div>
                }
                placement="left"
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
            >
                <Button className='bg-[#1B496D] text-white border-none ml-2'>
                    Ngành
                    <span role="img" aria-label="filter" className="anticon anticon-filter">
                        <svg viewBox="64 64 896 896" focusable="false" data-icon="filter" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                            <path d="M349 838c0 17.7 14.2 32 31.8 32h262.4c17.6 0 31.8-14.3 31.8-32V642H349v196zm531.1-684H143.9c-24.5 0-39.8 26.7-27.5 48l221.3 376h348.8l221.3-376c12.1-21.3-3.2-48-27.7-48z"></path>
                        </svg>
                    </span>
                </Button>
            </Popover>
        </div>
    );
};

export default FilterIndusty;

