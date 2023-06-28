import { RestaurantCardType } from "app/page";
import { Price, Stars } from "components";
import Image from "next/image";
import Link from "next/link";

interface RestaurantCardProps {
  restaurant: RestaurantCardType;
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const { name, main_image, slug, cuisine, location, price, reviews } =
    restaurant;

  return (
    <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
      <Link href={`/restaurant/${slug}`}>
        <Image
          src={main_image}
          alt="name"
          className="w-full h-36"
          height={144}
          width={256}
        />
        <div className="p-1">
          <h3 className="font-bold text-2xl mb-2">{name}</h3>
          <div className="flex items-center">
            <div className="flex  items-center justify-center">
              <Stars reviews={reviews} />
            </div>
            <p className="ml-2">
              {reviews.length} review{reviews.length === 1 ? "" : "s"}
            </p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className=" mr-3">{cuisine.name}</p>
            <p className="mr-3 font-bold">
              <Price price={price} />
            </p>
            <p>{location.name}</p>
          </div>
          <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
        </div>
      </Link>
    </div>
  );
};
