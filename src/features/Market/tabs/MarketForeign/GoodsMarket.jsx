import React from 'react'
const apiUrl = process.env.REACT_APP_BASE_URL;

const GoodsMarket = () => {
  return (
    <div className='container mx-auto mt-2'>
      <div className='container mx-auto mt-2'>
        <div className='container mx-auto'>
          <div className="h-auto pt-5 pb-2 flex justify-center ">
            <div className="flex  md:flex-row md:justify-around sm:flex-col sm:items-center xs:flex-col xs:items-center xxs:flex-col xxs:items-center w-[50%]">
              <div className="px-2 relative">
                <a href="https://trading.bsi.com.vn/login" target="_blank" rel="noopener noreferrer">
                  <img className="xl:w-[712px] xl:h-[500px] lg:w-[505px] lg:h-[333px] md:w-[370px] md:h-[261px] sm:w-[350px] sm:h-[261px] xs:w-[350px] xs:h-[261px] xxs:w-[223px] xxs:h-[167px]" src={`${apiUrl}/resources/images/banner1.png`}
                    alt='zalo-banner' />
                </a>
              </div>
              <div className="px-2 relative">
                <a href="https://www.bsi.com.vn/vn/tin-tuc/tin-va-su-kien/lai-margin-9-9-phi-giao-dich-0-1" target="_blank" rel="noopener noreferrer">
                  <img className="xl:w-[712px] xl:h-[500px] lg:w-[505px] lg:h-[333px] md:w-[370px] md:h-[261px] sm:w-[350px] sm:h-[261px] xs:w-[350px] xs:h-[261px] xxs:w-[223px] xxs:h-[167px]" src={`${apiUrl}/resources/images/banner2.png`}
                    alt='tele-banner' />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GoodsMarket