import React, { useState, useReducer } from 'react';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';

import { reducer, initialState } from '../reducer/reducer';
import { useCurrencyConverter } from '../hook/currencyConverter-hook';
import CurrencyCodes from './CurrencyCodes';

import './App.scss';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [result, setFinalResult] = useState('');
  const [isVisible, setIsVisible] = useState(false);
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

    // regex to 'clean' the string of white spaces and symbols
    const cleanFromCurrency = fromCurrency.replace(/[^\w]/g, '');
    const cleanToCurrency = toCurrency.replace(/[^\w]/g, '');

    if (fromCurrency && toCurrency && amount) {
      convertCurrency(cleanFromCurrency, cleanToCurrency, amount)
        .then(result => setFinalResult(result))
        .catch(error => console.log(error));
    } else {
      alert('All fields are mandatory!');
    }
  };

  return (
    <div className='currencyConverter'>
      <h1>Currency Converter</h1>
      <p
        className='currencyConverter__toggleCodes'
        onClick={() => setIsVisible(!isVisible)}
      >
        <LocalAtmIcon className='currencyConverter__atmIcon' />
        {isVisible ? 'Hide' : 'Show'} currency codes!
      </p>
      {isVisible && <CurrencyCodes />}

      <form className='currencyConverter__form'>
        <div className='currencyConverter__inputGroup'>
          <label htmlFor='amount'>Amount</label>
          <input
            value={amount}
            onChange={handleOnChange}
            name='amount'
            id='amount'
            type='number'
            placeholder='450'
          />
        </div>

        <div className='currencyConverter__inputGroup'>
          <label htmlFor='fromCurrency'>From</label>
          <input
            type='text'
            name='fromCurrency'
            id='fromCurrency'
            value={fromCurrency}
            onChange={handleOnChange}
            placeholder='USD'
          />
        </div>

        <div className='currencyConverter__inputGroup'>
          <label htmlFor='toCurrency'>To</label>
          <input
            type='text'
            name='toCurrency'
            id='toCurrency'
            value={toCurrency}
            onChange={handleOnChange}
            placeholder='EUR'
          />
        </div>

        <button onClick={handleSubmit} type='submit'>
          CONVERT
        </button>
      </form>

      <div className='currencyConverter__result'>
        {result}
        {error && <p className='currencyConverter__errorMessage'>{error}</p>}
      </div>
    </div>
  );
}

export default App;
