"use client";

import { FormEvent, useState } from "react";
import { CircularProgress } from "@mui/material";
import { convertToDisplayTime } from "utils";
import { partySize, times } from "data";
import { useAvailabilities } from "hooks";
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const ReservationCard = ({
  openTime,
  closeTime,
  slug,
}: {
  openTime: string;
  closeTime: string;
  slug: string;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedPartySize, setSelectedPartySize] = useState(1);
  const [time, setTime] = useState(openTime);
  const { data, loading, fetchAvailabilities } = useAvailabilities();

  const day = selectedDate?.toISOString().split("T")[0];

  const filteredTimes = times.filter(
    ({ time }) => time >= openTime && time <= closeTime
  );

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetchAvailabilities({
      name: slug,
      time,
      partySize: selectedPartySize,
      day,
    });
  };

  return (
    <form
      onSubmit={submitHandler}
      className="fixed w-[15%] bg-white rounded p-3 shadow"
    >
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select
          value={selectedPartySize}
          onChange={(e) => setSelectedPartySize(Number(e.target.value))}
          name=""
          className="py-3 border-b font-light"
          id=""
        >
          {partySize.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          <DatePicker
            onChange={(e) => setSelectedDate(e as Date)}
            selected={selectedDate}
            className="py-3 border-b font-light text-reg w-28"
            dateFormat="MMMM d"
            wrapperClassName="w-[48%]"
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            name=""
            id=""
            className="py-3 border-b font-light"
          >
            {filteredTimes.map(({ time, displayTime }) => (
              <option key={time} value={time}>
                {displayTime}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button
          type="submit"
          className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
          disabled={loading}
        >
          {loading ? <CircularProgress color="inherit" /> : "Find a Table"}
        </button>
      </div>
      {data && (
        <div className="mt-4">
          <div className="flex flex-wrap mt-2">
            {data.map(({ time, available }) =>
              available ? (
                <Link
                  key={time}
                  href={`/reserve/${slug}?date=${day}T${time}&partySize=${selectedPartySize}`}
                  className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 rounded mr-3"
                >
                  <p className="text-sm font-bold">
                    {convertToDisplayTime(time)}
                  </p>
                </Link>
              ) : (
                <div
                  className="bg-gray-300 p-2 w-24 mb-3 rounded mr-3"
                  key={time}
                />
              )
            )}
          </div>
        </div>
      )}
    </form>
  );
};
