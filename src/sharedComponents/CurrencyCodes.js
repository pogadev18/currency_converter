import React from 'react';

import { CURRENCY_CODES } from '../constants/currencyCodes';

import './CurrencyCodes.scss';

function CurrencyCodes() {
  return (
    <div className='currencyCodes'>
      <h3 className='currencyCodes__title'>
        Use the letters before the '-' in the form in order to convert
        currencies!
      </h3>
      {Object.entries(CURRENCY_CODES).map(item => {
        return (
          <p className='currencyCodes__code'>
            {item[0]} - {item[1]}
          </p>
        );
      })}
    </div>
  );
}

export default CurrencyCodes;
