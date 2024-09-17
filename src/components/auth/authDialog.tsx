import { Button } from "@/components/ui/button.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import SignIn from "@/components/auth/signIn.tsx";
import SignUp from "@/components/auth/signUp.tsx";
import { memo } from "react";

const AuthDialog: React.FC = memo(() => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button className="bg-blue-500 hover:bg-blue-400 active:bg-blue-600">
            Log in
          </Button>
        </DialogTrigger>
        <DialogContent className="w-fit">
          <Tabs
            defaultValue="login"
            className="w-[250px] flex flex-col items-center"
          >
            <TabsList>
              <TabsTrigger value="login">LogIn</TabsTrigger>
              <TabsTrigger value="signup">SignUp</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <SignIn />
            </TabsContent>
            <TabsContent value="signup">
              <SignUp />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
});

export default AuthDialog;
