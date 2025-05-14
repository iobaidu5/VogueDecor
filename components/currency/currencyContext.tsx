'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const CurrencyContext = createContext<{
  currency: string;
  setCurrency: (val: string) => void;
  rate: number;
}>({
  currency: 'CAD',
  setCurrency: () => {},
  rate: 1,
});

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const [currency, setCurrency] = useState('CAD');
  const [rate, setRate] = useState(1); // Default CAD to CAD

  useEffect(() => {
    // Detect location (client side)
    fetch('https://ipapi.co/json')
      .then(res => res.json())
      .then(data => {
        if (data.country === 'US') {
          setCurrency('USD');
          setRate(0.75); // Hardcoded or fetched live
        }
      });
  }, []);

  // Update rate if currency changes manually
  useEffect(() => {
    if (currency === 'USD') setRate(0.75);
    else setRate(1);
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, rate }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
