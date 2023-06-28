import { Header, RestaurantCard, SideBar } from "@/searchPage/components";
import { PRICE, PrismaClient } from "@prisma/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking App - Search Page",
  description: "Search Page for restaurants table reservation",
};

const prisma = new PrismaClient();

const getFilteredRestaurants = ({
  location,
  cuisine,
  price,
}: {
  location: string;
  cuisine: string;
  price: PRICE;
}) => {
  const select = {
    id: true,
    name: true,
    main_image: true,
    slug: true,
    cuisine: true,
    location: true,
    price: true,
    reviews: true,
  };

  if (!location && !cuisine && !price) {
    return prisma.restaurant.findMany({
      select,
    });
  }

  return prisma.restaurant.findMany({
    where: {
      ...(location
        ? {
            location: {
              name: location.toLowerCase(),
            },
          }
        : {}),
      ...(cuisine
        ? {
            cuisine: {
              name: cuisine.toLowerCase(),
            },
          }
        : {}),
      ...(price ? { price } : {}),
    },

    select,
  });
};

const getLocations = () => prisma.location.findMany({});

const getCuisines = () => prisma.cuisine.findMany({});

const SearchPage = async ({
  searchParams,
}: {
  searchParams: {
    location: string;
    cuisine: string;
    price: PRICE;
  };
}) => {
  const restaurants = await getFilteredRestaurants(searchParams);
  const locations = await getLocations();
  const cuisines = await getCuisines();

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SideBar
          locations={locations}
          cuisines={cuisines}
          searchParams={searchParams}
        />
        <div className="w-5/6">
          {restaurants.length ? (
            restaurants.map(
              ({
                id,
                name,
                main_image,
                slug,
                cuisine,
                location: restaurantLocation,
                price,
                reviews,
              }) => (
                <RestaurantCard
                  key={id}
                  cousine={cuisine.name}
                  location={restaurantLocation.name}
                  main_image={main_image}
                  slug={slug}
                  title={name}
                  price={price}
                  reviews={reviews}
                />
              )
            )
          ) : (
            <div className="text-center text-2xl">No restaurants found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
