import React from 'react'


const Error404 = () => {
    const apiUrl = process.env.REACT_APP_BASE_URL;

    return (
        <div className=''>
            <div className='p-20 flex justify-center'>
                <img className='object-contain 3xl:w-[1000px] 3xl:h-[616px] 2xl:w-[1000px] 2xl:h-[616px] xl:w-[1000px] xl:h-[616px] lg:w-[666px] lg:h-[410px] md:w-[666px] md:h-[410px] sm:w-[560px] sm:h-[345px] xxs:w-[425px] xxs:h-[222px] xs:w-[425px] xs:h-[222px]' src={`${apiUrl}/resources/images/error-404.png`} alt='error-404' />
            </div>
        </div>
    )
}

export default Error404