// hooks/usePostSheduledMeets.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast.ts";

interface IPostSheduledMeets {
  name: string;
  sheduledDate: string;
  creator_user: number;
  userIds: number[];
}

const postSheduledMeets = async ({
  name,
  sheduledDate,
  creator_user,
  userIds,
}: IPostSheduledMeets) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const response = await fetch(`${backendUrl}/sheduled-meets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      name,
      sheduledDate,
      creator_user,
      userIds,
    }),
  });

  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(errorMessage.message || "Помилка при створенні зустрічі");
  }

  return response.json();
};

export const usePostSheduledMeets = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSheduledMeets,
    onSuccess: () => {
      // Інвалідація кешу, щоб оновити список зустрічей
      queryClient.invalidateQueries({ queryKey: ["sheduledMeets"] });
      toast({ title: "Meet was successfully created" });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Meet was not created",
        description: error.message,
      });
    },
  });
};
