import { Time } from "utils/convertToDisplayTime";
import { convertToDisplayTime } from "utils";
import { format } from "date-fns";
import Image from "next/image";

interface HeaderProps {
  image: string;
  name: string;
  date: string;
  partySize: number;
}

export const Header = ({ image, name, date, partySize }: HeaderProps) => {
  const [day, time] = date.split("T");

  return (
    <div>
      <h3 className="font-bold">You&apos;re almost done!</h3>
      <div className="mt-5 flex">
        <Image
          src={image}
          alt=""
          width={128}
          height={128}
          className="w-32 h-18 rounded"
        />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{name}</h1>
          <div className="flex mt-3">
            <p className="mr-6">{format(new Date(day), "ccc, LLL d")}</p>
            <p className="mr-6">{convertToDisplayTime(time as Time)}</p>
            <p className="mr-6">
              {partySize} {partySize === 1 ? "person" : "people"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
