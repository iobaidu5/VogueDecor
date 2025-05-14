'use client';
import { useCurrency } from "./currencyContext";

const CurrencySwitcher = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <select
      className="ml-4 border bg-transparent rounded p-1"
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
    >
      <option value="CAD">CAD</option>
      <option value="USD">USD</option>
    </select>
  );
};

export default CurrencySwitcher;
