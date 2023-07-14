import React from 'react'
import ListEnterpriseNews from '../components/EnterpriseNews/ListEnterpriseNews'
import TableEvents from '../components/EnterpriseNews/TableEvents'
import NewsOfEnterprise from '../components/EnterpriseNews/NewsOfEnterprise'

const EnterpriseNews = () => {
    return (
        <div className="container mx-auto md:w-[90%] lg:w-[90%] xl:w-[90%] 2xl:w-full pt-2">
            <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
                <div>
                    <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                        <span className='dark:text-white text-black font-semibold uppercase'>Lịch sự kiện</span>
                    </div>
                    <div className='h-full'>
                        <NewsOfEnterprise />
                    </div>
                </div>
            </div>
            <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
                <div>
                    <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                        <span className='dark:text-white text-black font-semibold uppercase'>Tin tức doanh nghiệp</span>
                    </div>
                    <ListEnterpriseNews />
                </div>
            </div>
        </div>
    )
}

export default EnterpriseNews