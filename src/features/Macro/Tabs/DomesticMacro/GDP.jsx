import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import GDPByIndustry from '../../components/GDP/GDPByIndustry'
import GDPByPrice from '../../components/GDP/GDPByPrice'
import GDPContributionRatio from '../../components/GDP/GDPContributionRatio';
import GDPGrowth from '../../components/GDP/GDPGrowth';
import { fetchDataGDPByIndustry, fetchDataGDPByPrice, fetchDataGDPContributionRatio, fetchDataGDPGrowth } from '../../thunk';
import Loading from '../../../Chart/utils/Loading';

const GDP = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true)
        }, 700)
    }, [])
    useEffect(() => {
        dispatch(fetchDataGDPByIndustry);
        dispatch(fetchDataGDPByPrice);
        dispatch(fetchDataGDPContributionRatio);
        dispatch(fetchDataGDPGrowth(0));
    }, [dispatch]);

    return (
        <div className="container mx-auto mt-2 md:w-[90%] lg:w-[90%] xl:w-full">
            {isLoading ? (<div className='mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md'>
                <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-5'>
                    <div>
                        <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                            <span className='dark:text-white text-black font-semibold md:text-base sm:text-[15px] xs:text-[15px] xxs:text-[13px]'>Giá trị GDP theo các nhóm ngành chính (Tỷ đồng)</span>
                        </div>
                        <GDPByIndustry />
                    </div>
                    <div>
                        <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                            <span className='dark:text-white text-black font-semibold md:text-base sm:text-[15px] xs:text-[15px] xxs:text-[13px]'>GDP theo giá cố định và giá hiện hành (Tỷ đồng)</span>
                        </div>
                        <GDPByPrice />
                    </div>
                </div>

                <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-5 mt-1'>
                    <div>
                        <div>
                            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0 mt-2'>
                                <span className='dark:text-white text-black font-semibold md:text-base sm:text-[15px] xs:text-[14px] xxs:text-[12px]'>Tỷ trọng đóng góp GDP theo các nhóm ngành chính (%)</span>
                            </div>
                            <GDPContributionRatio />
                        </div>
                        <div className='mt-1'>
                            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                <span className='dark:text-white text-black font-semibold md:text-base sm:text-[15px] xs:text-[15px] xxs:text-[14px]'>Tăng trưởng GDP theo từng ngành nghề (%)</span>
                            </div>
                            <div className='h-[263px]'></div>
                        </div>
                    </div>
                    <div>
                        <GDPGrowth />
                    </div>
                </div>
            </div>) : <div><Loading /></div>}

        </div>
    )
}

export default GDP