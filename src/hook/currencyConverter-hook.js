import { useState } from 'react';
import axios from 'axios';

const FIXER_API_KEY = '0f8e76540ca5e2ffb04ae7053c2af3f9';
const FIXER_API = `http://data.fixer.io/api/latest?access_key=${FIXER_API_KEY}`;

const REST_COUNTRIES_API = `https://restcountries.eu/rest/v2/currency`;

export const useCurrencyConverter = () => {
  const [error, setError] = useState('');

  // fetch currencies data
  const getExchangeRate = async (fromCurrency, toCurrency) => {
    try {
      const {
        data: { rates }
      } = await axios.get(FIXER_API);

      const euro = 1 / rates[fromCurrency];
      const exchangeRate = euro * rates[toCurrency];

      return exchangeRate;
    } catch (error) {
      setError(
        error.error ||
          'Something went wrong, please try again! Make sure the currency CODE is correct! See the list below!'
      );
      throw error;
    }
  };

  // fetch countries data - countries where you can use currencies
  const getCountries = async currencyCode => {
    try {
      const { data } = await axios.get(`${REST_COUNTRIES_API}/${currencyCode}`);
      return data.map(({ name }) => name);
    } catch (error) {
      setError(
        error.error ||
          'Something went wrong, please try again! Make sure the currency CODE is correct! Please check the list with all the codes.'
      );
      throw error;
    }
  };

  // output data
  const convertCurrency = async (fromCurrency, toCurrency, amount) => {
    fromCurrency = fromCurrency.toUpperCase();
    toCurrency = toCurrency.toUpperCase();

    const [exchangeRate, countries] = await Promise.all([
      getExchangeRate(fromCurrency, toCurrency),
      getCountries(toCurrency)
    ]);

    const convertedAmmount = (amount * exchangeRate).toFixed(2);

    const markup = `
        <p class="currencyConverter__valueResult">${amount} ${fromCurrency} is worth ${convertedAmmount} ${toCurrency}.</p>
        <p class="currencyConverter__countriesText">You can spend these in the following countries:</p>
        <div>${countries.join(', ')}</div>
    `;

    return (document.querySelector(
      '.currencyConverter__result'
    ).innerHTML = markup);
  };

  return { convertCurrency, error };
};
