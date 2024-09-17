import { useQuery } from "@tanstack/react-query";
import { Meeting } from "@/interfaces/meetings.ts";

const fetchSheduledMeets = async (): Promise<Meeting[]> => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const response = await fetch(`${backendUrl}/sheduled-meets`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(errorMessage.message || "Помилка при отриманні зустрічей");
  }

  return response.json();
};

export const useGetSheduledMeet = () => {
  // eslint-disable-next-line no-restricted-syntax
  return useQuery({ queryKey: ["sheduledMeets"], queryFn: fetchSheduledMeets });
};
