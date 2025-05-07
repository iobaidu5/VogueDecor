import clsx from 'clsx';

const Price = ({
  amount,
  className,
  currencyCode = 'CAD',
  currencyCodeClassName,
  sale = '',
  saleCurreny = ''
}: {
  amount: string;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
  sale?: string;
  saleCurreny?: string
} & React.ComponentProps<'p'>) => {
  const formattedPrice = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'narrowSymbol'
  }).format(parseFloat(amount));

  return (
    <p suppressHydrationWarning={true} className={className}>
      <span className={clsx(sale && 'line-through')}>
        {formattedPrice}
        <span className={clsx('ml-1 inline', currencyCodeClassName)}>{currencyCode}</span>
      </span>
      {sale ? (
        <span className="ml-2 font-medium text-red-700">
          {`$${sale} ${saleCurreny}`}
        </span>
      ) : null}
    </p>
  );
};

export default Price;
