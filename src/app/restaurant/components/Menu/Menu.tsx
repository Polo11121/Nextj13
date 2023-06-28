import { Item } from "@prisma/client";
import { MenuCard } from "@/restaurantPage/components";

export const Menu = ({ menuItems }: { menuItems: Item[] }) => (
  <main className="bg-white mt-5">
    <div>
      <div className="mt-4 pb-1 mb-1">
        <h1 className="font-bold text-4xl">Menu</h1>
      </div>
      <div className="flex flex-wrap justify-between">
        {menuItems.length ? (
          menuItems.map(({ id, name, description, price }) => (
            <MenuCard
              key={id}
              name={name}
              description={description}
              price={price}
            />
          ))
        ) : (
          <div className="text-center">
            <h1 className="font-bold text-4xl">
              This restaurant does not have a menu
            </h1>
          </div>
        )}
      </div>
    </div>
  </main>
);
