"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const submitHandler = () => {
    if (inputValue) {
      router.push(`/search?location=${inputValue}`);
      setInputValue("");
    }
  };

  return (
    <div className="text-left text-lg py-3 m-auto flex justify-center">
      <input
        className="rounded  mr-3 p-2 w-[450px]"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="State, city or town"
      />
      <button
        onClick={submitHandler}
        className="rounded bg-red-600 px-9 py-2 text-white"
      >
        Let&apos;s go
      </button>
    </div>
  );
};
