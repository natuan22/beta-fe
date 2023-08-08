import React from 'react'
import ChartColumn from '../../../../components/ChartColumn'

const SlideValuation = ({ data, labels, time }) => {
    const [PE, PB, EPS, BVPS] = data
    console.log(time)
    const [PELabel, PBLabel, EPSLabel, BVPSLabel] = labels
    return (
        <div>
            <div>Chỉ số định giá</div>
            <hr />
            <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-3'>
                <div className='PE'>
                    <ChartColumn data={PE} timeLine={time} name={PELabel} />
                </div>
                <div className='PB'>
                    <ChartColumn data={PB} timeLine={time} name={PBLabel} />
                </div>
                <div className='EPS'>
                    <ChartColumn data={EPS} timeLine={time} name={EPSLabel} />
                </div>
                <div className='BVPS'>
                    <ChartColumn data={BVPS} timeLine={time} name={BVPSLabel} />
                </div>
            </div>
        </div>
    )
}

export default SlideValuation