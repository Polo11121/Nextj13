export const MenuCard = ({
  name,
  description,
  price,
}: {
  name: string;
  description: string;
  price: string;
}) => (
  <div className=" border rounded p-3 w-[49%] mb-3">
    <h3 className="font-bold text-lg">{name}</h3>
    <p className="font-light mt-1 text-sm">
      {description.length > 100
        ? description.slice(0, 100) + "..."
        : description}
    </p>
    <p className="mt-7">{price}</p>
  </div>
);
