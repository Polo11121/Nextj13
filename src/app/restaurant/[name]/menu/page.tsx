import { Menu, RestaurantNavbar } from "@/restaurantPage/components";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchMenuItems = async (slug: string) => {
  const items = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  });

  if (!items) {
    throw new Error("Restaurant not found");
  }

  return items;
};

const RestaurantMenuPage = async ({
  params,
}: {
  params: {
    name: string;
  };
}) => {
  const { name: slug } = params;

  const { items: menuItems } = await fetchMenuItems(slug);

  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNavbar slug={slug} />
        <Menu menuItems={menuItems} />
      </div>
    </>
  );
};

export default RestaurantMenuPage;
