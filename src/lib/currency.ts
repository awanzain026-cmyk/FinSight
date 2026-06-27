export type CurrencyCode = "PKR" | "USD" | "GBP" | "AED";

export const CURRENCIES: Record<
  CurrencyCode,
  { symbol: string; label: string; locale: string }
> = {
  PKR: { symbol: "Rs.", label: "Pakistani Rupee", locale: "en-PK" },
  USD: { symbol: "$", label: "US Dollar", locale: "en-US" },
  GBP: { symbol: "£", label: "British Pound", locale: "en-GB" },
  AED: { symbol: "AED", label: "UAE Dirham", locale: "en-AE" },
};

export function formatCurrency(
  amount: number,
  code: CurrencyCode,
  decimals = 0
): string {
  const c = CURRENCIES[code];
  try {
    return `${c.symbol} ${amount.toLocaleString(c.locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}`;
  } catch {
    return `${c.symbol} ${amount.toFixed(decimals)}`;
  }
}
