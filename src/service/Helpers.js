export const getValue = ({ value, exchangeRates, currency }) => {
  const result = parseFloat(value) * exchangeRates[currency].ask;
  return result;
};

export const getTotalValue = (expenses = []) => {
  let totalValue = 0;
  expenses.forEach((expense) => {
    const costValue = getValue(expense);
    totalValue += costValue;
  });
  return totalValue;
};

export const findCoin = (code, coins) => (coins[code].name);

export const getCambioRate = (exchangeRates, currency) => {
  const result = parseFloat(exchangeRates[currency].ask);
  return result;
};

export const twoDecimals = (number) => parseFloat(number).toFixed(2);

export const removeElement = (array, id) => array.filter((el) => el.id !== id);

export const orderArray = (array) => array.sort((a, b) => a.id - b.id);

export const findById = (array, id) => array.find((el) => el.id === id);
