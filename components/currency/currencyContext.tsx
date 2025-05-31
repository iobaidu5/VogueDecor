'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type CurrencyContextType = {
  currency: string;
  setCurrency: (val: string) => void;
  rate: number;
};

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'CAD',
  setCurrency: () => {},
  rate: 1,
});

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const [currency, setCurrency] = useState<string>('CAD');
  const [rate, setRate] = useState<number>(1);

  useEffect(() => {
    const detectUserCountry = async () => {
      try {
        const res = await fetch('https://ipapi.co/json');
        const data = await res.json();

        if (data?.country === 'US') {
          setCurrency('USD');
        } else {
          setCurrency('CAD');
        }
      } catch (error) {
        console.error('Failed to detect location:', error);
      }
    };

    detectUserCountry();
  }, []);

  useEffect(() => {
    switch (currency) {
      case 'USD':
        setRate(0.75);
        break;
      default:
        setRate(1);
    }
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, rate }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
