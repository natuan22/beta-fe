import React from 'react'
import Banner from './components/Banner'
import Carousel from './components/Carousel'

const Home = () => {
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