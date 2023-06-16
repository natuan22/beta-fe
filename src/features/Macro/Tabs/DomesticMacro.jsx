import React from 'react'
import { Tabs } from 'antd';
import { hashTb } from '../utils/antComponentChild';
const DomesticMacro = () => {
    const tabItems = Object.keys(hashTb).map((key, index) => {
        const Component = hashTb[key];
        return {
            label: (<span className='text-white'>{key}</span>),
            key: String(index),
            children: <Component />,
        };
    });
    return (
        <div>
            <div>
                <Tabs
                    defaultActiveKey="1"
                    tabPosition='top'
                    style={{
                        height: 220,
                        color: 'yellow'
                    }}
                    items={tabItems}
                />
            </div>
        </div>
    )
}

export default DomesticMacro