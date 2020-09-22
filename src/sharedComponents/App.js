import React, { useState, useReducer } from 'react';

import { CURRENCY_CODES } from '../constants/currencyCodes';
import { reducer, initialState } from '../reducer/reducer';
import { useCurrencyConverter } from '../hook/currencyConverter-hook';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [result, setFinalResult] = useState('');
  const { convertCurrency, error } = useCurrencyConverter();

  const handleOnChange = e => {
    dispatch({
      field: e.target.name,
      value: e.target.value
    });
  };

  // destructure values from state
  const { amount, fromCurrency, toCurrency } = state;

  const handleSubmit = e => {
    e.preventDefault();

    if (fromCurrency && toCurrency && amount) {
      convertCurrency(fromCurrency, toCurrency, amount)
        .then(result => setFinalResult(result))
        .catch(error => console.log(error));
    } else {
      alert('All fields are mandatory!');
    }
  };

  return (
    <div className='currencyConverter'>
      <h1>Currency Converter</h1>
      <form>
        <div className='currencyConverter__amount'>
          <label htmlFor='amount'>Amount</label>
          <input
            value={amount}
            onChange={handleOnChange}
            name='amount'
            id='amount'
            type='number'
            required
          />
        </div>

        <div className='currencyConverter__from'>
          <label htmlFor='fromCurrency'>From</label>
          <input
            type='text'
            name='fromCurrency'
            id='fromCurrency'
            value={fromCurrency}
            onChange={handleOnChange}
          />
        </div>

        <div className='currencyConverter__to'>
          <label htmlFor='toCurrency'>To</label>
          <input
            type='text'
            name='toCurrency'
            id='toCurrency'
            value={toCurrency}
            onChange={handleOnChange}
          />
        </div>

        <button onClick={handleSubmit} type='submit'>
          CONVERT
        </button>
      </form>
      <h3>{result}</h3>
      <h3>{error}</h3>
    </div>
  );
}

export default App;
