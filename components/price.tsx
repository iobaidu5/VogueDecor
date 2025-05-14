'use client';
import clsx from 'clsx';
import { useCurrency } from './currency/currencyContext';

const Price = ({
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
      <span className={clsx(sale && 'line-through')}>
        {formattedPrice}
        <span className={clsx('ml-1 inline', currencyCodeClassName)}>{currency}</span>
      </span>
      {sale ? (
        <span className="ml-2 font-bold text-red-700">
          {`${numericSale.toFixed(2)} ${currency}`}
        </span>
      ) : null}
    </p>
  );
};

export default Price;
