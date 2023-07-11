import React from 'react'

const ExportAndImportTransfer = () => {
    return (
        <div>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold sm:text-base xs:text-[15px] xxs:text-[12px]'>Lưu chuyển xuất nhập khẩu một số thị trường chính</span>
                <select className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0 xl:ml-[247px] lg:ml-[440px] md:ml-[212px] sm:ml-[160px] xs:ml-[150px] xxs:ml-[120px]`}
                    onChange={(event) => {
                    }}>
                    <option value='0'>Tháng</option>
                    <option value='1'>Quý</option>
                    <option value='2'>Năm</option>
                </select>
            </div>
            <div className='h-[300px]'></div>
        </div>
    )
}

export default ExportAndImportTransfer