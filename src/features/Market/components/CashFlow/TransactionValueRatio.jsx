import React from 'react'

const TransactionValueRatio = () => {
    return (
        <>
            <div className='text-center'>Tỷ lệ GTGD theo nhóm NĐT trong phiên</div>
            <div className='flex'>
                <div className='w-[30%]'>
                    <div>
                        <div className='text-[1rem] py-1'>Khối ngoại: </div>
                        <div className='text-[0.75rem] pl-5 py-1'>Giá trị ròng: </div>
                        <div className='text-[0.75rem] pl-5 py-1'>Mua ròng: </div>
                        <div className='text-[0.75rem] pl-5 py-1'>Bán ròng: </div>
                    </div>

                    <div>
                        <div className='text-[1rem] py-1'>Tự doanh: </div>
                        <div className='text-[0.75rem] pl-5 py-1'>Giá trị ròng: </div>
                        <div className='text-[0.75rem] pl-5 py-1'>Mua ròng: </div>
                        <div className='text-[0.75rem] pl-5 py-1'>Bán ròng: </div>
                    </div>

                    <div>
                        <div className='text-[1rem] py-1'>Cá nhân: </div>
                        <div className='text-[0.75rem] pl-5 py-1'>Giá trị ròng: </div>
                        <div className='text-[0.75rem] pl-5 py-1'>Mua ròng: </div>
                        <div className='text-[0.75rem] pl-5 py-1'>Bán ròng: </div>
                    </div>
                </div>
                <div className='w-[70%]'></div>
            </div>
        </>
    )
}

export default TransactionValueRatio