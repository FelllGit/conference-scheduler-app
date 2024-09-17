// hooks/useDeleteSheduledMeet.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast.ts";

const deleteSheduledMeet = async (id: number) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const response = await fetch(`${backendUrl}/sheduled-meets/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });

  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(errorMessage.message || "Помилка при видаленні зустрічі");
  }

  return;
};

export const useDeleteSheduledMeet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSheduledMeet,
    onSuccess: () => {
      // Інвалідація кешу, щоб оновити список зустрічей
      queryClient.invalidateQueries({ queryKey: ["sheduledMeets"] });
      toast({ title: "Meet was successfully deleted" });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Meet was not deleted",
        description: error.message,
      });
    },
  });
};
