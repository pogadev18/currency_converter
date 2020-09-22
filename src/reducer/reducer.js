export const initialState = {
  amount: null,
  fromCurrency: '',
  toCurrency: ''
};

export const reducer = (state, { field, value }) => {
  return {
    ...state,
    [field]: value
  };
};
