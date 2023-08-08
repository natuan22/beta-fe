import React from 'react'
import ChartColumn from '../../../../components/ChartColumn'

const SlideValuation = ({ data, labels, time }) => {
    const [Arr1, Arr2, Arr3, Arr4] = data
    const [Label1, Label2, Label3, Label4] = labels
    return (
        <div>
            <div>Chỉ số định giá</div>
            <hr />
            <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-3'>
                <div className='PE'>
                    <ChartColumn data={[Arr1]} timeLine={time} name={Label1} />
                </div>
                <div className='PB'>
                    <ChartColumn data={[Arr2]} timeLine={time} name={Label2} />
                </div>
                <div className='EPS'>
                    <ChartColumn data={[Arr3]} timeLine={time} name={Label3} />
                </div>
                <div className='BVPS'>
                    <ChartColumn data={[Arr4]} timeLine={time} name={Label4} />
                </div>
            </div>
        </div>
    )
}

export default SlideValuation