import { toast } from "@/hooks/use-toast.ts";

export const signUp = async (name: string, email: string, password: string) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const response = await fetch(`${backendUrl}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const errorMessage = await response.json();
    console.error(errorMessage);
    toast({
      variant: "destructive",
      title: "Error creating account",
      description: errorMessage.message || "Failed to sign up",
    });
    throw new Error(JSON.stringify(errorMessage));
  }

  toast({
    title: "Account created",
    description: "We've created your account for you.",
  });

  return response;
};
