import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button.tsx";
import React, { useState } from "react";
import { useDeleteSheduledMeet } from "@/hooks/useDeleteSheduledMeet.ts";

interface DeleteMeetDialogProps {
  meetId: number;
}

const deleteMeetDialog: React.FC<DeleteMeetDialogProps> = ({ meetId }) => {
  const [open, setOpen] = useState(false);
  const { mutate: deleteMeet } = useDeleteSheduledMeet();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    deleteMeet(meetId);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          className="absolute top-[-6px] right-[-6px] bg-red-500 w-5 h-8"
          onClick={handleOpen}
        >
          <i className="pi pi-times" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
          <Button onClick={handleSubmit}>
            <i className="pi pi-check" />
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default deleteMeetDialog;
