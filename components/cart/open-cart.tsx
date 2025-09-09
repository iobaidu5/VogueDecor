import { FaShoppingCart } from 'react-icons/fa';
import { ShoppingCart } from "lucide-react";
import clsx from 'clsx';

export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex w-12 items-center justify-center text-black transition-colors dark:text-white">
      {/* <ShoppingCartIcon
        className={clsx('h-4 transition-all ease-in-out hover:scale-110', className)}
      /> */}
      <ShoppingCart
        size={22}
        className={clsx(
          "mt-1 text-black hover:text-black-300 transition-all ease-in-out hover:scale-110 dark:text-black dark:hover:text-black-300",
          className
        )}
      />

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-blue-600 text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
