import { useQuery } from "@tanstack/react-query";
import { User } from "@/interfaces/meetings.ts";

const fetchUsers = async (): Promise<User[]> => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const response = await fetch(`${backendUrl}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(
      errorMessage.message || "Помилка при отриманні користувачів"
    );
  }

  return response.json();
};

export const useGetUsers = () => {
  // eslint-disable-next-line no-restricted-syntax
  return useQuery({ queryKey: ["users"], queryFn: fetchUsers });
};
