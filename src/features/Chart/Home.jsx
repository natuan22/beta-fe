import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Banner from './components/Banner'
import Carousel from './components/Carousel'
import { fetchDataCarousel } from './thunk'

const Home = () => {
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(fetchDataCarousel)
  },[dispatch])
  
  return (
    <div className='container mx-auto'>
      <div className='flex'>
        <div style={{width:"10%"}}>
          <Banner />
        </div>
        <div style={{width:"90%"}}>
          <Carousel />
        </div>
      </div>
    </div>
  )
}

export default Home