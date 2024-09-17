import { toast } from "@/hooks/use-toast.ts";

export const signIn = async (email: string, password: string) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const response = await fetch(`${backendUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorMessage = await response.json();
    console.error(errorMessage);
    toast({
      variant: "destructive",
      title: "Can't sign in",
      description: errorMessage.message,
    });
    throw new Error(JSON.stringify(errorMessage));
  }
  return response;
};
