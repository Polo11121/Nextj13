import { useState } from "react";
import { Time } from "utils/convertToDisplayTime";
import axios from "axios";

export const useAvailabilities = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<{ time: Time; available: boolean }[] | null>(
    null
  );

  const fetchAvailabilities = async ({
    name,
    partySize,
    day,
    time,
  }: {
    name: string;
    partySize: number;
    day: string;
    time: string;
  }) => {
    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:3000/api/restaurant/${name}/availability`,
        {
          params: {
            day,
            time,
            partySize,
          },
        }
      );

      setLoading(false);
      setData(response.data);
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.error);
    }
  };

  return {
    loading,
    error,
    data,
    fetchAvailabilities,
  };
};
