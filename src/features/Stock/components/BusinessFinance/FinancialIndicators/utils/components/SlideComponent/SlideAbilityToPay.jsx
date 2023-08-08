import React from 'react'
import ChartColumn from '../../../../components/ChartColumn'
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

const SlideAbilityToPay = ({ data, labels, time }) => {
    const [Arr1, Arr2, Arr3, Arr4] = data
    const [Label1, Label2, Label3, Label4] = labels
    return (
        <div>
            <div className='p-8'>
                <div className='text-center dark:text-white text-black font-semibold p-3 text-lg'>Khả năng thanh toán</div>
                <div className='dark:text-white text-black flex items-center justify-center'><BiSolidRightArrow /><div className='w-[95%] h-[1px] bg-white'></div><BiSolidLeftArrow /></div>

                <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-3'>
                    <div className='ratePay'>
                        <ChartColumn data={[Arr1]} timeLine={time} name={Label1} />
                    </div>
                    <div className='rateFastPay'>
                        <ChartColumn data={[Arr2]} timeLine={time} name={Label2} />
                    </div>
                    <div className='rateCashPay'>
                        <ChartColumn data={[Arr3]} timeLine={time} name={Label3} />
                    </div>
                    <div className='rateDebitPay'>
                        <ChartColumn data={[Arr4]} timeLine={time} name={Label4} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SlideAbilityToPay