import React from 'react'
import ChartColumn from '../../../../components/ChartColumn'

const SlideLiquidity = ({ data, labels, time }) => {
    const [Arr1, Arr2, Arr3, Arr4] = data
    const [Label1, Label2, Label3, Label4] = labels
    console.log(data)
    return (
        <div>
            <div>Thanh khoản</div>
            <hr />
            <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-3'>
                <div className='wheelAsset'>
                    <ChartColumn data={[Arr1]} timeLine={time} name={Label1} />
                </div>
                <div className='wheelTotalAsset'>
                    <ChartColumn data={[Arr2]} timeLine={time} name={Label2} />
                </div>
                <div className='wheelCash'>
                    <ChartColumn data={[Arr3]} timeLine={time} name={Label3} />
                </div>
                <div className='wheelVCSH'>
                    <ChartColumn data={[Arr4]} timeLine={time} name={Label4} />
                </div>
            </div>
        </div>
    )
}

export default SlideLiquidity