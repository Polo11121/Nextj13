import { PRICE } from "@prisma/client";

export const Price = ({ price }: { price: PRICE }) => {
  switch (price) {
    case PRICE.CHEAP:
      return (
        <>
          <span>$$</span>
          <span className="text-gray-400">$$</span>
        </>
      );
    case PRICE.REGULAR:
      return (
        <>
          <span>$$$</span>
          <span className="text-gray-400">$</span>
        </>
      );

    case PRICE.EXPENSIVE:
      return <span>$$$$</span>;
  }
};
