"use client";

import errorIcon from "@/public/icons/error.png";
import Image from "next/image";

const Error = ({ error }: { error: Error }) => (
  <div className=" bg-gray-200 flex flex-col flex-1 justify-center items-center ">
    <Image src={errorIcon} height={64} width={64} alt="error" />
    <div className="bg-white px-9 py-14 shadow rounded">
      <h3 className="text-3xl font-bold">
        Well, this is embarrassing. Something went wrong.
      </h3>
      <p className="text-reg font-bold">{error.message}</p>
      <p className="mt-6 text-sm font-light">Error Code: 400</p>
    </div>
  </div>
);

export default Error;
