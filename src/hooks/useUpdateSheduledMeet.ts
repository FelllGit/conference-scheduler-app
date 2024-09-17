// hooks/useUpdateSheduledMeet.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast.ts";

interface IUpdateSheduledMeet {
  id: number;
  sheduledDate: string;
}

const updateSheduledMeet = async ({
  id,
  sheduledDate,
}: IUpdateSheduledMeet) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const response = await fetch(`${backendUrl}/sheduled-meets/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      sheduledDate,
    }),
  });

  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(errorMessage.message || "Помилка при оновленні зустрічі");
  }

  return response.json();
};

export const useUpdateSheduledMeet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSheduledMeet,
    onSuccess: () => {
      // Інвалідація кешу, щоб оновити список зустрічей
      queryClient.invalidateQueries({ queryKey: ["sheduledMeets"] });
      toast({
        title: "Meet was successfully updated",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Meet was not updated",
        description: error.message,
      });
    },
  });
};
