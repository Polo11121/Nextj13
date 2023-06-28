import { Stars } from "components";

export const ReviewCard = ({
  name,
  rating,
  text,
}: {
  name: string;
  rating: number;
  text: string;
}) => {
  const nameInitials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="flex">
      <div className="w-1/6 flex flex-col items-center">
        <div className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center">
          <h2 className="text-white text-2xl uppercase">{nameInitials}</h2>
        </div>
        <p className="text-center">{name}</p>
      </div>
      <div className="ml-10 w-5/6">
        <div className="flex items-center">
          <div className="flex mr-5">
            <Stars reviewRating={rating} reviews={[]} />
          </div>
        </div>
        <div className="mt-5">
          <p className="text-lg font-light">{text}</p>
        </div>
      </div>
    </div>
  );
};
