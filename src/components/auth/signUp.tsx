import { useForm } from "react-hook-form";
import { signUp } from "@/hooks/signUp.ts";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label.tsx";

interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const form = useForm<SignUpFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    const { name, email, password } = data;
    try {
      const response = await signUp(name, email, password);
      // Handle successful sign-up (e.g., redirect, display success message)
      console.log("Sign-up successful:", response);
    } catch (error) {
      if (error instanceof Error) {
        // Handle errors (e.g., display error message)
        console.error("Sign-up error:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <div className="w-full py-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="name"
            control={form.control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="name">Name</Label>
                <FormControl>
                  <Input id="name" type="text" placeholder="Name" {...field} />
                </FormControl>
                <FormMessage>{form.formState.errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="email">Email</Label>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="password">Password</Label>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.password?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignUp;
