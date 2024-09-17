import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "@/interfaces/meetings.ts";
import { useGetUsers } from "@/hooks/useGetUsers.ts";
import { toast } from "@/hooks/use-toast.ts";
import { useState } from "react";

interface UsersAutocompleteProps {
  onUserSelect: (user: User | null) => void;
}

const UsersAutocomplete: React.FC<UsersAutocompleteProps> = ({
  onUserSelect,
}) => {
  const { data: users, isLoading, isError } = useGetUsers();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleSelect = (user: User | null) => {
    setSelectedUser(user);
    onUserSelect(user);
  };

  if (isLoading) {
    return;
  }

  if (isError) {
    toast({
      title: "Error",
      description: "Failed to fetch users",
      variant: "destructive",
    });
    return;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-[200px] justify-between"
        >
          {selectedUser
            ? users?.find((user) => user.id === selectedUser.id)?.name
            : "Select people..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search people..." />
          <CommandList>
            <CommandEmpty>No people found.</CommandEmpty>
            <CommandGroup>
              <Button
                onClick={() => handleSelect(null)}
                className="w-full bg-transparent text-black hover:bg-gray-200 my-1 shadow-none"
              >
                Clear Filter
              </Button>
              {users?.map((user) => (
                <CommandItem
                  key={user.id}
                  value={user.name}
                  onSelect={() => handleSelect(user)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedUser?.id === user.id ? "opacity-100" : "opacity-0"
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
  );
};

export default UsersAutocomplete;
