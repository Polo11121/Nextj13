import Image from "next/image";
import Link from "next/link";
import { PRICE, Review } from "@prisma/client";
import { Price, Stars } from "components";
import { calculateReviewRatingAverage } from "utils";

interface RestaurantCardProps {
  main_image: string;
  title: string;
  slug: string;
  location: string;
  cousine: string;
  price: PRICE;
  reviews: Review[];
}

export const RestaurantCard = ({
  main_image,
  title,
  slug,
  location,
  cousine,
  price,
  reviews,
}: RestaurantCardProps) => {
  const renderRatingText = () => {
    const rating = calculateReviewRatingAverage(reviews);

    if (rating > 4) {
      return "Awesome";
    } else if (rating <= 4 && rating > 3) {
      return "Good";
    } else if (rating <= 3 && rating > 0) {
      return "Average";
    }

    return "";
  };

  return (
    <div className="border-b flex pb-5 h-[180px]">
      <Image
        width={176}
        height={176}
        src={main_image}
        alt={slug}
        className="w-44 rounded"
      />
      <div className="pl-5">
        <h2 className="text-3xl">{title}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">
            <Stars reviews={reviews} />
          </div>
          <p className="ml-2 text-sm">{renderRatingText()}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <p className="mr-4">
              <Price price={price} />
            </p>
            <p className="mr-4 capitalize">{cousine}</p>
            <p className="mr-4 capitalize">{location}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${slug}`}>View more information</Link>
        </div>
      </div>
    </div>
  );
};
