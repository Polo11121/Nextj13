"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useReservation } from "hooks";

export const Form = ({
  name,
  date,
  partySize,
}: {
  name: string;
  date: string;
  partySize: number;
}) => {
  const [inputs, setInputs] = useState({
    bookerFirstName: "",
    bookerLastName: "",
    bookerPhone: "",
    bookerEmail: "",
    bookerOccasion: "",
    bookerRequest: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const { loading, createReservation } = useReservation();

  const changeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const [day, time] = date.split("T");

    await createReservation({
      name,
      day,
      time,
      partySize,
      body: inputs,
      setIsSuccess,
    });
  };

  const isDisabled =
    !inputs.bookerEmail ||
    !inputs.bookerFirstName ||
    !inputs.bookerLastName ||
    !inputs.bookerPhone ||
    loading;

  return isSuccess ? (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      <h1>You are all booked up</h1>
      <p>Enjoy your reservation</p>
    </div>
  ) : (
    <form
      onSubmit={submitHandler}
      className="mt-10 flex flex-wrap justify-between w-[660px]"
    >
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="First name"
        name="bookerFirstName"
        value={inputs.bookerFirstName}
        onChange={changeValueHandler}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Last name"
        name="bookerLastName"
        value={inputs.bookerLastName}
        onChange={changeValueHandler}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Phone number"
        name="bookerPhone"
        value={inputs.bookerPhone}
        onChange={changeValueHandler}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Email address"
        name="bookerEmail"
        value={inputs.bookerEmail}
        onChange={changeValueHandler}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Occasion (optional)"
        name="bookerOccasion"
        value={inputs.bookerOccasion}
        onChange={changeValueHandler}
      />
      <input
        type="text"
        placeholder="Requests (optional)"
        className="border rounded p-3 w-80 mb-4"
        name="bookerRequest"
        value={inputs.bookerRequest}
        onChange={changeValueHandler}
      />
      <button
        type="submit"
        disabled={isDisabled}
        className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
      >
        {loading ? (
          <CircularProgress color="inherit" />
        ) : (
          "Complete reservation"
        )}
      </button>
      <p className="mt-4 text-sm">
        By clicking “Complete reservation” you agree to the OpenTable Terms of
        Use and Privacy Policy. Standard text message rates may apply. You may
        opt out of receiving text messages at any time.
      </p>
    </form>
  );
};
