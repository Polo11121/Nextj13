import { Cuisine, Location, PRICE } from "@prisma/client";
import Link from "next/link";

interface SideBarProps {
  locations: Location[];
  cuisines: Cuisine[];
  searchParams: {
    location: string;
    cuisine: string;
    price: PRICE;
  };
}

export const SideBar = ({
  locations,
  cuisines,
  searchParams,
}: SideBarProps) => {
  const getActiveClass = (param: string, value: string) =>
    param?.toLocaleLowerCase() === value.toLowerCase()
      ? "font-bold"
      : "font-light";

  return (
    <div className="w-1/5 pr-5">
      <div className="border-b flex flex-col h-[180px]">
        <h1 className="mb-2">Region</h1>
        {locations.map(({ name, id }) => (
          <Link
            href={{
              pathname: "/search",
              query: { ...searchParams, location: name },
            }}
            key={id}
            className={`text-reg capitalize cursor-pointer hover:underline w-fit ${getActiveClass(
              searchParams.location,
              name
            )}`}
          >
            {name}
          </Link>
        ))}
      </div>
      <div className="border-b h-[180px] flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map(({ name, id }) => (
          <Link
            href={{
              pathname: "/search",
              query: { ...searchParams, cuisine: name },
            }}
            key={id}
            className={`text-reg capitalize cursor-pointer hover:underline w-fit ${getActiveClass(
              searchParams.cuisine,
              name
            )}`}
          >
            {name}
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          <Link
            href={{
              pathname: "/search",
              query: { ...searchParams, price: PRICE.CHEAP },
            }}
            className={`border w-full text-reg rounded-l p-2 ${getActiveClass(
              searchParams.price,
              PRICE.CHEAP
            )}`}
          >
            $
          </Link>
          <Link
            href={{
              pathname: "/search",
              query: { ...searchParams, price: PRICE.REGULAR },
            }}
            className={`border w-full text-reg rounded-l p-2 ${getActiveClass(
              searchParams.price,
              PRICE.REGULAR
            )}`}
          >
            $$
          </Link>
          <Link
            href={{
              pathname: "/search",
              query: { ...searchParams, price: PRICE.EXPENSIVE },
            }}
            className={`border w-full text-reg rounded-l p-2 ${getActiveClass(
              searchParams.price,
              PRICE.EXPENSIVE
            )}`}
          >
            $$$
          </Link>
        </div>
      </div>
    </div>
  );
};
