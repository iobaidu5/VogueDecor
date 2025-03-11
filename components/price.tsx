import clsx from 'clsx';

const Price = ({
  amount,
  className,
  currencyCode = 'CAD',
  currencyCodeClassName,
  sale = ''
}: {
  amount: string;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
  sale?: string;
} & React.ComponentProps<'p'>) => (
  <p suppressHydrationWarning={true} className={className}>
    {`${new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'narrowSymbol'
    }).format(parseFloat(amount))}`}
    <span className={clsx('ml-1 inline', currencyCodeClassName)}>{`${currencyCode}`}</span>
    {sale ? <span className="ml-2 font-bold text-red-700">{`${sale} ${currencyCode}`}</span> : null}
  </p>
);

export default Price;
