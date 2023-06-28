import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";

export const useReservation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createReservation = async ({
    name,
    partySize,
    day,
    time,
    body,
    setIsSuccess,
  }: {
    name: string;
    partySize: number;
    day: string;
    time: string;
    setIsSuccess: Dispatch<SetStateAction<boolean>>;
    body: {
      bookerEmail: string;
      bookerPhone: string;
      bookerFirstName: string;
      bookerLastName: string;
      bookerRequest: string;
      bookerOccasion: string;
    };
  }) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:3000/api/restaurant/${name}/reserve`,
        body,
        {
          params: {
            day,
            time,
            partySize,
          },
        }
      );

      setLoading(false);
      setIsSuccess(true);

      return response.data;
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.error);
    }
  };

  return {
    loading,
    error,
    createReservation,
  };
};
