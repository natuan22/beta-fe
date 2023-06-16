import React from 'react';
import { Tabs } from 'antd';
import { hashTb } from '../utils/antComponentChild';

const DomesticMacro = () => {
    const tabItems = Object.keys(hashTb).map((key, index) => {
        const Component = hashTb[key];
        return {
            label: (
                <span className='text-white ' >
                    {key}
                </span>
            ),
            key: String(index),
            children: <Component />,
        };
    });

    return (
        <div>
            <Tabs
                defaultActiveKey="0"
                tabPosition='top'
                className=' text-yellow-300 '
                items={tabItems}
                tabBarStyle={{ display: 'grid', placeItems: 'center' }}
            />
        </div>
    );
};

export default DomesticMacro;
