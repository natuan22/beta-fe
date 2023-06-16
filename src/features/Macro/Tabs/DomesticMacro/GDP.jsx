import React from 'react'

const GDP = () => {
    return (
        <div className="container mx-auto md:w-[90%] lg:w-[90%] xl:w-full">
            <div className='mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924]'>
                <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-5'>
                    <div>
                        <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                            <span className='dark:text-white text-black font-semibold'>Giá trị GDP theo các nhóm ngành chính (Tỷ đồng)</span>
                        </div>
                        <div className='h-[298px]'></div>
                        <hr />
                        <div className='h-[209px]'></div>
                    </div>
                    <div>
                        <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                            <span className='dark:text-white text-black font-semibold'>GDP theo giá cố định và giá hiện hành (Tỷ đồng)</span>
                        </div>
                        <div className='h-[298px]'></div>
                        <hr />
                        <div className='h-[209px]'></div>
                    </div>
                </div>

                <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-5'>
                    <div>
                        <div>
                            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                <span className='dark:text-white text-black font-semibold'>Tỷ trọng đóng góp GDP theo các nhóm ngành chính (%)</span>
                            </div>
                            <div className='h-[218px]'></div>
                            <hr />
                            <div className='h-[194px]'></div>
                        </div>
                        <div>
                            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                <span className='dark:text-white text-black font-semibold'>Tăng trưởng GDP theo từng ngành nghề (%)</span>
                            </div>
                            <div className='h-[263px]'></div>
                        </div>
                    </div>
                    <div>
                        <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                            <span className='dark:text-white text-black font-semibold'>Tăng trưởng GDP theo từng ngành nghề (Tỷ đồng)</span>
                            <select className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0 `}
                                onChange={(event) => {

                                }}>
                                <option value='0'>Kỳ gần nhất</option>
                                <option value='1'>Cùng kỳ</option>
                            </select>
                        </div>
                        <div className='h-[883px]'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GDP