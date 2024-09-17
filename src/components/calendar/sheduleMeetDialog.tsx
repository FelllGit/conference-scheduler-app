import { Control, useForm } from "react-hook-form";
import { useGetUsers } from "@/hooks/useGetUsers";
import { usePostSheduledMeets } from "@/hooks/usePostSheduledMeets";
import { memo, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { jwtDecode } from "jwt-decode";

interface User {
  id: number;
  name: string;
}

interface FormData {
  name: string;
  sheduledDate: string;
  scheduledHour: number;
  creator_user: number;
  userIds: number[];
}

interface ParticipantsComboboxProps {
  control: Control<FormData>;
  name: "userIds";
  users: User[];
}

const ParticipantsCombobox: React.FC<ParticipantsComboboxProps> = memo(
  ({ control, name, users }) => {
    const [open, setOpen] = useState(false);

    return (
      <FormField
        control={control}
        name={name}
        rules={{ required: "At least one participant is required" }}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {field.value && field.value.length > 0
                      ? `Selected (${field.value.length}) participants`
                      : "Select participants..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search participants..." />
                    <CommandList>
                      <CommandEmpty>No participants found.</CommandEmpty>
                      <CommandGroup>
                        {users.map((user) => (
                          <CommandItem
                            key={user.id}
                            value={user.name}
                            onSelect={() => {
                              const selectedIds: number[] = field.value || [];
                              if (selectedIds.includes(user.id)) {
                                // Remove the user from the selection
                                field.onChange(
                                  selectedIds.filter((id) => id !== user.id)
                                );
                              } else {
                                // Add the user to the selection
                                field.onChange([...selectedIds, user.id]);
                              }
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value && field.value.includes(user.id)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {user.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);

const SheduleMeetDialog: React.FC = () => {
  const [creatorUserId, setCreatorUserId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("jwt");

    setToken(tokenFromStorage);
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }

    const decodedJWT = jwtDecode<{ sub: number }>(token);
    setCreatorUserId(decodedJWT.sub);
  });

  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      sheduledDate: "",
      scheduledHour: 10,
      creator_user: creatorUserId || 0,
      userIds: [],
    },
  });

  const { data: users, isLoading: isUsersLoading } = useGetUsers();
  const { mutate: postScheduledMeet, isError, error } = usePostSheduledMeets();

  const [dialogOpen, setDialogOpen] = useState(false);

  const onSubmit = (data: FormData) => {
    const userIds = data.userIds || [];

    // Об'єднуємо дату і час в один рядок для відправки на сервер
    const scheduledDateTime = `${data.sheduledDate}T${String(
      data.scheduledHour
    ).padStart(2, "0")}:00:00`;

    if (!creatorUserId) {
      return;
    }

    postScheduledMeet(
      {
        name: data.name,
        sheduledDate: scheduledDateTime,
        creator_user: creatorUserId,
        userIds,
      },
      {
        onSuccess: () => {
          form.reset();
          setDialogOpen(false);
        },
      }
    );
  };

  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="bg-blue-500 hover:bg-blue-400 active:bg-blue-600">
            Add
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule New Meeting</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Поле введення для назви */}
              <FormField
                name="name"
                control={form.control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="name">Name</Label>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Поле для вибору дати */}
              <FormField
                name="sheduledDate"
                control={form.control}
                rules={{ required: "Date is required" }}
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="sheduledDate">Scheduled Date</Label>
                    <FormControl>
                      <Input
                        id="sheduledDate"
                        type="date"
                        placeholder="Scheduled Date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Поле для вибору часу */}
              <FormField
                name="scheduledHour"
                control={form.control}
                rules={{ required: "Hour is required" }}
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="scheduledHour">Scheduled Hour</Label>
                    <FormControl>
                      <select
                        id="scheduledHour"
                        {...field}
                        className="border border-gray-300 rounded-md p-2 w-full"
                      >
                        <option value="">Select hour</option>
                        {Array.from({ length: 9 }, (_, i) => i + 10).map(
                          (hour) => (
                            <option key={hour} value={hour}>
                              {hour}:00
                            </option>
                          )
                        )}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Вибір учасників */}
              <FormField
                name="userIds"
                control={form.control}
                rules={{ required: "At least one participant is required" }}
                render={() => (
                  <FormItem>
                    <Label>Participants</Label>
                    {isUsersLoading ? (
                      <p>Loading users...</p>
                    ) : (
                      <ParticipantsCombobox
                        control={form.control}
                        name="userIds"
                        users={users || []}
                      />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Кнопка відправки */}
              <Button type="submit" className="w-full">
                Submit
              </Button>
              {isError && (
                <p className="text-red-500 mt-2">
                  {error instanceof Error ? error.message : "An error occurred"}
                </p>
              )}
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SheduleMeetDialog;
