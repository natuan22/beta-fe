import React from 'react';
import { hashTb_CTCP_BH_CK } from '../utils/hashTbStock/hashTb';
import { handleMapSlide } from '../utils/hashTbStock/handleMapSlide';


const ChartCTCPFinancialIndicators = () => {
  return (
    <div>
      <div className='h-screen'>
        {handleMapSlide(hashTb_CTCP_BH_CK)}
      </div>
    </div>
  );
};

export default ChartCTCPFinancialIndicators;
