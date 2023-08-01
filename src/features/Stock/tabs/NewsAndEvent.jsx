import React, { useEffect, useState } from 'react'
import Loading from '../../Chart/utils/Loading'
import Events from '../components/NewsAndEvent/Events';
import News from '../components/NewsAndEvent/News';
import useQueryApi from '../components/Overview/utils/custom/useQueryApi/useQueryApi';
import '../utils/style/styleButton.css'
const NewsAndEvent = ({ codeUrl }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { queryApiEvents, handleQueryApiEvents } = useQueryApi(codeUrl);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true)
    }, 700)
  }, [])

  return (
    <div className='container mx-auto'>
      {isLoading ? (
        <div className='mt-4'>
          <div>
            <div className='flex'>
              <div className='w-[150px] border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold uppercase'>Lịch sự kiện</span>
              </div>
              <div className='flex'>
                <button className="custom-btn btn-2 ml-7" onClick={() => handleQueryApiEvents(0)}>{queryApiEvents.stock}</button>
                <button className="custom-btn btn-2 ml-5" onClick={() => handleQueryApiEvents(1)}>Ngành</button>
                <button className="all-market btn-2 ml-5 " onClick={() => handleQueryApiEvents(2)}>Toàn thị trường</button>
              </div>
            </div>
            <Events queryApiEvents={queryApiEvents} />
          </div>
          <div className='mt-4'>
            <div className='w-[150px] border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='dark:text-white text-black font-semibold uppercase'>Tin tức</span>
            </div>
            <News stock={queryApiEvents.stock}/>
          </div>
        </div>
      ) : (
        <div className='h-[300px] flex items-center justify-center'><Loading /></div>
      )}
    </div>
  )
}

export default NewsAndEvent