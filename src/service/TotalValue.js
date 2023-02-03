export const getTotalValue = (expenses) => {
  const { exchangeRates } = expenses[0];
  const arrayOfcoins = Object.values(exchangeRates);
  let totalValue = 0;
  expenses.forEach((expense) => {
    const selectedCoin = arrayOfcoins.find(
      (coin) => coin.code === expense.currency,
    );
    const costValue = parseFloat(expense.value) * selectedCoin.ask;
    totalValue += costValue;
  });

  return totalValue;
};
