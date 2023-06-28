import { PrismaClient } from "@prisma/client";
import {
  RestaurantNavbar,
  Title,
  Rating,
  Description,
  Images,
  Reviews,
  ReservationCard,
} from "@/restaurantPage/components";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

const fetchRestaurant = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      images: true,
      description: true,
      reviews: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    notFound();
  }

  return restaurant;
};

const RestaurantPage = async ({
  params,
}: {
  params: {
    name: string;
  };
}) => {
  const { name: slug } = params;

  const {
    name: restaurantName,
    images,
    description,
    reviews,
    open_time,
    close_time,
  } = await fetchRestaurant(slug);

  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavbar slug={slug} />
        <Title name={restaurantName} />
        <Rating reviews={reviews} />
        <Description description={description} />
        <Images images={images} />
        <Reviews reviews={reviews} />
      </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard
          slug={slug}
          openTime={open_time}
          closeTime={close_time}
        />
      </div>
    </>
  );
};

export default RestaurantPage;
