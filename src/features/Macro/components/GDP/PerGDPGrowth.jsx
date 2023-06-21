import React from 'react'
import { useSelector } from 'react-redux';

const PerGDPGrowth = () => {
    const { dataPerGDPGrowth } = useSelector(state => state.marco)
    console.log(dataPerGDPGrowth);

    return (
        <>
            <div className='h-[263px] dark:text-white text-black'>PerGDPGrowth</div>
        </>
    )
}

export default PerGDPGrowth