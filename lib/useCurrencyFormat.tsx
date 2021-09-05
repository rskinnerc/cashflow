function useCurrencyFormat(currency: string, value: number) {
  let formatter = new Intl.NumberFormat(["en-US", "es-CO"], {
    style: "currency",
    currency,
  });

  return formatter.format(value);
}

export default useCurrencyFormat;
