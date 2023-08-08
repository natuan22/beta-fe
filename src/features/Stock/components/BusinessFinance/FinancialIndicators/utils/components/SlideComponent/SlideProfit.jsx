import React from 'react'
import ChartColumn from '../../../../components/ChartColumn'

const SlideProfit = ({ data, labels, time }) => {
    const [Arr1, Arr2, Arr3, Arr4] = data
    const [Label1, Label2, Label3, Label4] = labels
    console.log(data)
    return (
        <div>
            <div>Khả năng sinh lời</div>
            <hr />
            <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-3'>
                <div className='profitMargin'>
                    <ChartColumn data={[Arr1]} timeLine={time} name={Label1} />
                </div>
                <div className='netProfit'>
                    <ChartColumn data={[Arr2]} timeLine={time} name={Label2} />
                </div>
                <div className='ROE'>
                    <ChartColumn data={[Arr3]} timeLine={time} name={Label3} />
                </div>
                <div className='ROA'>
                    <ChartColumn data={[Arr4]} timeLine={time} name={Label4} />
                </div>
            </div>
        </div>
    )
}

export default SlideProfit