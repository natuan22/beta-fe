import React from 'react';
import { hashTbCTCP } from '../utils/hashTbStock/hashTb';
import { handleMapSlide } from '../utils/hashTbStock/handleMapSlide';


const ChartCTCPFinancialIndicators = () => {
  return (
    <div>
      <div className='h-screen'>
        {handleMapSlide(hashTbCTCP)}
      </div>
    </div>
  );
};

export default ChartCTCPFinancialIndicators;
