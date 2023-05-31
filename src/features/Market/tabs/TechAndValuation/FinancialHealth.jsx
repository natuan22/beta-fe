import React from 'react';
import Checkbox from '../../HOCs/Checkbox';

const FinancialHealth = () => {
  const renderTestComponent = (exchange) => {
    console.log(exchange)
  };

  return (
    <div className='container mx-auto mt-2'>
      <Checkbox render={renderTestComponent} />
      <h1>chart ở đây</h1>
    </div>
  );
};

export default FinancialHealth;
