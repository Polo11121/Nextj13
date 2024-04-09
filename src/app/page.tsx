import { Cuisine, PRICE, PrismaClient, Location, Review } from "@prisma/client";
import { Header, RestaurantCard } from "@/homePage/components";
import { Metadata } from "next";

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  slug: string;
  price: PRICE;
  cuisine: Cuisine;
  location: Location;
  reviews: Review[];
}

export const metadata: Metadata = {
  title: "Booking App",
  description: "Booking App for restaurants table reservation",
};

const prisma = new PrismaClient();

const fetchRestaurants = (): Promise<RestaurantCardType[]> =>
  prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      slug: true,
      cuisine: true,
      location: true,
      price: true,
      reviews: true,
    },
  });

const HomePage = async () => {
  const restaurants = await fetchRestaurants();

  return (
    <>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurants.length ? (
          restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))
        ) : (
          <div className="text-center text-2xl">No restaurants found</div>
        )}
      </div>
    </>
  );
};

export default HomePage;
