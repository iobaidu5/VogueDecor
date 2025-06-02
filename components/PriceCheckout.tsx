'use client';
import clsx from 'clsx';
import { useCurrency } from './currency/currencyContext';

const PriceCheckout = ({
  amount,
  className,
  currencyCodeClassName,
  sale = ''
}: {
  amount: string;
  className?: string;
  currencyCode?: string;
  currencyCodeClassName?: string;
  sale?: string;
} & React.ComponentProps<'p'>) => {
  const { currency, rate } = useCurrency();

  const numericAmount = parseFloat(amount) * rate;
  const numericSale = sale ? parseFloat(sale) * rate : 0;

  const formattedPrice = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'narrowSymbol'
  }).format(numericAmount);

  return (
    <p suppressHydrationWarning={true} className={className}>
      {formattedPrice !== "$NaN" && <span className={clsx(sale && 'line-through')}>
        {formattedPrice}
        <span className={clsx('ml-1 inline', currencyCodeClassName)}>{currency}</span>
      </span>}
      {sale && formattedPrice !== "$NaN" ? (
        <span className={`ml-2 font-medium text-red-700`}>
          {`${numericSale.toFixed(2)} ${currency}`}
        </span>
      ) : <span>
      </span>}
    </p>
  );
};

export default PriceCheckout;
