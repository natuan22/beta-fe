import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Loading from '../../../Chart/utils/Loading'
import IndexIndustrialProduction from '../../components/Produce/IndexIndustrialProduction';
import { fetchDataIndexIndustrialProduction, fetchDataTableIndexIndustrialProduction } from '../../thunk';

const Produce = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true)
        }, 700)
    }, [])

    useEffect(() => {
        dispatch(fetchDataIndexIndustrialProduction)
        dispatch(fetchDataTableIndexIndustrialProduction)
    }, [dispatch]);

    return (
        <div className="container mx-auto mt-2 md:w-[90%] lg:w-[90%] xl:w-full">
            {isLoading ? (
                <>
                    <div className='mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md'>
                        <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                            <span className='dark:text-white text-black font-semibold'>Chỉ số sản xuất công nghiệp (%)</span>
                        </div>
                        <IndexIndustrialProduction />
                    </div>
                    <div className='mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md'>
                        <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-5'>
                            <div>
                                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                    <span className='dark:text-white text-black font-semibold'>Chỉ số sản xuất công nghiệp theo ngành công nghiệp (%)</span>
                                    <select className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0`}
                                        onChange={(event) => {
                                        }}>
                                        <option value='0'>Sản xuất kim loại</option>
                                        <option value='1'></option>
                                    </select>
                                </div>
                                <div className='h-[400px]'></div>
                            </div>
                            <div>
                                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                    <span className='dark:text-white text-black font-semibold'>Chỉ số tiêu thụ & tồn kho SP công nghiệp (%)</span>
                                    <select className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0`}
                                        onChange={(event) => {
                                        }}>
                                        <option value='0'>Sản xuất kim loại</option>
                                        <option value='1'></option>
                                    </select>
                                </div>
                                <div className='h-[400px]'></div>
                            </div>
                        </div>
                    </div>
                    <div className='mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md'>
                        <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                            <span className='dark:text-white text-black font-semibold'>Sản lượng công nghiệp các sản phẩm chủ yếu</span>
                            <select className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0`}
                                onChange={(event) => {
                                }}>
                                <option value='0'>Bột ngọt (Nghìn tấn)</option>
                                <option value='1'></option>
                            </select>
                        </div>
                        <div className='h-[400px]'></div>
                    </div>
                </>
            ) : (
                <div className='mt-20 mb-20'><Loading /></div>
            )}
        </div>
    )
}

export default Produce