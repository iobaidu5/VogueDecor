'use client';
import { useCurrency } from "./currencyContext";

const CurrencySwitcher = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <select
      className="appearance-none bg-transparent p-2 text-sm"
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
    >
      <option value="CAD">CAD</option>
      <option value="USD">USD</option>
    </select>
  );
};

export default CurrencySwitcher;
