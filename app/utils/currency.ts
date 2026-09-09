export function ConvertToFinalPrice(price: number, discountPercentage: number): number {
  if (!discountPercentage || discountPercentage <= 0) return price;
  const discounted = price - (price * discountPercentage) / 100;
  return Math.round(discounted * 100) / 100;
}

export function CurrencyConverter(amount: number, currency: string = '$'): string {
  const formatted = Number(amount || 0).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  if (currency === '$' || !currency) {
    return `$${formatted}`;
  }
  return `${currency} ${formatted}`;
}
